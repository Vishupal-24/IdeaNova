
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { getStreamSuggestion } from '@/app/(app)/guidance/actions';
import type { SuggestStreamOutput } from '@/ai/schemas';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { ResultCard } from './result-card';

const interests = [
  { id: 'robotics', label: 'Robotics and Automation' },
  { id: 'ai_ml', label: 'Artificial Intelligence & Machine Learning' },
  { id: 'structures', label: 'Designing Structures & Buildings' },
  { id: 'circuits', label: 'Electronics and Circuits' },
  { id: 'thermodynamics', label: 'Thermodynamics and Fluid Mechanics' },
  { id: 'algorithms', label: 'Problem Solving and Algorithms' },
  { id: 'power_systems', label: 'Power Systems and Grids' },
  { id: 'chemical_reactions', label: 'Chemical Reactions and Processes' },
  { id: 'aerospace', label: 'Aerodynamics and Aircraft Design' },
];

const personalityTraits = [
  { id: 'analytical', label: 'Analytical and logical' },
  { id: 'creative', label: 'Creative and innovative' },
  { id: 'hands-on', label: 'Hands-on and enjoy building things' },
  { id: 'detail-oriented', label: 'Detail-oriented and precise' },
  { id: 'abstract_thinker', label: 'Abstract thinker, enjoy complex theories' },
  { id: 'system_thinker', label: 'Enjoy understanding large, complex systems' },
];

const guidanceSchema = z.object({
  interests: z.array(z.string()).min(1, { message: 'Please select at least one interest.' }),
  personality: z.array(z.string()).min(1, { message: 'Please select at least one personality trait.' }),
});

type GuidanceFormValues = z.infer<typeof guidanceSchema>;

export function GuidanceQuiz() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SuggestStreamOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<GuidanceFormValues>({
    resolver: zodResolver(guidanceSchema),
    defaultValues: {
      interests: [],
      personality: [],
    },
  });

  const onSubmit = async (data: GuidanceFormValues) => {
    setIsLoading(true);
    setResult(null);

    const response = await getStreamSuggestion(data);

    if (response.success && response.data) {
      setResult(response.data);
      toast({
        title: 'Recommendation Ready!',
        description: 'We have a personalized specialization suggestion for you.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error || 'Failed to get a recommendation.',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline">Take the Assessment</CardTitle>
              <CardDescription>
                Help us understand you better. Select a few options from the lists below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base font-headline">My Interests</FormLabel>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {interests.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="interests"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.label)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.label])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.label
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{item.label}</FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personality"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base font-headline">I am...</FormLabel>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {personalityTraits.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="personality"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.label)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.label])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.label
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{item.label}</FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Get My Recommendation
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center p-16 bg-card rounded-lg border">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="font-headline text-lg text-muted-foreground">Analyzing your responses...</p>
          <p className="text-sm text-muted-foreground">Our AI is crafting your personalized recommendation.</p>
        </div>
      )}

      {result && !isLoading && <ResultCard result={result} />}
    </div>
  );
}
