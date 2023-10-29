"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReactNode } from "react";
import ResumePDF from "./ResumePDF";
// TEMP for testing
import data from "@/data/sample_resume.json";

const { applicant_info, resume, job_description } = data;

type PDFPreviewProps = {
  children?: ReactNode;
};

export default function PDFPreview({ children }: PDFPreviewProps) {
  return (
    <div className="bg-gray-700 p-10 rounded-md mt-10 h-max">
      {/* <PDFDownloadLink document={<></>} fileName="resume">
        <button className="bg-white rounded py-1 px-4">Download</button>
      </PDFDownloadLink> */}
      <button className="bg-teal-700 text-white border border-white rounded py-1 px-4 mb-10">
        <PDFDownloadLink
          document={
            <ResumePDF
              title="Test"
              resumeData={{ applicant_info, resume, job_description }}
            />
          }
          fileName="resume.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download now!"
          }
        </PDFDownloadLink>
      </button>
      {children}
    </div>
  );
}
