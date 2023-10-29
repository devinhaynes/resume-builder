"use server";

import { renderToFile } from "@react-pdf/renderer";
import ResumePDF from "@/components/ResumePDF";
import { createElement } from "react";

type ContactInfo = {
  email: string;
  phone: string;
  address: string;
};

type ApplicantInfo = {
  first_name: string;
  last_name: string;
  contact: ContactInfo;
  linkedin_profile: string;
  website: string;
};

type JobDescription = {
  job_title: string;
  company_name: string;
  company_address: string;
  job_posting_url: string;
};

type Education = {
  degree: string;
  school: string;
  graduation_year: string;
  gpa: string;
};

type WorkExperience = {
  job_title: string;
  company_name: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
};

type Certification = {
  name: string;
  issuing_organization: string;
  year_earned: string;
};

type ResumeData = {
  summary: string;
  education: Education[];
  work_experience: WorkExperience[];
  certifications: Certification[];
  skills: string[];
};

export type RequestorInformation = {
  applicant_info: ApplicantInfo;
  job_description: JobDescription;
  resume: ResumeData;
};

export const createResume = async (formData: FormData) => {
  let requestorInformation: RequestorInformation = {
    applicant_info: {
      first_name: "",
      last_name: "",
      contact: {
        email: "",
        phone: "",
        address: "",
      },
      linkedin_profile: "",
      website: "",
    },
    job_description: {
      job_title: "",
      company_name: "",
      company_address: "",
      job_posting_url: "",
    },
    resume: {
      summary: "",
      education: [],
      work_experience: [],
      certifications: [],
      skills: [],
    },
  };

  // Validate data

  // Add to requestorInformation

  // Save pdf to local file system
  try {
    createPDF({
      applicant_info: requestorInformation.applicant_info,
      resume: requestorInformation.resume,
      job_description: requestorInformation.job_description,
    });
  } catch (e) {
    console.error(String(e));
  }
};

const createPDF = async ({
  applicant_info,
  resume,
  job_description,
}: RequestorInformation) => {
  return await renderToFile(
    createElement(ResumePDF, {
      title: "test",
      resumeData: { applicant_info, resume, job_description },
    }),
    `${__dirname}/resume.pdf`
  );
};
