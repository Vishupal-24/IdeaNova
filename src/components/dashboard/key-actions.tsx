import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Bot, Building } from "lucide-react";
import Link from "next/link";

const actions = [
    { href: "/resume", label: "Update Your Resume", icon: FileText },
    { href: "/mentor", label: "Chat with AI Mentor", icon: Bot },
    { href: "/colleges", label: "Find Colleges", icon: Building },
]

export function KeyActions() {

    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id.substring(1));
        if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        }
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Key Actions</CardTitle>
        <CardDescription>What would you like to do today?</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {actions.map(action => (
            <Button asChild key={action.href} variant="outline" className="justify-start" onClick={() => handleScrollTo(action.href)}>
                <Link href={`#${action.href.substring(1)}`}>
                    <action.icon className="mr-2 h-4 w-4" />
                    {action.label}
                </Link>
            </Button>
        ))}
      </CardContent>
    </Card>
  );
}
