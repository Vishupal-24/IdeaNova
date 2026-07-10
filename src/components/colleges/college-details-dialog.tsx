
'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Calendar, GraduationCap, ExternalLink } from 'lucide-react';
import type { College } from './college-data';

type CollegeDetailsDialogProps = {
  college: College;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CollegeDetailsDialog({ college, open, onOpenChange }: CollegeDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-start gap-4 pr-6">
            <Image
              src={college.logo}
              alt={`${college.name} logo`}
              width={56}
              height={56}
              className="rounded-lg border shrink-0"
              data-ai-hint={college.dataAiHint}
            />
            <div className="text-left">
              <DialogTitle className="font-headline text-2xl">{college.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-1.5 mt-1">
                <Building className="h-4 w-4" /> Government College
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span>{college.city}, {college.state}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>Established {college.establishedYear}</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <GraduationCap className="h-4 w-4 text-yellow-500" />
              <span>Admission via {college.admissionExam}</span>
            </div>
          </div>

          <p className="text-sm text-foreground/90">{college.description}</p>

          <div>
            <h4 className="font-semibold text-sm mb-2">Branches Offered</h4>
            <div className="flex flex-wrap gap-2">
              {college.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button asChild className="w-full sm:w-auto">
            <a href={college.website} target="_blank" rel="noopener noreferrer">
              Visit Official Website
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
