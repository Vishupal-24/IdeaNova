// src/components/user/user-profile-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  bio: z.string().max(200, { message: 'Bio must not be longer than 200 characters.' }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function UserProfileForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: 'Student',
      bio: '', 
    },
    mode: 'onChange',
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    // This is a mock-up, in a real app you would save this to a database
    console.log(data);
    
    setTimeout(() => {
        toast({
            title: 'Profile Updated',
            description: 'Your information has been successfully saved.',
        });
        setIsLoading(false);
    }, 1000);
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardHeader>
            <CardTitle className="font-headline">Profile</CardTitle>
            <CardDescription>This is how others will see you on the site.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={"https://picsum.photos/100"} data-ai-hint="person face" />
                    <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <Button type="button" variant="outline">Change Photo</Button>
            </div>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" value={'student@example.com'} disabled />
              </FormControl>
              <FormDescription>This is a mock email address.</FormDescription>
            </FormItem>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Profile
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
