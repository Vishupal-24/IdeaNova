
'use client';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generatePathwayAction } from './actions';
import { Sparkles, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CareerTimeline } from './timeline';
import type { Milestone } from '@/ai/schemas';

const pathwaySchema = z.object({
  careerGoal: z.string().min(3, { message: 'Please enter a career goal.' }),
  currentSkills: z.string().min(3, { message: 'Please enter at least one skill.' }),
});

type PathwayFormValues = z.infer<typeof pathwaySchema>;

export function PathwayGenerator() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PathwayFormValues>({
    resolver: zodResolver(pathwaySchema),
    defaultValues: {
      careerGoal: 'AI/ML Engineer',
      currentSkills: 'Python, Data Structures, Algorithms',
    },
  });

  const onSubmit: SubmitHandler<PathwayFormValues> = async (data) => {
    setIsLoading(true);
    setMilestones([]);
    
    const skillsArray = data.currentSkills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    const result = await generatePathwayAction({ careerGoal: data.careerGoal, currentSkills: skillsArray });
    setIsLoading(false);

    if (result.success && result.data?.pathway) {
      setMilestones(result.data.pathway);
      toast({
        title: 'Pathway Generated!',
        description: 'Your new AI-powered career pathway is ready.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Failed to generate pathway.',
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generate Your Pathway</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="careerGoal"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="careerGoal">What is your career goal?</Label>
                    <FormControl>
                      <Input
                        id="careerGoal"
                        placeholder="e.g., AI/ML Engineer, Robotics Engineer..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentSkills"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="currentSkills">What are your current skills? (comma-separated)</Label>
                    <FormControl>
                      <Textarea
                        id="currentSkills"
                        placeholder="e.g., Python, C++, MATLAB..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Pathway
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className='flex items-center justify-center p-16'>
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {milestones.length > 0 && <CareerTimeline milestones={milestones} />}
    </div>
  );
}
