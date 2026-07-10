'use client';

import * as React from 'react';

// Persists the candidate's last-pasted resume text across the Resume Builder
// and the Internships "Prepare & Apply" flow, so it only needs to be pasted once per session.
const STORAGE_KEY = 'careerleap:resume-draft';

let memoryState = '';
let hydrated = false;
const listeners: Array<(value: string) => void> = [];

function readFromStorage(): string {
  if (typeof window === 'undefined') return '';
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

function dispatch(value: string) {
  memoryState = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // localStorage unavailable — state still works in-memory for this session.
  }
  listeners.forEach((listener) => listener(memoryState));
}

export function useResumeDraft(): [string, (value: string) => void] {
  const [state, setState] = React.useState(memoryState);

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

  return [state, dispatch];
}
