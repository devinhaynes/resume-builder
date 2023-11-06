import { FieldErrors, FieldValues } from "react-hook-form";

type FormErrorProps = {
  errors: FieldErrors<FieldValues>;
  errorKey: string;
};

export default function FormError({ errors, errorKey }: FormErrorProps) {
  return (
    <>
      {errors[errorKey] && (
        <span className="py-1 px-2 bg-red-400 text-white rounded">{`${
          errors[errorKey]!.message
        }`}</span>
      )}
    </>
  );
}
