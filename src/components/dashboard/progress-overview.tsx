'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', skills: 2 },
  { name: 'Feb', skills: 3 },
  { name: 'Mar', skills: 5 },
  { name: 'Apr', skills: 7 },
  { name: 'May', skills: 8 },
  { name: 'Jun', skills: 10 },
];

export function ProgressOverview() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Your Progress</CardTitle>
        <CardDescription>Skills acquired over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'hsl(var(--accent))' }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Bar dataKey="skills" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
