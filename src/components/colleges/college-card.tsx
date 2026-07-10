
'use client';

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building } from "lucide-react";
import type { College } from "./college-data";
import { CollegeDetailsDialog } from "./college-details-dialog";

type CollegeCardProps = {
  college: College;
};

export function CollegeCard({ college }: CollegeCardProps) {
  const { name, city, state, tags, logo, dataAiHint } = college;
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Card className="flex flex-col hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4">
        <Image
          src={logo}
          alt={`${name} logo`}
          width={56}
          height={56}
          className="rounded-lg border"
          data-ai-hint={dataAiHint}
        />
        <div>
          <CardTitle className="font-headline text-lg">{name}</CardTitle>
          <CardDescription className="flex items-center text-sm">
            <Building className="mr-1.5 h-4 w-4" />
            Government College
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="mr-1.5 h-4 w-4" />
          {city}, {state}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => setDialogOpen(true)}>View Details</Button>
      </CardFooter>
      <CollegeDetailsDialog college={college} open={dialogOpen} onOpenChange={setDialogOpen} />
    </Card>
  );
}
