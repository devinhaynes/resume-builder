import Form from "@/components/Form";
import PDFPreview from "@/components/PDFPreview";
import ResumePDF from "@/components/ResumePDF";
import ResumeUpload from "@/components/ResumeUpload";

// TEMP for testing
import data from "@/data/sample_resume.json";

const { applicant_info, resume, job_description } = data;

export default function Resume() {
  return (
    <main className="flex flex-wrap min-h-screen gap-6 px-5">
      <div>
        <ResumeUpload />
        <Form />
      </div>
      <PDFPreview>
        <ResumePDF
          title="Test"
          resumeData={{ applicant_info, resume, job_description }}
        />
      </PDFPreview>
    </main>
  );
}
