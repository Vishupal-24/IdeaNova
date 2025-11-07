
'use client';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { getInternshipRecommendations } from './actions';
import { Sparkles, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { InternshipRecommendation } from '@/ai/schemas';
import { InternshipCard } from './internship-card';

const recommendationSchema = z.object({
  skills: z.string().min(3, { message: 'Please enter at least one skill.' }),
  interest: z.string().min(3, { message: 'Please enter a field of interest.' }),
  location: z.string().min(2, { message: 'Please enter a location.' }),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

export function InternshipRecommender() {
  const [recommendedInternships, setRecommendedInternships] = useState<InternshipRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      skills: 'Python, Machine Learning',
      interest: 'Artificial Intelligence',
      location: 'Bengaluru',
    },
  });

  const onSubmit: SubmitHandler<RecommendationFormValues> = async (data) => {
    setIsLoading(true);
    setRecommendedInternships([]);
    
    const result = await getInternshipRecommendations(data);
    setIsLoading(false);

    if (result.success && result.data?.recommendations) {
      setRecommendedInternships(result.data.recommendations);
      toast({
        title: 'Recommendations Ready!',
        description: 'Your personalized internship suggestions are here.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Failed to get recommendations.',
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Get AI-Powered Recommendations</CardTitle>
          <CardDescription>Tell us about yourself and our AI will find the best internships for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="skills">Your Skills</Label>
                      <FormControl>
                        <Input id="skills" placeholder="e.g., React, Node.js" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="interest">Field of Interest</Label>
                      <FormControl>
                        <Input id="interest" placeholder="e.g., Data Science" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="location">Preferred Location</Label>
                      <FormControl>
                        <Input id="location" placeholder="e.g., Remote, Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Get Recommendations
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className='flex flex-col items-center justify-center p-16 text-center'>
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="font-headline text-lg">Finding the best internships for you...</p>
            <p className="text-sm text-muted-foreground">Our AI is analyzing your profile.</p>
        </div>
      )}

      {recommendedInternships.length > 0 && (
        <div>
            <h2 className="text-2xl font-headline mb-4">Here are your Top Recommendations:</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendedInternships.map((rec, index) => (
                    <InternshipCard 
                      key={index} 
                      internship={rec.internship}
                      matchStrength={rec.matchStrength}
                      reason={rec.reason}
                    />
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
