"use client";

// Libraries
import { AiFillDelete, AiOutlineSave, AiOutlinePlus } from "react-icons/ai";
import { useRef } from "react";
import { useForm, FieldValues, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import FormGroup from "./FormGroup";
import SectionDescription from "./SectionDescription";
import Fieldset from "./Fieldset";
import AddNewButton from "./AddNewButton";
import FormError from "./FormError";

// Utilities
import { ResumeSchema, type TResumeSchema } from "@/lib/ResumeSchema";
import { createResume } from "@/actions/createResume";

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<TResumeSchema>({
    resolver: zodResolver(ResumeSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_experience",
  });

  const {
    fields: edFields,
    append: appendEd,
    remove: removeEd,
  } = useFieldArray({
    control,
    name: "education",
  });

  // @ts-ignore
  useFieldArray({ control, name: "skills" });

  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  async function sendResume(data: TResumeSchema) {
    const results = await createResume(data);

    console.log(results);
    reset();
  }

  const recommendedSkills = [
    "React",
    "NextJS",
    "Svelte",
    "Javascript",
    "Linux",
    "Tailwind",
  ];

  const skillsRef = useRef<HTMLInputElement>(null);

  function addSkill(newSkill?: string) {
    let skill = newSkill;

    if (!newSkill || typeof newSkill !== "string") {
      skill = skillsRef.current!.value;
    }

    if (getValues("skills").length > 0) {
      setValue("skills", [...getValues("skills"), skill!]);
      skillsRef.current!.value = "";
      return;
    }

    setValue("skills", [skill!]);
    skillsRef.current!.value = "";
  }

  function removeSkillTag(skill: string) {
    const skills = getValues("skills");

    setValue(
      "skills",
      skills.filter((item: string) => item !== skill)
    );
  }

  return (
    <form onSubmit={handleSubmit(sendResume)}>
      {/* Resume Data */}
      <Fieldset legend="Resume Import" initiallyOpen>
        <SectionDescription description="Copy and paste your current resume text into the text field below. This will allow the AI engine to properly parse your current information." />
        <div className="FormGroup max-w-full mb-8">
          <label className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Resume</span>
            <textarea
              className="border rounded focus:outline-teal-700 py-1 px-2 text-lg w-full max-w-full"
              rows={10}
              {...register("resume_upload")}
            ></textarea>
          </label>
          <FormError errors={errors} errorKey="resume_upload" />
        </div>
      </Fieldset>

      {/* Job Description */}
      <Fieldset legend="Job Description" initiallyOpen>
        <SectionDescription description="Upload a file or paste in a job description that you have found on a job board. This will be analyzed to produce a more targeted resume."></SectionDescription>
        {/* <FormGroup
          type="file"
          label="Job Posting File Upload"
          name="job_description_upload"
        /> */}
        <div className="FormGroup max-w-full mb-8">
          <label className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Job Description</span>
            <textarea
              className="border rounded focus:outline-teal-700 py-1 px-2 text-lg w-full max-w-full"
              rows={10}
              {...register("job_description")}
            ></textarea>
          </label>
          <FormError errors={errors} errorKey="job_description" />
        </div>
      </Fieldset>

      {/* User Information */}
      <Fieldset legend="Personal Information">
        <div className="FormGroup max-w-full mb-8">
          <label className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">First Name</span>
            <input
              className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
              type="text"
              {...register("first_name")}
            />
          </label>
          <FormError errors={errors} errorKey="first_name" />
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
          <FormError errors={errors} errorKey="last_name" />
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
          <FormError errors={errors} errorKey="email" />
        </div>
        <div className="FormGroup max-w-full mb-8">
          <label className="flex flex-col justify-center">
            <span className="text-sm text-gray-600">Phone</span>
            <input
              className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
              type="tel"
              {...register("phone")}
            />
          </label>
          <FormError errors={errors} errorKey="phone" />
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
          <FormError errors={errors} errorKey="linkedin" />
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
          <FormError errors={errors} errorKey="website" />
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
          <FormError errors={errors} errorKey="summary" />
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
                {errors.education &&
                  Array.isArray(errors.education) &&
                  errors.education[index].school && (
                    <span className="py-1 px-2 bg-red-400 text-white rounded">{`${errors.education[index].school.message}`}</span>
                  )}
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
                {errors.education &&
                  Array.isArray(errors.education) &&
                  errors.education[index].degree && (
                    <span className="py-1 px-2 bg-red-400 text-white rounded">{`${errors.education[index].degree.message}`}</span>
                  )}
              </div>
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">GPA</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
                    type="number"
                    step="0.1"
                    {...register(`education.${index}.gpa`)}
                  />
                </label>
                {errors.education &&
                  Array.isArray(errors.education) &&
                  errors.education[index].gpa && (
                    <span className="py-1 px-2 bg-red-400 text-white rounded">{`${errors.education[index].gpa.message}`}</span>
                  )}
              </div>
              <div>
                {/* <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">Start Date</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative text-gray-400 max-w-[20ch]"
                    type="date"
                    {...register(`education.${index}.start_date`)}
                  />
                </label>
                {errors.education &&
                  Array.isArray(errors.education) &&
                  errors.education[index].start_date && (
                    <span className="py-1 px-2 bg-red-400 text-white rounded">{`${errors.education[index].start_date.message}`}</span>
                  )} */}
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">Graduation Date</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative text-gray-400 max-w-[20ch]"
                    type="date"
                    {...register(`education.${index}.graduation_year`)}
                  />
                </label>
                {errors.education &&
                  Array.isArray(errors.education) &&
                  errors.education[index].graduation_year && (
                    <span className="py-1 px-2 bg-red-400 text-white rounded">{`${errors.education[index].graduation_year.message}`}</span>
                  )}
              </div>
              {/* <label className="flex gap-4 items-center">
                <span className="text-sm text-gray-600">Still in college</span>
                <input
                  className="text-sm mr-4"
                  type="checkbox"
                  {...register(`education.${index}.in_college`)}
                />
              </label> */}
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
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">Job Title</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
                    type="text"
                    {...register(`work_experience.${index}.job_title`)}
                  />
                </label>
                {errors.work_experience &&
                  Array.isArray(errors.work_experience) &&
                  errors.work_experience[index].job_title && (
                    <span className="py-1 px-2 bg-red-400 text-white rounded">{`${errors.work_experience[index].job_title}`}</span>
                  )}
              </div>
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">Employer</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
                    type="text"
                    {...register(`work_experience.${index}.company_name`)}
                  />
                </label>
                {errors.work_experience &&
                  Array.isArray(errors.work_experience) &&
                  errors.work_experience[index].company_name && (
                    <span className="py-1 px-2 bg-red-400 text-white rounded">{`${errors.work_experience[index].company_name}`}</span>
                  )}
              </div>
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">Location</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
                    type="text"
                    {...register(`work_experience.${index}.location`)}
                  />
                </label>
                {errors.work_experience &&
                  Array.isArray(errors.work_experience) &&
                  errors.work_experience[index].location && (
                    <span className="py-1 px-2 bg-red-400 text-white rounded">{`${errors.work_experience[index].location}`}</span>
                  )}
              </div>
              <div className="flex gap-2">
                <label className="flex gap-4 items-center">
                  <span className="text-sm text-gray-600">Start Date</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative text-gray-400 max-w-[20ch]"
                    type="date"
                    {...register(`work_experience.${index}.start_date`)}
                  />
                </label>
                <label className="flex gap-4 items-center">
                  <span className="text-sm text-gray-600">End Date</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative text-gray-400 max-w-[20ch]"
                    type="date"
                    {...register(`work_experience.${index}.end_date`)}
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
                    {...register(`work_experience.${index}.responsibilities`)}
                  ></textarea>
                </label>
              </div>
            </div>
          );
        })}
      </Fieldset>

      {/* Skills */}
      <Fieldset legend="Skills">
        <SectionDescription description="This section will inform the AI which skills should be listed in Skills section of your resume">
          <p className="mt-3 text-gray-700 text-sm mb-1">Recommended Skills:</p>
          <ul className="flex gap-2 flex-wrap">
            {recommendedSkills.map((skill, i) => (
              <SkillCard
                key={i}
                skill={skill}
                recommended
                handler={() => addSkill(skill)}
              />
            ))}
          </ul>
        </SectionDescription>
        <div>
          <p className="mt-3 text-gray-700 text-sm mb-1">My Skills:</p>
          <ul className="flex gap-2 flex-wrap">
            {getValues("skills") &&
              getValues("skills").map((skill: string, index: number) => {
                return (
                  <SkillCard
                    key={index}
                    skill={skill}
                    handler={() => removeSkillTag(skill)}
                  />
                );
              })}
          </ul>
        </div>
        <div className="flex gap-4 max-w-max mt-10">
          <label className="flex flex-col justify-center">
            <input
              className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[30ch]"
              type="text"
              placeholder="Enter skill.."
              ref={skillsRef}
            />
          </label>
          <AddNewButton handler={addSkill} />
        </div>
      </Fieldset>

      {/* Certifications */}
      <Fieldset
        legend="Certifications"
        addNewButtonHandler={() => appendCert({})}
      >
        {certFields.map((field, index) => {
          return (
            <div
              className="mt-5 p-5 border-2 flex flex-col gap-2 rounded-lg"
              key={field.id}
            >
              <div className="FormGroup max-w-full">
                <button
                  className="bg-red-100 py-2 px-6 rounded-full w-max ml-auto hover:scale-105 hover:shadow z-20 active:shadow-sm active:scale-100 flex gap-4 text-red-800"
                  type="button"
                  onClick={() => removeCert(index)}
                >
                  <span>Remove</span>
                  <AiFillDelete className="text-red-400 text-2xl" />
                </button>
              </div>
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">
                    Certification Name
                  </span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
                    type="text"
                    {...register(`certifications.${index}.name`)}
                  />
                </label>
                {errors.certifications &&
                  Array.isArray(errors.certifications) &&
                  errors.certifications[index].name && (
                    <span className="py-1 px-2 bg-red-400 text-white rounded">{`${errors.certifications[index].name.message}`}</span>
                  )}
              </div>
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">
                    Issuing Organization
                  </span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
                    type="text"
                    {...register(
                      `certifications.${index}.issuing_organization`
                    )}
                  />
                </label>
                {errors.certifications &&
                  Array.isArray(errors.certifications) &&
                  errors.certifications[index].issuing_organization && (
                    <span className="py-1 px-2 bg-red-400 text-white rounded">{`${errors.certifications[index].issuing_organization.message}`}</span>
                  )}
              </div>
              <div className="FormGroup max-w-full mb-8">
                <label className="flex flex-col justify-center">
                  <span className="text-sm text-gray-600">Year Earned</span>
                  <input
                    className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative text-gray-400 max-w-[10ch]"
                    type="number"
                    {...register(`certifications.${index}.year_earned`)}
                  />
                </label>
                {errors.certifications &&
                  Array.isArray(errors.certifications) &&
                  errors.certifications[index].year_earned && (
                    <span className="py-1 px-2 bg-red-400 text-white rounded">{`${errors.certifications[index].year_earned.message}`}</span>
                  )}
              </div>
            </div>
          );
        })}
      </Fieldset>

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
  handler: () => void;
};

function SkillCard({ skill, recommended = false, handler }: SkillCardProps) {
  return (
    <li
      className={`rounded-full ${
        recommended ? "bg-gray-200" : "bg-teal-700 text-white"
      }`}
    >
      <button
        className="cursor-pointer px-4 py-1 text-sm flex gap-2 items-center"
        type="button"
        onClick={handler}
      >
        <span>{skill}</span>
        {recommended ? <AiOutlinePlus /> : <AiFillDelete />}
      </button>
    </li>
  );
}
