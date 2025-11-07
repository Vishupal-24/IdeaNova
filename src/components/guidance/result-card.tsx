
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { SuggestStreamOutput } from '@/ai/schemas';
import { Zap } from 'lucide-react';
import { Badge } from '../ui/badge';

type ResultCardProps = {
  result: SuggestStreamOutput;
};

export function ResultCard({ result }: ResultCardProps) {
  return (
    <Card className="border-primary/50 border-2 shadow-xl animate-fade-in">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
            <div className="bg-primary/10 text-primary p-3 rounded-full">
                <Zap className="h-8 w-8" />
            </div>
        </div>
        <CardDescription className="font-semibold text-primary">AI-Powered Recommendation</CardDescription>
        <CardTitle className="font-headline text-4xl">
          We recommend <span className="text-primary">{result.recommendedStream}</span> for you.
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-headline text-xl mb-2">Why This is a Great Fit</h3>
          <p className="text-muted-foreground">{result.reasoning}</p>
        </div>
        <div>
          <h3 className="font-headline text-xl mb-3">Potential Career Pathways</h3>
          <div className="flex flex-wrap gap-2">
            {result.careerPathways.map((pathway) => (
                <Badge key={pathway} variant="secondary" className="text-base px-3 py-1">
                    {pathway}
                </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
