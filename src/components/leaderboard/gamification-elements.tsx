import { Award, Star, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const badges = [
  { name: 'First Internship', icon: Award, color: 'text-yellow-500' },
  { name: 'Resume Pro', icon: Star, color: 'text-blue-500' },
  { name: 'Pathway Pioneer', icon: Trophy, color: 'text-green-500' },
  { name: 'Quick Learner', icon: Award, color: 'text-purple-500', locked: true },
];

export function GamificationElements() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium font-body">Total Points</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">1,250</div>
          <p className="text-xs text-muted-foreground">+150 points this month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium font-body">My Badges</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <TooltipProvider>
              {badges.map((badge) => (
                <Tooltip key={badge.name}>
                  <TooltipTrigger asChild>
                    <div className={`relative rounded-full p-3 ${badge.locked ? 'bg-muted' : 'bg-accent'}`}>
                      <badge.icon className={`h-6 w-6 ${badge.locked ? 'text-muted-foreground' : badge.color}`} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{badge.name} {badge.locked && '(Locked)'}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
