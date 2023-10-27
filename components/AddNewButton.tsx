import { AiFillPlusCircle } from "react-icons/ai";

type AddNew = "workHistory" | "skill";

type AddNewButtonProps = {
  handler: () => void;
  type?: AddNew;
  value?: any;
};

export default function AddNewButton({ handler }: AddNewButtonProps) {
  return (
    <button className="ml-auto" type="button" onClick={handler}>
      <AiFillPlusCircle className="text-sky-700 text-3xl ml-auto" />
    </button>
  );
}
