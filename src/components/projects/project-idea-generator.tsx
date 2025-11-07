
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
import { getProjectIdeas } from '@/app/(app)/projects/actions';
import { Sparkles, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ProjectIdeaCard } from './project-idea-card';
import type { ProjectIdea } from '@/ai/schemas';

const projectIdeaSchema = z.object({
  fieldOfInterest: z.string().min(3, { message: 'Please enter a field of interest.' }),
});

type ProjectIdeaFormValues = z.infer<typeof projectIdeaSchema>;

export function ProjectIdeaGenerator() {
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProjectIdeaFormValues>({
    resolver: zodResolver(projectIdeaSchema),
    defaultValues: {
      fieldOfInterest: 'Web Development',
    },
  });

  const onSubmit: SubmitHandler<ProjectIdeaFormValues> = async (data) => {
    setIsLoading(true);
    setProjectIdeas([]);
    
    const result = await getProjectIdeas(data);
    setIsLoading(false);

    if (result.success && result.data?.projects) {
      setProjectIdeas(result.data.projects);
      toast({
        title: 'Project Ideas Generated!',
        description: 'Your new AI-powered project ideas are ready.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Failed to generate project ideas.',
      });
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Find Your Next Project</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fieldOfInterest"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="fieldOfInterest">What field are you interested in?</Label>
                    <FormControl>
                      <Input
                        id="fieldOfInterest"
                        placeholder="e.g., Robotics, AI/ML, Web Development..."
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
                Generate Ideas
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

      {projectIdeas.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
            {projectIdeas.map((idea, index) => (
                <ProjectIdeaCard key={index} idea={idea} />
            ))}
        </div>
      )}
    </div>
  );
}
