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

  if (
    !formData.get("first_name") ||
    !formData.get("last_name" || !formData.get("email"))
  ) {
    throw new Error("Incomplete data");
  }

  // Add to requestorInformation
  requestorInformation.applicant_info.first_name = formData.get(
    "first_name"
  ) as string;
  requestorInformation.applicant_info.last_name = formData.get(
    "last_name"
  ) as string;
  requestorInformation.applicant_info.contact.email = formData.get(
    "email"
  ) as string;

  if (formData.get("phone")) {
    requestorInformation.applicant_info.contact.phone = formData.get(
      "phone"
    ) as string;
  }

  if (formData.get("addres")) {
    requestorInformation.applicant_info.contact.address = formData.get(
      "address"
    ) as string;
  }

  if (formData.get("linkedin")) {
    requestorInformation.applicant_info.linkedin_profile = formData.get(
      "linkedin"
    ) as string;
  }

  // Save pdf to local file system
  try {
    // createPDF({
    //   applicant_info: requestorInformation.applicant_info,
    //   resume: requestorInformation.resume,
    //   job_description: requestorInformation.job_description,
    // });
    console.log(requestorInformation);
  } catch (e) {
    if (e instanceof Error || (e && typeof e === "object" && "message" in e)) {
      console.error(e.message);
    }

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
