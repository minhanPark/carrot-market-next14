"use client";

import FormInput from "@/components/form-input";
import FormBtn from "@/components/form-btn";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

export default function Login() {
  const [state, action] = useFormState(handleForm, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요.</h1>
        <h2 className="text-xl">로그인 후 이용해보세요.</h2>
      </div>
      <form className="flex flex-col gap-3" action={action}>
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.errors ?? []}
        />
        <FormBtn text="Login" />
      </form>
      <SocialLogin />
    </div>
  );
}
