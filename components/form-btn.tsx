"use client";

import { useFormStatus } from "react-dom";

interface FormBtn {
  text: string;
}

export default function FormBtn({ text }: FormBtn) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 text-xl disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
