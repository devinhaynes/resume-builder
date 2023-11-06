"use client";

// import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReactNode, useEffect, useState } from "react";
import ResumePDF from "./ResumePDF";

const PDFDownloadLink = dynamic(() =>
  import("@react-pdf/renderer").then((module) => module.PDFDownloadLink)
);
// TEMP for testing
import data from "@/data/sample_resume.json";
import dynamic from "next/dynamic";

const { applicant_info, resume, job_description } = data;

type PDFPreviewProps = {
  children?: ReactNode;
};

export default function PDFPreview({ children }: PDFPreviewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient ? (
        <div className="bg-gray-700 p-10 rounded-md mt-10 h-max">
          <button className="bg-teal-700 text-white border border-white rounded py-1 px-4 mb-10">
            <PDFDownloadLink
              document={
                <ResumePDF
                  title="Test"
                  resumeData={{ applicant_info, resume, job_description }}
                />
              }
              fileName="resume-new.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download now!"
              }
            </PDFDownloadLink>
          </button>
          {children}
        </div>
      ) : null}
    </>
  );
}
