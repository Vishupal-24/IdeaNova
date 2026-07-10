
'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  MapPin,
  Building,
  Globe,
  IndianRupee,
  Clock,
  GraduationCap,
  Wrench,
  Bookmark,
  Sparkles,
  Loader2,
  Clipboard,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';
import type { Internship } from './internship-data';
import type { MatchResumeToInternshipOutput } from '@/ai/schemas';
import { getResumeMatch, getCoverLetter } from './actions';
import { useSavedInternships, useAppliedInternships } from '@/hooks/use-local-id-set';
import { useResumeDraft } from '@/hooks/use-resume-draft';
import { useToast } from '@/hooks/use-toast';
import { cn, withTimeout } from '@/lib/utils';

type ApplyDialogProps = {
  internship: Internship;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: 'overview' | 'apply';
};

const matchStrengthColor: Record<MatchResumeToInternshipOutput['matchStrength'], string> = {
  good: 'text-green-500',
  moderate: 'text-yellow-500',
  low: 'text-orange-500',
};

function computeHeuristicMatch(resumeContent: string, requiredSkills: string[]): number | null {
  if (resumeContent.trim().length < 20 || requiredSkills.length === 0) return null;
  const normalizedResume = resumeContent.toLowerCase();
  const matched = requiredSkills.filter((skill) => normalizedResume.includes(skill.toLowerCase()));
  return Math.round((matched.length / requiredSkills.length) * 100);
}

export function ApplyDialog({ internship, open, onOpenChange, initialTab = 'overview' }: ApplyDialogProps) {
  const [tab, setTab] = useState(initialTab);
  const [resumeContent, setResumeContent] = useResumeDraft();
  const [matchResult, setMatchResult] = useState<MatchResumeToInternshipOutput | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const { has: isSaved, toggle: toggleSaved } = useSavedInternships();
  const { has: isApplied, toggle: toggleApplied } = useAppliedInternships();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setTab(initialTab);
      setMatchResult(null);
      setCoverLetter('');
    }
  }, [open, initialTab, internship.id]);

  const heuristicScore = useMemo(
    () => computeHeuristicMatch(resumeContent, internship.requiredSkills),
    [resumeContent, internship.requiredSkills]
  );

  const requireResume = () => {
    if (resumeContent.trim().length < 50) {
      toast({
        variant: 'destructive',
        title: 'Add your resume first',
        description: 'Paste at least a few sentences from your resume above to continue.',
      });
      return false;
    }
    return true;
  };

  const handleGetMatch = async () => {
    if (!requireResume()) return;
    setIsMatching(true);
    try {
      const result = await withTimeout(getResumeMatch({ resumeContent, internship }));
      if (result.success && result.data) {
        setMatchResult(result.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Failed to compute resume match.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to compute resume match.',
      });
    } finally {
      setIsMatching(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!requireResume()) return;
    setIsGeneratingLetter(true);
    try {
      const result = await withTimeout(getCoverLetter({ resumeContent, internship }));
      if (result.success && result.data) {
        setCoverLetter(result.data.coverLetter);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Failed to generate cover letter.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate cover letter.',
      });
    } finally {
      setIsGeneratingLetter(false);
    }
  };

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(coverLetter);
    toast({
      title: 'Copied to clipboard!',
      description: 'Paste it into your application and personalize it further.',
    });
  };

  const handleMarkApplied = () => {
    const wasApplied = isApplied(internship.id);
    toggleApplied(internship.id);
    toast({
      title: wasApplied ? 'Removed from Applied' : 'Marked as Applied',
      description: wasApplied
        ? 'This internship has been removed from your applications tracker.'
        : 'Added to your applications tracker. This does not submit anything to the employer.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4 pr-6">
            <Image
              src={internship.logo}
              alt={`${internship.company} logo`}
              width={56}
              height={56}
              className="rounded-lg border-2 border-muted shrink-0"
              data-ai-hint={internship.dataAiHint}
            />
            <div className="flex-1 text-left">
              <DialogTitle className="font-headline text-2xl">{internship.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-1.5 mt-1">
                <Building className="h-4 w-4" /> {internship.company}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => toggleSaved(internship.id)}
              aria-label={isSaved(internship.id) ? 'Remove from saved' : 'Save internship'}
            >
              <Bookmark className={cn('h-5 w-5', isSaved(internship.id) && 'fill-primary text-primary')} />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(value) => setTab(value as 'overview' | 'apply')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="apply">Prepare & Apply</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <IndianRupee className="h-4 w-4 text-green-500" />
                <span>{internship.stipend}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>{internship.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {internship.type === 'Remote' ? (
                  <Globe className="h-4 w-4 text-purple-500" />
                ) : (
                  <MapPin className="h-4 w-4 text-orange-500" />
                )}
                <span>{internship.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-yellow-500" />
                <span>{internship.eligibility}</span>
              </div>
            </div>

            <p className="text-sm text-foreground/90">{internship.description}</p>

            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Wrench className="h-4 w-4 text-muted-foreground" /> Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {internship.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="apply" className="space-y-6 mt-4">
            <div>
              <Label htmlFor="apply-resume-content">Your Resume</Label>
              <Textarea
                id="apply-resume-content"
                value={resumeContent}
                onChange={(e) => setResumeContent(e.target.value)}
                placeholder="Paste your resume content here..."
                className="min-h-[140px] mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Saved on this device and reused across internships and the Resume Builder.
              </p>
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Resume Match</h4>
                {heuristicScore !== null && !matchResult && (
                  <Badge variant="secondary">~{heuristicScore}% skill overlap</Badge>
                )}
              </div>

              {!matchResult ? (
                <Button size="sm" onClick={handleGetMatch} disabled={isMatching}>
                  {isMatching ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Get AI Match Score
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={cn('text-2xl font-bold font-headline', matchStrengthColor[matchResult.matchStrength])}>
                      {matchResult.score}%
                    </span>
                    <Badge variant="secondary" className="capitalize">{matchResult.matchStrength} match</Badge>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Strengths</p>
                    <ul className="text-sm space-y-1">
                      {matchResult.strengths.map((strength, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {matchResult.gaps.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Gaps to address</p>
                      <ul className="text-sm space-y-1">
                        {matchResult.gaps.map((gap, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                            <span>{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <h4 className="font-semibold text-sm">Cover Letter</h4>
              {!coverLetter ? (
                <Button size="sm" onClick={handleGenerateCoverLetter} disabled={isGeneratingLetter}>
                  {isGeneratingLetter ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate Cover Letter
                </Button>
              ) : (
                <div className="space-y-3">
                  <Textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="min-h-[220px]"
                  />
                  <Button variant="outline" size="sm" onClick={handleCopyCoverLetter}>
                    <Clipboard className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
          {internship.applicationUrl && (
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <a href={internship.applicationUrl} target="_blank" rel="noopener noreferrer">
                Open Company Careers Page
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
          <Button
            className="w-full sm:w-auto"
            variant={isApplied(internship.id) ? 'secondary' : 'default'}
            onClick={handleMarkApplied}
          >
            {isApplied(internship.id) ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Applied
              </>
            ) : (
              'Mark as Applied'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
