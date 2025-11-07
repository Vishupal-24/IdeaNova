
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generateSummaryAction } from '@/app/(app)/resume/actions';
import { Sparkles, Clipboard, Loader2 } from 'lucide-react';

const resumeSchema = z.object({
  resumeContent: z.string().min(100, { message: 'Please provide at least 100 characters of resume content.' }),
});

type ResumeFormValues = z.infer<typeof resumeSchema>;

export function ResumeForm() {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      resumeContent: '',
    },
  });

  const onSubmit: SubmitHandler<ResumeFormValues> = async (data) => {
    setIsLoading(true);
    setSummary('');
    const result = await generateSummaryAction(data.resumeContent);
    setIsLoading(false);

    if (result.success && result.summary) {
      setSummary(result.summary);
      toast({
        title: 'Summary Generated!',
        description: 'Your new AI-powered summary is ready.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Failed to generate summary.',
      });
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    toast({
        title: "Copied to Clipboard!",
        description: "You can now paste the summary into your resume."
    })
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="resumeContent"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="resumeContent">Paste your resume content here</Label>
                    <FormControl>
                      <Textarea
                        id="resumeContent"
                        placeholder="Include your skills, experience, and education..."
                        className="min-h-[400px]"
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
                Generate Summary
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">AI-Generated Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center bg-muted/30 rounded-lg m-6 mt-0">
          {isLoading && <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />}
          {!isLoading && !summary && (
            <div className="text-center text-muted-foreground">
              <Sparkles className="mx-auto h-12 w-12 mb-2" />
              <p>Your generated summary will appear here.</p>
            </div>
          )}
          {!isLoading && summary && (
            <p className="text-foreground/90 whitespace-pre-wrap">{summary}</p>
          )}
        </CardContent>
        {summary && !isLoading && (
            <CardFooter>
                <Button variant="outline" onClick={handleCopyToClipboard}>
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
