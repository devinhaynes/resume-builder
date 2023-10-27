"use client";

import {
  FormEvent,
  MutableRefObject,
  ReactNode,
  useRef,
  useState,
} from "react";
import { AiFillDelete } from "react-icons/ai";

import FormGroup from "./FormGroup";
import WorkHistory from "./WorkHistory";

import type { TWorkHistory } from "@/types/FormTypes";

import Fieldset from "./Fieldset";
import { createResume } from "@/actions/createResume";
import AddNewButton from "./AddNewButton";

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
      {/* User Information */}
      <Fieldset legend="Personal Information">
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
              <SkillCard key={i} skill={skill} />
            ))}
          </ul>
        </SectionDescription>
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

      <div className="w-full flex flex-end">
        <button
          type="submit"
          className="bg-teal-700 text-lg text-white px-4 py-2 my-4 rounded-full hover:scale-105 hover:shadow-sm transition cursor-pointer"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

type SectionDescriptionProps = {
  description: string;
  children?: ReactNode;
};

function SectionDescription({
  description,
  children,
}: SectionDescriptionProps) {
  return (
    <div className="-mt-5 mb-5">
      <p className="text-gray-600 py-4 text-sm">{description}</p>
      {children}
    </div>
  );
}

type SkillCardProps = {
  skill: string;
};

function SkillCard({ skill }: SkillCardProps) {
  return (
    <li className="bg-teal-600 text-white rounded-full mb-4">
      <button className="cursor-pointer px-4 py-1 text-sm" type="button">
        {skill}
      </button>
    </li>
  );
}
