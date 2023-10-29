"use client";

import Fieldset from "./Fieldset";
import SectionDescription from "./SectionDescription";
import FormGroup from "./FormGroup";
import { processResume } from "@/actions/processResume";

export default function ResumeUpload() {
  return (
    <form action={processResume}>
      {/* Resume Import */}
      <Fieldset legend="Resume Import" initiallyOpen>
        <SectionDescription description="Import you current resume to auto-fill data" />
        <FormGroup
          type="file"
          label="Upload current Resume"
          name="resume_upload"
        />
        <button className="submit-button">Process Resume</button>
      </Fieldset>
    </form>
  );
}
