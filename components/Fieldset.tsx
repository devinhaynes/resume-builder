import { ReactNode, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import AddNewButton from "./AddNewButton";

type FieldsetProps = {
  legend: string;
  initiallyOpen?: boolean;
  children?: ReactNode;
  addNewButtonHandler?: () => void;
};

export default function Fieldset({
  legend,
  initiallyOpen = false,
  children,
  addNewButtonHandler,
}: FieldsetProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  return (
    <fieldset className="bg-white flex flex-col gap-5 my-10 p-5 shadow-card rounded-lg border-black/2 w-full max-w-[40em] h-max">
      <button
        type="button"
        className="flex gap-5 justify-between items-center cursor-pointer pb-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <legend className="text-2xl">{legend}</legend>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <div className={!isOpen ? "h-0 overflow-hidden" : ""}>{children}</div>
      {addNewButtonHandler && (
        <AddNewButton
          handler={() => {
            addNewButtonHandler();
            setIsOpen(true);
          }}
        />
      )}
    </fieldset>
  );
}
