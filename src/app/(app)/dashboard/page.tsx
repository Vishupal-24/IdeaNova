
// src/app/(app)/dashboard/page.tsx
'use client';
import { WelcomeBanner } from '@/components/dashboard/welcome-banner';
import { KeyActions } from '@/components/dashboard/key-actions';
import { AiRecommendations } from '@/components/dashboard/ai-recommendations';
import { CollegeBoard } from '@/components/colleges/college-board';
import { ProgressOverviewDynamic } from '@/components/dashboard/progress-overview-dynamic';
import { GuidanceQuiz } from '@/components/guidance/guidance-quiz';
import { PathwayGenerator } from '@/components/career-pathway/pathway-generator';
import { ResumeForm } from '@/components/resume-builder/resume-form';
import { ChatInterface } from '@/components/career-mentor/chat-interface';
import { LeaderboardTable } from '@/components/leaderboard/leaderboard-table';
import { GamificationElements } from '@/components/leaderboard/gamification-elements';
import { UserProfileForm } from '@/components/user/user-profile-form';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { InternshipBoard } from '@/components/internships/internship-board';
import { ProjectIdeaGenerator } from '@/components/projects/project-idea-generator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InternshipRecommender } from '@/components/internships/internship-recommender';
import { Briefcase, Rss } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <section id="dashboard">
        <WelcomeBanner />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-8">
          <div className="lg:col-span-2">
            <ProgressOverviewDynamic />
          </div>
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-8">
              <KeyActions />
              <AiRecommendations />
            </div>
          </div>
        </div>
      </section>

      <section id="guidance" className="mt-[-4rem] pt-[5rem]">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Engineering Specialization Guidance</CardTitle>
            <CardDescription>
              Discover the best engineering branch for you. This short quiz will help you understand your strengths and suggest a suitable specialization.
            </CardDescription>
          </CardHeader>
        </Card>
        <GuidanceQuiz />
      </section>

      <section id="pathway" className="mt-[-4rem] pt-[5rem]">
         <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Your Career Pathway</CardTitle>
            <CardDescription>
              This is your personalized roadmap to success. Generate a new pathway or view your existing one.
            </CardDescription>
          </CardHeader>
        </Card>
        <PathwayGenerator />
      </section>

      <section id="projects" className="mt-[-4rem] pt-[5rem]">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">AI Project Idea Generator</CardTitle>
            <CardDescription>
              Stuck on what to build? Get unique, AI-powered project ideas tailored to your interests to bolster your portfolio.
            </CardDescription>
          </CardHeader>
        </Card>
        <ProjectIdeaGenerator />
      </section>
      
      <section id="colleges" className="mt-[-4rem] pt-[5rem]">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Engineering College Directory</CardTitle>
            <CardDescription>
              Browse and search for government engineering colleges in your area.
            </CardDescription>
          </CardHeader>
        </Card>
        <CollegeBoard />
      </section>

      <section id="internships" className="mt-[-4rem] pt-[5rem]">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Engineering Internship Board</CardTitle>
            <CardDescription>
              Find relevant internship opportunities to kickstart your engineering career. Use our AI recommender to get personalized suggestions.
            </CardDescription>
          </CardHeader>
        </Card>
        <Tabs defaultValue="recommendations" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recommendations">
              <Briefcase className="mr-2" />
              AI Recommendations
            </TabsTrigger>
            <TabsTrigger value="browse">
              <Rss className="mr-2" />
              Browse All
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recommendations" className="mt-6">
            <InternshipRecommender />
          </TabsContent>
          <TabsContent value="browse" className="mt-6">
            <InternshipBoard />
          </TabsContent>
        </Tabs>
      </section>

      <section id="resume" className="mt-[-4rem] pt-[5rem]">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">AI Resume Builder</CardTitle>
            <CardDescription>
              Craft the perfect resume with the help of AI. Paste your resume content below to generate a professional summary.
            </CardDescription>
          </CardHeader>
        </Card>
        <ResumeForm />
      </section>

      <section id="mentor" className="h-[85vh] mt-[-4rem] pt-[5rem]">
         <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">AI Engineering Career Mentor</CardTitle>
            <CardDescription>
              Have a question about your career? Ask your AI mentor for personalized advice, insights, and guidance.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="h-full flex-grow pb-16">
          <ChatInterface />
        </div>
      </section>

      <section id="leaderboard" className="mt-[-4rem] pt-[5rem]">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Leaderboard & Achievements</CardTitle>
            <CardDescription>
              See how you stack up against your peers and track your accomplishments. Keep learning to earn more points and badges!
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="mt-8">
          <GamificationElements />
        </div>
        <div className="mt-8">
          <LeaderboardTable />
        </div>
      </section>

      <section id="settings" className="mt-[-4rem] pt-[5rem]">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Settings</CardTitle>
            <CardDescription>
              Manage your account settings, profile information, and preferences.
            </CardDescription>
          </CardHeader>
        </Card>
        <UserProfileForm />
      </section>
    </div>
  );
}
