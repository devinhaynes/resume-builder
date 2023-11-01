import { z } from "zod";

export const ResumeSchema = z.object({
  first_name: z
    .string()
    .min(5, "Must be at least 5 characters")
    .max(50, "Cannot be more than 50 characters"),
  last_name: z
    .string()
    .min(5, "Must be at least 5 characters")
    .max(50, "Cannot be more than 50 characters"),
  email: z
    .string()
    .email()
    .min(5, "Must be at least 5 characters")
    .max(50, "Cannot be more than 50 characters"),
  phone: z
    .string()
    .min(5, "Must be at least 5 characters")
    .max(13, "Cannot be more than 13 characters"),
  linkedin: z
    .string()
    .url()
    .min(5, "Must be at least 5 characters")
    .max(50, "Cannot be more than 50 characters"),
  website: z
    .string()
    .url()
    .min(5, "Must be at least 5 characters")
    .max(50, "Cannot be more than 50 characters"),
});
