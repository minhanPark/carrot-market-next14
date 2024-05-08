import { InputHTMLAttributes } from "react";

type FormInput = {
  name: string;
  errors?: string[];
};

export default function FormInput({
  errors = [],
  name,
  ...rest
}: FormInput & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className=" flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        {...rest}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
