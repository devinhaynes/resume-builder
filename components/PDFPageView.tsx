import { PDFViewer } from "@react-pdf/renderer";
import ResumePDF from "./ResumePDF";

// TEMP for testing
import data from "@/data/sample_resume.json";

const { applicant_info, resume, job_description } = data;

export default function PDFPageView() {
  return (
    <PDFViewer>
      <ResumePDF
        title="Test"
        resumeData={{ applicant_info, resume, job_description }}
      />
    </PDFViewer>
  );
}
