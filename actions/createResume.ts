"use server";

import { renderToFile } from "@react-pdf/renderer";
import ResumePDF from "@/components/ResumePDF";
import { createElement } from "react";

import type { RequestorInformation } from "@/types/Resume";

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
