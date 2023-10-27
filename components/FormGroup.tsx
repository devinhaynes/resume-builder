import { ReactNode, ChangeEvent } from "react";

type InputType = "text" | "checkbox" | "textarea" | "button" | "email" | "date";

type FormGroupProps = {
  label?: string;
  name?: string;
  type?: InputType;
  children?: ReactNode;
  value?: string;
  required?: boolean;
  placeholder?: string;
};

export default function FormGroup({
  type,
  label,
  name,
  required = false,
  placeholder,
}: FormGroupProps) {
  const ElementToReturn = () => {
    switch (type) {
      case "textarea":
        return <TextArea name={name} required={required} />;
      case "text":
        return (
          <TextInput
            name={name}
            required={required}
            placeholder={placeholder}
          />
        );
      case "checkbox":
        return <Checkbox />;
      case "date":
        return <DatePicker />;
      case "email":
        return <Email name={name} />;
      default:
        break;
    }
  };
  return (
    <div className="FormGroup max-w-full">
      <label className="flex mb-4 flex-col justify-center">
        <span className="text-sm text-gray-600">{label}</span>
        {ElementToReturn()}
      </label>
    </div>
  );
}

type OptionalProps = {
  name?: string;
  required?: boolean;
  placeholder?: string;
};

function TextArea({ name, required }: OptionalProps) {
  return (
    <textarea
      className="border rounded focus:outline-teal-700 max-w-full py-1 px-2 text-lg w-full max-w-full"
      name={name}
      rows={10}
      required={required}
    ></textarea>
  );
}

function TextInput({ name, required, placeholder }: OptionalProps) {
  return (
    <input
      className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 relative w-full max-w-[50ch]"
      type="text"
      name={name}
      required={required}
      placeholder={placeholder}
    />
  );
}

function Checkbox({ name, required }: OptionalProps) {
  return (
    <input
      className="text-sm mr-4"
      type="checkbox"
      name={name}
      required={required}
    />
  );
}

function DatePicker({ name, required }: OptionalProps) {
  return (
    <input
      className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative text-gray-400 max-w-[20ch]"
      type="date"
      name={name}
      required={required}
    />
  );
}

function Email({ name, required }: OptionalProps) {
  return (
    <input
      className="border-b-2 text-lg focus:outline-teal-700 py-1 px-2 mb-4 relative max-w-[50ch]"
      type="email"
      name={name}
      required={required}
    />
  );
}
