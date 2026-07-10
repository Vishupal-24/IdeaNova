
'use client';

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CollegeCard } from "./college-card";
import { collegeData } from "./college-data";

export function CollegeBoard() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    collegeData.forEach((college) => college.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, []);

  const filteredColleges = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return collegeData.filter((college) => {
      const matchesQuery =
        !normalizedQuery ||
        college.name.toLowerCase().includes(normalizedQuery) ||
        college.city.toLowerCase().includes(normalizedQuery) ||
        college.state.toLowerCase().includes(normalizedQuery);
      const matchesTag = !activeTag || college.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by college name, city, or state..."
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={activeTag === null ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setActiveTag(null)}
          >
            All Branches
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={activeTag === tag ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {filteredColleges.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-12">
          No colleges match your search. Try a different keyword or branch.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}
    </div>
  );
}
