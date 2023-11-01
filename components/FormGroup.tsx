import { ReactNode } from "react";

import { skills } from "@/data/skills.json";

type InputType =
  | "text"
  | "checkbox"
  | "textarea"
  | "button"
  | "email"
  | "date"
  | "dropdown"
  | "file";

type FormGroupProps = {
  label?: string;
  name: string;
  type?: InputType;
  children?: ReactNode;
  value?: string;
  placeholder?: string;
};

type OptionalProps = {
  name: string;
  placeholder?: string;
};

export default function FormGroup({
  type,
  label,
  name,
  placeholder,
}: FormGroupProps) {
  const ElementToReturn = () => {
    switch (type) {
      case "textarea":
        return <TextArea name={name} />;
      case "text":
        return <TextInput name={name} placeholder={placeholder} />;
      case "checkbox":
        return <Checkbox name={name} />;
      case "date":
        return <DatePicker name={name} />;
      case "email":
        return <Email name={name} />;
      case "dropdown":
        return <Dropdown name={name} options={skills} />;
      case "file":
        return <FileInput name={name} acceptableFormats={[".pdf", ".docx"]} />;
      default:
        break;
    }
  };
  return (
    <div className="FormGroup max-w-full mb-8">
      <label className="flex flex-col justify-center">
        <span className="text-sm text-gray-600">{label}</span>
        {ElementToReturn()}
      </label>
    </div>
  );
}

function TextArea({ name }: OptionalProps) {
  return (
    <textarea
      className="border rounded focus:outline-teal-700 py-1 px-2 text-lg w-full max-w-full"
      rows={10}
    ></textarea>
  );
}

function TextInput({ name, placeholder }: OptionalProps) {
  return (
    <input
      className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
      type="text"
      placeholder={placeholder}
    />
  );
}

function Checkbox({ name }: OptionalProps) {
  return <input className="text-sm mr-4" type="checkbox" />;
}

function DatePicker({ name }: OptionalProps) {
  return (
    <input
      className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative text-gray-400 max-w-[20ch]"
      type="date"
    />
  );
}

function Email({ name }: OptionalProps) {
  return (
    <input
      className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative max-w-[50ch]"
      type="email"
    />
  );
}

function FileInput({
  name,
  acceptableFormats = [],
}: OptionalProps & { acceptableFormats: string[] }) {
  return <input type="file" accept={acceptableFormats.join(",")} />;
}

function Dropdown({ name, options }: OptionalProps & { options: string[] }) {
  return (
    <select multiple>
      {options.map((option, i) => (
        <option key={option + i} value={formatOption(option)}>
          {option}
        </option>
      ))}
    </select>
  );
}

function formatOption(option: string) {
  option = option.toLowerCase().trim().replace(" ", "_");
  return option;
}
