import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Lightbulb } from "lucide-react";
import Link from "next/link";

const recommendations = [
    { title: "Complete 'Advanced React' course", description: "Based on your interest in front-end." },
    { title: "Start a new project in Python", description: "To strengthen your backend skills." },
    { title: "Apply for a Data Analyst internship", description: "Matches your skill profile." },
]

export function AiRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Lightbulb className="text-primary"/>
            AI Recommendations
        </CardTitle>
        <CardDescription>Personalized suggestions to guide your next steps.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
            {recommendations.map((rec, index) => (
                <li key={index}>
                    <Link href="#" className="group flex items-start gap-3 hover:bg-accent/50 p-2 rounded-md transition-colors">
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{rec.title}</p>
                            <p className="text-xs text-muted-foreground">{rec.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>
                </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
