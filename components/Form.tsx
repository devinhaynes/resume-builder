"use client";

// Libraries
import { AiFillDelete, AiOutlineSave, AiOutlinePlus } from "react-icons/ai";

import { useForm, FieldValues, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import FormGroup from "./FormGroup";
import SectionDescription from "./SectionDescription";
import Fieldset from "./Fieldset";

// Utilities
import { ResumeSchema } from "@/lib/ResumeSchema";
export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResumeSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_history",
  });

  const {
    fields: edFields,
    append: appendEd,
    remove: removeEd,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });

  function sendResume(data: FieldValues) {
    // Client Side Validation
    reset();
  }

  return (
    <form onSubmit={handleSubmit(sendResume)}>
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
        <div className="FormGroup max-w-full mb-8">
          <label className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">First Name</span>
            <input
              className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
              type="text"
              {...register("first_name")}
            />
          </label>
          {errors.first_name && (
            <span className="mt-4 py-1 px-4 bg-red-400 text-white rounded">{`${errors.first_name.message}`}</span>
          )}
        </div>
        <div className="FormGroup max-w-full mb-8">
          <label className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Last Name</span>
            <input
              className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
              type="text"
              {...register("last_name")}
            />
          </label>
          {errors.last_name && (
            <span className="mt-4 py-1 px-4 bg-red-400 text-white rounded">{`${errors.last_name.message}`}</span>
          )}
        </div>
        <div className="FormGroup max-w-full mb-8">
          <label className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Email</span>
            <input
              className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
              type="text"
              {...register("email")}
            />
          </label>
          {errors.email && (
            <span className="mt-4 py-1 px-4 bg-red-400 text-white rounded">{`${errors.email.message}`}</span>
          )}
        </div>
        <div className="FormGroup max-w-full mb-8">
          <label className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Phone</span>
            <input
              className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
              type="text"
              {...register("phone")}
            />
          </label>
          {errors.phone && (
            <span className="mt-4 py-1 px-4 bg-red-400 text-white rounded">{`${errors.phone.message}`}</span>
          )}
        </div>
        <div className="FormGroup max-w-full mb-8">
          <label className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Linkedin</span>
            <input
              className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
              type="text"
              {...register("linkedin")}
            />
          </label>
          {errors.linkedin && (
            <span className="mt-4 py-1 px-4 bg-red-400 text-white rounded">{`${errors.linkedin.message}`}</span>
          )}
        </div>
        <div className="FormGroup max-w-full mb-8">
          <label className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Portfolio Website</span>
            <input
              className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
              type="text"
              {...register("website")}
            />
          </label>
          {errors.website && (
            <span className="mt-4 py-1 px-4 bg-red-400 text-white rounded">{`${errors.website.message}`}</span>
          )}
        </div>
      </Fieldset>

      {/* Summary */}
      <Fieldset legend="Professional Summary">
        <SectionDescription description="Write a couple sentences to interest the reader! If you don't wish to include anything, our AI system will do its best to generate a well-written summary based on any other information you have given."></SectionDescription>
        <div className="FormGroup max-w-full mb-8">
          <label className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Summary</span>
            <textarea
              className="border rounded focus:outline-teal-700 py-1 px-2 text-lg w-full max-w-full"
              rows={10}
              {...register("summary")}
            ></textarea>
          </label>
          {errors.summary && <span>{`${errors.summary.message}`}</span>}
        </div>
      </Fieldset>

      {/* Education */}
      <Fieldset legend="Education" addNewButtonHandler={() => appendEd({})}>
        {edFields.map((field, index) => {
          return (
            <div
              className="mt-5 p-5 border-2 flex flex-col gap-2 rounded-lg"
              key={field.id}
            >
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">School</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
                    type="text"
                    {...register(`education.${index}.school`)}
                  />
                </label>
              </div>
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">Degree</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
                    type="text"
                    {...register(`education.${index}.degree`)}
                  />
                </label>
              </div>
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">GPA</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
                    max={4}
                    min={0}
                    type="number"
                    {...register(`education.${index}.gpa`)}
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">Start Date</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative text-gray-400 max-w-[20ch]"
                    type="date"
                    {...register(`education.${index}.start_date`)}
                  />
                </label>
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">Graduation Date</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative text-gray-400 max-w-[20ch]"
                    type="date"
                    {...register(`education.${index}.graduation_date`)}
                  />
                </label>
              </div>
              <label className="flex gap-4 items-center">
                <span className="text-sm text-gray-600">Still in college</span>
                <input
                  className="text-sm mr-4"
                  type="checkbox"
                  {...register(`education.${index}.in_college`)}
                />
              </label>
              <div className="FormGroup max-w-full">
                <button
                  className="bg-red-100 py-2 px-6 rounded-full w-max ml-auto hover:scale-105 hover:shadow z-20 active:shadow-sm active:scale-100 flex gap-4 text-red-800"
                  type="button"
                  onClick={() => removeEd(index)}
                >
                  <span>Remove</span>
                  <AiFillDelete className="text-red-400 text-2xl" />
                </button>
              </div>
            </div>
          );
        })}
      </Fieldset>

      {/* Work History */}
      <Fieldset legend="Work History" addNewButtonHandler={() => append({})}>
        {fields.map((field, index) => {
          return (
            <div
              className="mt-5 p-5 border-2 flex flex-col gap-2 rounded-lg"
              key={field.id}
            >
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">Job Title</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
                    type="text"
                    {...register(`work_history.${index}.job_title`)}
                  />
                </label>
              </div>
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">Employer</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
                    type="text"
                    {...register(`work_history.${index}.employer`)}
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <label className="flex gap-4 items-center">
                  <span className="text-sm text-gray-600">Start Date</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative text-gray-400 max-w-[20ch]"
                    type="date"
                    {...register(`work_history.${index}.start_date`)}
                  />
                </label>
                <label className="flex gap-4 items-center">
                  <span className="text-sm text-gray-600">End Date</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative text-gray-400 max-w-[20ch]"
                    type="date"
                    {...register(`work_history.${index}.end_date`)}
                  />
                </label>
              </div>
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">
                    Responsibilities
                  </span>
                  <textarea
                    className="border rounded focus:outline-teal-700 py-1 px-2 text-lg w-full max-w-full"
                    rows={10}
                    {...register(`work_history.${index}.responsibilities`)}
                  ></textarea>
                </label>
              </div>
              <div className="FormGroup max-w-full">
                <button
                  className="bg-red-100 py-2 px-6 rounded-full w-max ml-auto hover:scale-105 hover:shadow z-20 active:shadow-sm active:scale-100 flex gap-4 text-red-800"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <span>Remove</span>
                  <AiFillDelete className="text-red-400 text-2xl" />
                </button>
              </div>
            </div>
          );
        })}
      </Fieldset>

      {/* Skills */}
      <Fieldset legend="Skills" addNewButtonHandler={() => appendSkill({})}>
        <SectionDescription description="This section will inform the AI which skills should be listed in Skills section of your resume">
          <p className="mt-3 text-gray-700 text-sm mb-1">Recommended Skills:</p>
          {/* <ul className="flex gap-2 flex-wrap">
            {recommendedSkills.map((skill, i) => (
              <SkillCard key={i} skill={skill} recommended />
            ))}
          </ul> */}
        </SectionDescription>
        {skillFields.map((field, index) => {
          return (
            <div className="mt-5 p-5 flex gap-2 rounded-lg" key={field.id}>
              <label className="flex flex-col justify-center">
                <input
                  className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
                  type="text"
                  placeholder="Enter skill.."
                  {...register(`skills.${index}.value`)}
                />
              </label>
              <button
                className="bg-red-100 p-2 rounded-full w-max hover:scale-105 hover:shadow z-20 active:shadow-sm active:scale-100 flex gap-4 text-red-800"
                type="button"
                onClick={() => removeSkill(index)}
              >
                <AiFillDelete className="text-red-400 text-2xl" />
              </button>
            </div>
          );
        })}
        {/* <div>
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
        ))} */}
      </Fieldset>

      {/* Certifications */}
      {/* <Fieldset legend="Certifications" addNewButtonHandler={() => {}}>
        <FormGroup type="text" label="Certificate Name" name="cert_name" />
        <FormGroup type="text" label="Issuer" name="cert_issuer" />
        <FormGroup type="date" label="Date Issued" name="cert_issue_date" />
      </Fieldset> */}

      {/* External Links */}
      {/* <Fieldset legend="External Links">
        <AddNewButton handler={() => {}} />
      </Fieldset> */}

      {/* Additional Information */}
      {/* <Fieldset legend="Additional Information">
        <SectionDescription description="Use this to describe any other relevant information that could be used to improve the quality of your resume." />
        <FormGroup type="textarea" name="additionalInfo" />
      </Fieldset> */}

      <div className="w-full flex gap-4">
        <button
          type="button"
          className="bg-white flex items-center text-lg border-2 border-teal-900 text-teal-900 py-2 px-4 gap-2 rounded-full my-4 hover:scale-105 hover:shadow-sm transition cursor-pointer"
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
