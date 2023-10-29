import { ReactNode } from "react";

type SectionDescriptionProps = {
  description: string;
  children?: ReactNode;
};

export default function SectionDescription({
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
