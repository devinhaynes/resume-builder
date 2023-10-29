"use client";

import dynamic from "next/dynamic";

// TEMP for testing
import data from "@/data/sample_resume.json";
import PDFPageView from "@/components/PDFPageView";
import { useEffect, useState } from "react";

const { applicant_info, resume, job_description } = data;

const PDF = dynamic(() => import("@/components/PDFPageView"), {
  ssr: false,
});

const View = () => {
  const [x, y] = useState(false);

  useEffect(() => {
    y(true);
  }, []);
  return <PDF />;
};

export default View;
