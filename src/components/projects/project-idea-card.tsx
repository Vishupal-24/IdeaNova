
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ProjectIdea } from '@/ai/schemas';

type ProjectIdeaCardProps = {
    idea: ProjectIdea;
}

export function ProjectIdeaCard({ idea }: ProjectIdeaCardProps) {
    return (
        <Card className="flex flex-col animate-fade-in hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <CardTitle className="font-headline">{idea.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <CardDescription>{idea.description}</CardDescription>
                <div>
                    <h4 className="font-semibold text-sm mb-2">Recommended Tech:</h4>
                    <div className="flex flex-wrap gap-2">
                        {idea.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
