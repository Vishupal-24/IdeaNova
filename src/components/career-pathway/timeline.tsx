'use client';
import { Briefcase, BookOpen, Wrench, Lightbulb, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Milestone } from '@/ai/schemas';

const iconMap = {
    course: BookOpen,
    project: Wrench,
    internship: Briefcase,
    skill: Lightbulb,
};

type CareerTimelineProps = {
    milestones: Milestone[];
}

export function CareerTimeline({ milestones }: CareerTimelineProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Your Personalized Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          <div className="absolute left-3 top-1 h-full w-0.5 bg-border -translate-x-1/2"></div>
          {milestones.map((item, index) => {
            const Icon = iconMap[item.type] || Circle;
            const isLast = index === milestones.length - 1;
            return (
                <div key={index} className={`relative flex items-start gap-6 ${!isLast ? 'pb-10' : ''}`}>
                    <div className="absolute left-3 top-1 h-6 w-6 -translate-x-1/2 rounded-full bg-background flex items-center justify-center">
                        <div className='flex h-6 w-6 items-center justify-center rounded-full bg-primary ring-4 ring-background'>
                            <Icon className="h-4 w-4 text-primary-foreground" />
                        </div>
                    </div>
                    <div className="pl-12 flex-1">
                        <div className="flex items-center gap-2">
                            <div>
                                <p className="font-semibold capitalize">{item.type}</p>
                                <p className="text-sm font-bold">{item.title}</p>
                                <p className="text-xs text-muted-foreground">{item.duration}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    </div>
                </div>
            )
        })}
        </div>
      </CardContent>
    </Card>
  );
}
