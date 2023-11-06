import { z } from "zod";

const CertificationSchema = z.object({
  name: z.string().optional(),
  issuing_organization: z.string().optional(),
  year_earned: z.coerce
    .number()
    .min(1980, "Seems a bit outdated...")
    .max(new Date().getFullYear(), "Cannot be a future date")
    .optional(),
});

const WorkExperienceSchema = z.object({
  job_title: z.string().optional(),
  company_name: z.string().optional(),
  location: z.string().optional(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  responsibilities: z.string().optional(),
});

const EducationSchema = z.object({
  degree: z.string().max(50, "Cannot be more than 50 characters").optional(),
  school: z.string().max(50, "Cannot be more than 50 characters").optional(),
  graduation_year: z.coerce.date().optional(),
  gpa: z.coerce
    .number()
    .min(0, "GPA must be between 0 and 4")
    .max(4, "GPA must be between 0 and 4")
    .optional(),
});

export const ResumeSchema = z.object({
  first_name: z
    .string()
    .max(50, "Cannot be more than 50 characters")
    .optional(),
  last_name: z.string().max(50, "Cannot be more than 50 characters").optional(),
  email: z
    .string()
    .email()
    .max(50, "Cannot be more than 50 characters")
    .optional(),
  phone: z.string().max(13, "Cannot be more than 13 characters").optional(),
  linkedin: z
    .string()
    .url()
    .max(50, "Cannot be more than 50 characters")
    .optional(),
  website: z
    .string()
    .url()
    .max(50, "Cannot be more than 50 characters")
    .optional(),
  job_description: z.string().optional(),
  summary: z.string().optional(),
  education: z.array(EducationSchema).optional(),
  work_experience: z.array(WorkExperienceSchema).optional(),
  skills: z.array(z.string().max(20, "Cannot be more than 20 characters")),
  certifications: z.array(CertificationSchema).optional(),
  resume_upload: z.string(),
});

export type TResumeSchema = z.infer<typeof ResumeSchema>;
