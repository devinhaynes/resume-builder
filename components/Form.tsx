"use client";

// Libraries
import { FormEvent, MutableRefObject, useRef, useState } from "react";
import {
  AiFillDelete,
  AiOutlineSave,
  AiOutlinePlus,
  AiOutlineCheck,
  AiFillCheckCircle,
} from "react-icons/ai";

// Components
import FormGroup from "./FormGroup";
import WorkHistory from "./WorkHistory";
import SectionDescription from "./SectionDescription";
import Fieldset from "./Fieldset";
import AddNewButton from "./AddNewButton";

// Types
import type { TWorkHistory } from "@/types/FormTypes";

// Utilities
import { createResume } from "@/actions/createResume";

export default function Form() {
  const [workHistory, setWorkHistory] = useState<TWorkHistory[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [recommendedSkills, setRecommendedSkills] = useState<string[]>([
    "Agile",
    "React",
    "Running",
    "Testing",
    "Breaking code",
  ]);

  const formRef: MutableRefObject<HTMLFormElement | null> = useRef(null);

  function generateId() {
    if (workHistory.length > 0) {
      const ids = workHistory.map((wh) => wh.id);
      return Math.max(...ids) + 1;
    }

    return 1;
  }

  function addWorkHistory() {
    const id = generateId();
    const title = "Work History " + id;

    const emptyWorkHistory: TWorkHistory = {
      id,
      title,
      position: "",
      organization: "",
      location: "",
      description: "",
    };

    setWorkHistory([...workHistory, emptyWorkHistory]);
  }

  function removeWorkHistory(id: number) {
    const filtered = workHistory.filter((wh) => wh.id !== id);
    const newWorkHistory = filtered.map((wh) => {
      if (wh.id > id) {
        return {
          id: wh.id - 1,
          title: wh.title.slice(0, -1) + id,
          position: wh.position,
          location: wh.location,
          organization: wh.organization,
          description: wh.description,
        };
      }

      return wh;
    });
    setWorkHistory(newWorkHistory);
  }

  function addSkill() {
    setSkills([...skills, ""]);
  }

  function removeSkill(index: number) {
    setSkills(skills.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    let formData = new FormData();

    if (formRef.current) {
      formData = new FormData(formRef.current);
    }

    await createResume(formData);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {/* Job Description */}
      <Fieldset legend="Job Description" initiallyOpen>
        <SectionDescription description="Upload a file or paste in a job description that you have found on a job board. This will be analyzed to produce a more targeted resume."></SectionDescription>
        <FormGroup
          type="file"
          label="Job Posting File Upload"
          name="job_description_upload"
        />
        <FormGroup
          type="textarea"
          name="job_description"
          label="Job Description"
        />
      </Fieldset>
      {/* User Information */}
      <Fieldset legend="Personal Information" initiallyOpen>
        <FormGroup type="text" label="First Name" name="fname" required />
        <FormGroup type="text" label="Last Name" name="lname" required />
        <FormGroup type="email" label="Email Address" name="email" required />
        <FormGroup type="text" label="Phone Number" name="phone" />
        <FormGroup type="text" label="Linkedin" name="linkedin" />
        <FormGroup
          type="text"
          label="Portfolio Website"
          name="portfolio_website"
        />
      </Fieldset>

      {/* Summary */}
      <Fieldset legend="Professional Summary">
        <SectionDescription description="Write a couple sentences to interest the reader! If you don't wish to include anything, our AI system will do its best to generate a well-written summary based on any other information you have given."></SectionDescription>
        <FormGroup type="textarea" label="Summary" name="summary" />
      </Fieldset>

      {/* Education */}
      <Fieldset legend="Education" addNewButtonHandler={() => {}}>
        <FormGroup type="text" label="Institution" name="institution" />
        <FormGroup type="text" label="Degree" name="degree" />
        <FormGroup type="text" label="GPA" name="gpa" />
        <div className="flex gap-2">
          <FormGroup
            type="date"
            label="Start Date"
            name="education_start_date"
          />
          <FormGroup type="date" label="End Date" name="education_end_date" />
        </div>
      </Fieldset>

      {/* Work History */}
      <Fieldset legend="Work History" addNewButtonHandler={addWorkHistory}>
        {workHistory.map((wh) => (
          <WorkHistory
            title={wh.title}
            id={wh.id}
            removeWorkHistory={removeWorkHistory}
            key={wh.id}
            position={wh.position}
            description={wh.description}
            location={wh.location}
            organization={wh.organization}
          />
        ))}
      </Fieldset>

      {/* Skills */}
      <Fieldset legend="Skills" addNewButtonHandler={addSkill}>
        <SectionDescription description="This section will inform the AI which skills should be listed in Skills section of your resume">
          <p className="mt-3 text-gray-700 text-sm mb-1">Recommended Skills:</p>
          <ul className="flex gap-2 flex-wrap">
            {recommendedSkills.map((skill, i) => (
              <SkillCard key={i} skill={skill} recommended />
            ))}
          </ul>
        </SectionDescription>
        <div>
          <p className="mt-3 text-gray-700 text-sm mb-1">My Skills:</p>
          <ul className="flex gap-2 flex-wrap">
            {recommendedSkills.map((skill, i) => (
              <SkillCard key={i} skill={skill} />
            ))}
            {[...Array(7)].map((_, i) => {
              return <SkillCard key={i} skill="Test" />;
            })}
          </ul>
        </div>
        {skills.map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <FormGroup type="text" name={"skill" + i} placeholder="New Skill" />
            <button
              type="button"
              className="bg-red-100 p-2 rounded-full w-max hover:scale-105 z-20"
              onClick={() => removeSkill(i)}
            >
              <AiFillDelete className="text-red-400 text-lg" />
            </button>
          </div>
        ))}
      </Fieldset>

      {/* Certifications */}
      <Fieldset legend="Certifications" addNewButtonHandler={() => {}}>
        <FormGroup type="text" label="Certificate Name" name="cert_name" />
        <FormGroup type="text" label="Issuer" name="cert_issuer" />
        <FormGroup type="date" label="Date Issued" name="cert_issue_date" />
      </Fieldset>

      {/* External Links */}
      <Fieldset legend="External Links">
        <AddNewButton handler={() => {}} />
      </Fieldset>

      {/* Additional Information */}
      <Fieldset legend="Additional Information">
        <SectionDescription description="Use this to describe any other relevant information that could be used to improve the quality of your resume." />
        <FormGroup type="textarea" name="additionalInfo" />
      </Fieldset>

      <div className="w-full flex gap-4">
        <button
          type="button"
          className="bg-white flex items-center text-lg border border-2 border-teal-900 text-teal-900 py-2 px-4 gap-2 rounded-full my-4 hover:scale-105 hover:shadow-sm transition cursor-pointer"
        >
          <span>Save</span>
          <AiOutlineSave className="text-2xl" />
        </button>
        <button type="submit" className="submit-button">
          Generate Resume
        </button>
      </div>
    </form>
  );
}

type SkillCardProps = {
  skill: string;
  recommended?: boolean;
};

function SkillCard({ skill, recommended = false }: SkillCardProps) {
  return (
    <li
      className={`rounded-full ${
        recommended ? "bg-gray-200" : "bg-teal-700 text-white"
      }`}
    >
      <button
        className="cursor-pointer px-4 py-1 text-sm flex gap-2 items-center"
        type="button"
      >
        <span>{skill}</span>
        {recommended ? <AiOutlinePlus /> : <AiFillDelete />}
      </button>
    </li>
  );
}
