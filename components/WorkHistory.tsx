import type { TWorkHistory } from "@/types/FormTypes";
import FormGroup from "./FormGroup";
import { AiFillDelete } from "react-icons/ai";

type WorkHistoryProps = TWorkHistory & {
  removeWorkHistory: (id: number) => void;
};

export default function WorkHistory({
  id,
  title,
  position,
  organization,
  location,
  description,
  removeWorkHistory,
}: WorkHistoryProps) {
  return (
    <div className="WorkHistory mt-5 p-5 border-2 flex flex-col gap-2 rounded-lg">
      <FormGroup
        type="text"
        label="Job Title"
        name={"position" + id}
        value={position}
      />
      <FormGroup
        type="text"
        label="Employer"
        name={"org" + id}
        value={organization}
      />
      <FormGroup
        type="text"
        label="Location"
        name={"location" + id}
        value={location}
      />
      <div className="flex gap-4">
        <FormGroup
          type="date"
          label="Start Date"
          name={"experience_start_date" + id}
        />
        <FormGroup
          type="date"
          label="End Date"
          name={"experience_end_date" + id}
        />
        <FormGroup type="checkbox" label="Currently Work here" />
      </div>
      <FormGroup
        type="textarea"
        label="Job Description"
        name={"jobDescription" + id}
        value={description}
      />

      <button
        className="bg-red-100 p-2 rounded-full w-max ml-auto hover:scale-105 hover:shadow z-20 active:shadow-sm active:scale-100"
        type="button"
        onClick={() => removeWorkHistory(id)}
      >
        <AiFillDelete className="text-red-400 text-2xl" />
      </button>
    </div>
  );
}
