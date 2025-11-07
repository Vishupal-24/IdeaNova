
// src/components/dashboard/welcome-banner.tsx
'use client';

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function WelcomeBanner() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground border-0 shadow-lg">
      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <CardTitle className="font-headline text-3xl">Welcome Back, Engineer!</CardTitle>
          <CardDescription className="text-primary-foreground/80 max-w-lg">
            Ready to take the next leap in your engineering career? Let's make progress today. Your personalized recommendations and pathway are waiting.
          </CardDescription>
        </div>
        <Button asChild variant="secondary" size="lg" className="shrink-0" onClick={() => handleScrollTo('pathway')}>
          <Link href="#pathway">
            View Your Career Pathway
            <ArrowRight/>
          </Link>
        </Button>
      </div>
    </Card>
  );
}
