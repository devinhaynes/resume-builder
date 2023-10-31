type ContactInfo = {
  email: string;
  phone: string;
  address: string;
};

type ApplicantInfo = {
  first_name: string;
  last_name: string;
  contact: ContactInfo;
  linkedin_profile: string;
  website: string;
};

type JobDescription = {
  job_title: string;
  company_name: string;
  company_address: string;
  job_posting_url: string;
};

type Education = {
  degree: string;
  school: string;
  graduation_year: string;
  gpa: string;
};

type WorkExperience = {
  job_title: string;
  company_name: string;
  start_date: string;
  end_date: string;
  responsibilities: string[];
};

type Certification = {
  name: string;
  issuing_organization: string;
  year_earned: string;
};

type ResumeData = {
  summary: string;
  education: Education[];
  work_experience: WorkExperience[];
  certifications: Certification[];
  skills: string[];
};

export type RequestorInformation = {
  applicant_info: ApplicantInfo;
  job_description: JobDescription;
  resume: ResumeData;
};
