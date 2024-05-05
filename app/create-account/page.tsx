import Link from "next/link";

import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";
export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요.</h1>
        <h2 className="text-xl">아래 폼을 채워주세요.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <div className=" flex flex-col gap-2">
          <input
            type="text"
            placeholder="Username"
            required
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
          />
          <span className="text-red-500">Input error</span>
        </div>
        <button className="primary-btn h-10 text-xl">Create account</button>
      </form>
      <div className="w-full h-px bg-neutral-500" />
      <div className="">
        <Link
          className="primary-btn flex h-10 items-center justify-center text-white gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          </span>
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
