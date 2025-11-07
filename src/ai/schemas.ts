
import {z} from 'genkit';
import { internshipData } from '@/components/internships/internship-data';

// Schemas for suggest-stream flow
export const SuggestStreamInputSchema = z.object({
  interests: z.array(z.string()).describe("A list of the student's interests."),
  personality: z.array(z.string()).describe("A list of the student's personality traits."),
});
export type SuggestStreamInput = z.infer<typeof SuggestStreamInputSchema>;

export const SuggestStreamOutputSchema = z.object({
  recommendedStream: z.enum(['Computer Science', 'Mechanical', 'Civil', 'Electrical', 'Chemical', 'Aerospace', 'Electronics']).describe('The recommended engineering specialization.'),
  reasoning: z.string().describe('A detailed explanation for why the stream is recommended, connecting it to the student\'s interests and personality.'),
  careerPathways: z.array(z.string()).describe('A list of potential career pathways for the recommended stream.'),
});
export type SuggestStreamOutput = z.infer<typeof SuggestStreamOutputSchema>;


// Schemas for suggest-career-pathway flow
const MilestoneSchema = z.object({
  type: z.enum(['course', 'project', 'internship', 'skill']),
  title: z.string().describe('The title of the milestone.'),
  duration: z.string().describe('An estimated duration to complete the milestone, e.g., "3 weeks", "2 months".'),
  description: z.string().describe('A short description of the milestone and why it is important.'),
});
export type Milestone = z.infer<typeof MilestoneSchema>;

export const SuggestCareerPathwayInputSchema = z.object({
  careerGoal: z
    .string()
    .describe('The student\'s desired career goal, e.g., "AI/ML Engineer", "Robotics Engineer".'),
  currentSkills: z
    .array(z.string())
    .describe('A list of the student\'s current skills.'),
});
export type SuggestCareerPathwayInput = z.infer<typeof SuggestCareerPathwayInputSchema>;

export const SuggestCareerPathwayOutputSchema = z.object({
  pathway: z
    .array(MilestoneSchema)
    .describe('A list of milestones representing the personalized career pathway.'),
});
export type SuggestCareerPathwayOutput = z.infer<typeof SuggestCareerPathwayOutputSchema>;


// Schemas for suggest-resume-summary flow
export const SuggestResumeSummaryInputSchema = z.object({
  resumeContent: z
    .string()
    .describe('The content of the resume, including skills, experience, and education.'),
});
export type SuggestResumeSummaryInput = z.infer<typeof SuggestResumeSummaryInputSchema>;

export const SuggestResumeSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A suggested summary for the resume based on the provided content.'),
});
export type SuggestResumeSummaryOutput = z.infer<typeof SuggestResumeSummaryOutputSchema>;


// Schemas for provide-career-mentorship flow
export const ProvideCareerMentorshipInputSchema = z.object({
  question: z.string().describe('The question the student is asking the career mentor.'),
});
export type ProvideCareerMentorshipInput = z.infer<
  typeof ProvideCareerMentorshipInputSchema
>;

export const ProvideCareerMentorshipOutputSchema = z.object({
  answer: z.string().describe('The personalized guidance provided by the AI career mentor.'),
});
export type ProvideCareerMentorshipOutput = z.infer<
  typeof ProvideCareerMentorshipOutputSchema
>;

// Schemas for suggest-project-idea flow
const ProjectIdeaSchema = z.object({
    title: z.string().describe('The title of the project idea.'),
    description: z.string().describe('A detailed description of the project, including its purpose and key features.'),
    technologies: z.array(z.string()).describe('A list of recommended technologies or tools to build the project.'),
});
export type ProjectIdea = z.infer<typeof ProjectIdeaSchema>;

export const SuggestProjectIdeaInputSchema = z.object({
    fieldOfInterest: z.string().describe('The engineering field or technology the student is interested in, e.g., "Web Development", "Robotics", "AI/ML".'),
});
export type SuggestProjectIdeaInput = z.infer<typeof SuggestProjectIdeaInputSchema>;

export const SuggestProjectIdeaOutputSchema = z.object({
    projects: z.array(ProjectIdeaSchema).describe('A list of 3-4 creative and relevant project ideas.'),
});
export type SuggestProjectIdeaOutput = z.infer<typeof SuggestProjectIdeaOutputSchema>;


// Schemas for suggest-internships flow
export const SuggestInternshipsInputSchema = z.object({
  skills: z.string().describe('A comma-separated string of the candidate\'s skills.'),
  interest: z.string().describe('The candidate\'s primary field of interest.'),
  location: z.string().describe('The candidate\'s preferred work location (e.g., "Remote", "Mumbai").'),
});
export type SuggestInternshipsInput = z.infer<typeof SuggestInternshipsInputSchema>;

const InternshipRecommendationSchema = z.object({
  internship: z.object(
    Object.fromEntries(Object.keys(internshipData[0]).map(key => [key, z.any()]))
  ),
  matchStrength: z.enum(['good', 'moderate', 'low']).describe('The strength of the match for the candidate.'),
  reason: z.string().describe('A brief reason for the recommendation.'),
});
export type InternshipRecommendation = z.infer<typeof InternshipRecommendationSchema>;


export const SuggestInternshipsOutputSchema = z.object({
  recommendations: z.array(InternshipRecommendationSchema).describe('A list of 3-5 recommended internships that best match the candidate\'s profile.'),
});
export type SuggestInternshipsOutput = z.infer<typeof SuggestInternshipsOutputSchema>;
