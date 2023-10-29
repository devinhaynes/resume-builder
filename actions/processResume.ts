"use server";

export async function processResume(formData: FormData) {
  console.log(formData.get("resume_upload"));
}
