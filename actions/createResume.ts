"use server";

import ReactPDF, {
  renderToFile,
  renderToStream,
  renderToBuffer,
} from "@react-pdf/renderer";
import ResumePDF from "@/components/ResumePDF";
import { createElement } from "react";
import { ResumeSchema, type TResumeSchema } from "@/lib/ResumeSchema";
import sample_resume from "@/data/sample_resume-empty.json";

import type { RequestorInformation } from "@/types/Resume";
import { generateChatPrompt, sendChatCompletion } from "@/lib/openai";
import { appendFileSync, writeFileSync } from "fs";
import path from "path";

export const createResume = async (formData: TResumeSchema) => {
  // Validate data

  const result = ResumeSchema.safeParse(formData);
  if (!result.success) {
    return { error: result.error.issues, resume: null };
  }

  const completedResponse = await generateChatPrompt(
    formData.resume_upload,
    formData.job_description
  );

  // Save pdf to local file system
  try {
    const resumeResponse = JSON.parse(completedResponse.content!);
    createPDF({
      applicant_info: resumeResponse.applicant_info,
      resume: resumeResponse.resume,
      job_description: resumeResponse.job_description,
    });
  } catch (e) {
    console.log("Error within createResume");
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
  try {
    //   const buffer = await file.arrayBuffer();
    // appendFileSync("data/resume.pdf", Buffer.from(buffer));
    // return await renderToFile(
    //   createElement(ResumePDF, {
    //     title: "test",
    //     resumeData: { applicant_info, resume, job_description },
    //   }),
    //   `/data/output-resume.pdf`
    // );
    // writeFileSync("/data/test.pdf", content);
  } catch (e) {
    console.log(`******\nError: ${String(e)}\n*****`);
  }
};
