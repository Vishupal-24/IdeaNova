'use client';

import * as React from 'react';

// A localStorage-backed set of ids, exposed behind the same interface a real
// backend-backed version would use (has/add/remove/toggle). Swapping the
// implementation for an API call later means changing this file only.
export function createIdSetStore(storageKey: string) {
  let memoryState: string[] = [];
  let hydrated = false;
  const listeners: Array<(ids: string[]) => void> = [];

  function readFromStorage(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function writeToStorage(ids: string[]) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(ids));
    } catch {
      // localStorage unavailable (e.g. private browsing) — state still works in-memory for this session.
    }
  }

  function dispatch(ids: string[]) {
    memoryState = ids;
    writeToStorage(ids);
    listeners.forEach((listener) => listener(memoryState));
  }

  return function useIdSetStore() {
    const [state, setState] = React.useState<string[]>(memoryState);

    React.useEffect(() => {
      if (!hydrated) {
        memoryState = readFromStorage();
        hydrated = true;
      }
      setState(memoryState);
      listeners.push(setState);
      return () => {
        const index = listeners.indexOf(setState);
        if (index > -1) listeners.splice(index, 1);
      };
    }, []);

    const has = React.useCallback((id: string) => state.includes(id), [state]);

    const add = React.useCallback((id: string) => {
      if (!memoryState.includes(id)) {
        dispatch([...memoryState, id]);
      }
    }, []);

    const remove = React.useCallback((id: string) => {
      dispatch(memoryState.filter((existingId) => existingId !== id));
    }, []);

    const toggle = React.useCallback((id: string) => {
      if (memoryState.includes(id)) {
        dispatch(memoryState.filter((existingId) => existingId !== id));
      } else {
        dispatch([...memoryState, id]);
      }
    }, []);

    return { ids: state, has, add, remove, toggle };
  };
}

export const useSavedInternships = createIdSetStore('careerleap:saved-internships');
export const useAppliedInternships = createIdSetStore('careerleap:applied-internships');
