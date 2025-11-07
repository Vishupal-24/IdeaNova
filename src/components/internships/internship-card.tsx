
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Globe, IndianRupee, Clock, GraduationCap, Wrench, CheckCircle2, ShieldAlert, AlertCircle } from "lucide-react";
import type { Internship } from "./internship-data";
import { cn } from "@/lib/utils";

type InternshipCardProps = {
  internship: Internship;
  matchStrength?: 'good' | 'moderate' | 'low';
  reason?: string;
};

const matchConfig = {
  good: {
    label: 'Good Match',
    icon: CheckCircle2,
    color: 'text-green-500',
    borderColor: 'border-green-500/50',
    badgeVariant: 'secondary',
  },
  moderate: {
    label: 'Moderate Match',
    icon: ShieldAlert,
    color: 'text-yellow-500',
    borderColor: 'border-yellow-500/50',
    badgeVariant: 'secondary',
  },
  low: {
    label: 'Potential Match',
    icon: AlertCircle,
    color: 'text-orange-500',
    borderColor: 'border-orange-500/50',
    badgeVariant: 'secondary',
  },
};


export function InternshipCard({ internship, matchStrength, reason }: InternshipCardProps) {
  const { title, company, location, type, stipend, duration, requiredSkills, eligibility, logo, dataAiHint } = internship;
  const matchInfo = matchStrength ? matchConfig[matchStrength] : null;
  
  return (
    <Card className={cn(
      "flex flex-col hover:shadow-xl transition-shadow duration-300 bg-card",
       matchInfo ? `border-2 ${matchInfo.borderColor}` : ''
      )}>
      <CardHeader className="flex flex-row items-start gap-4 pb-4">
        <Image
          src={logo}
          alt={`${company} logo`}
          width={56}
          height={56}
          className="rounded-lg border-2 border-muted"
          data-ai-hint={dataAiHint}
        />
        <div className="flex-1">
          <CardTitle className="font-headline text-lg leading-tight">{title}</CardTitle>
          <CardDescription className="flex items-center text-sm pt-1">
            <Building className="mr-1.5 h-4 w-4" /> 
            {company}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {matchInfo && (
            <div className="space-y-2">
                 <Badge variant={matchInfo.badgeVariant} className={cn("font-semibold", matchInfo.color)}>
                    <matchInfo.icon className="mr-1.5 h-4 w-4"/>
                    {matchInfo.label}
                 </Badge>
                 <p className="text-xs text-muted-foreground">{reason}</p>
            </div>
        )}

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <IndianRupee className="h-4 w-4 text-green-500" />
            <span>{stipend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>{duration}</span>
          </div>
           <div className="flex items-center gap-1.5">
            {type === 'Remote' ? <Globe className="h-4 w-4 text-purple-500"/> : <MapPin className="h-4 w-4 text-orange-500"/>}
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4 text-yellow-500" />
            <span className="truncate">{eligibility}</span>
          </div>
        </div>
        
        <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2"><Wrench className="h-4 w-4 text-muted-foreground"/> Required Skills</h4>
            <div className="flex flex-wrap gap-2">
            {requiredSkills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
            </div>
        </div>

      </CardContent>
      <CardFooter>
        <Button className="w-full">
            Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}
