// src/components/leaderboard/leaderboard-table.tsx
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const leaderboardData = [
  { rank: 1, name: 'Alex Johnson', points: 1850, avatar: 'https://picsum.photos/seed/alex/100', email: 'alex@example.com' },
  { rank: 2, name: 'Maria Garcia', points: 1600, avatar: 'https://picsum.photos/seed/maria/100', email: 'maria@example.com' },
  { rank: 3, name: 'Chen Wei', points: 1100, avatar: 'https://picsum.photos/seed/chen/100', email: 'chen@example.com' },
  { rank: 4, name: 'Samuel Green', points: 950, avatar: 'https://picsum.photos/seed/samuel/100', email: 'samuel@example.com' },
];

export function LeaderboardTable() {
  
  const currentUserData = {
    rank: 3,
    name: 'You',
    points: 1250,
    avatar: 'https://picsum.photos/seed/jane/100',
    isCurrentUser: true,
    email: 'student@example.com',
  };

  const finalLeaderboard = [...leaderboardData.slice(0,2), currentUserData, ...leaderboardData.slice(2)].sort((a,b) => b.points - a.points).map((u, i) => ({ ...u, rank: i + 1}));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Top Performers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {finalLeaderboard.map((u) => (
              <TableRow key={u.email} className={u.isCurrentUser ? 'bg-accent' : ''}>
                <TableCell className="font-medium text-lg">{u.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={u.avatar} alt={u.name} data-ai-hint="person face" />
                      <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{u.name}</span>
                    {u.isCurrentUser && <Badge variant="default">You</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">{u.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
