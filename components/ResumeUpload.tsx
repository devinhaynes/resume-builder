"use client";

import Fieldset from "./Fieldset";
import SectionDescription from "./SectionDescription";
import FormGroup from "./FormGroup";
import { processResume } from "@/actions/processResume";
import { useRef } from "react";
import { useResumeContext } from "@/state/resumeContext";
import { RequestorInformation } from "@/types/Resume";

export default function ResumeUpload() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { resume, setResume } = useResumeContext();

  async function handleResumeUpload(formData: FormData) {
    if (buttonRef.current) {
      buttonRef.current.innerHTML = "Processing...";
    }
    processResume(formData)
      .then((resume) => {
        if (typeof resume === "string") {
          setResume(JSON.parse(resume));
          return console.log(JSON.stringify(resume));
        }
        throw new Error(resume.message);
      })
      .catch((e) => console.log(e.message))
      .finally(() => {
        if (buttonRef.current) {
          buttonRef.current.innerHTML = "Process Resume";
        }
      });
  }

  return (
    <form action={handleResumeUpload}>
      {/* Resume Import */}
      <Fieldset legend="Resume Import" initiallyOpen>
        <SectionDescription description="Import you current resume to auto-fill data" />
        <FormGroup
          type="file"
          label="Upload current Resume"
          name="resume_upload"
        />
        <button ref={buttonRef} className="submit-button">
          Process Resume
        </button>
      </Fieldset>
    </form>
  );
}
