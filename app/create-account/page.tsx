"use client";

import FormInput from "@/components/form-input";
import FormBtn from "@/components/form-btn";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./action";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요.</h1>
        <h2 className="text-xl">아래 폼을 채워주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
        />
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
        />
        <FormInput
          name="passwordConfirmation"
          type="password"
          placeholder="Password confirmation"
          required
          errors={state?.fieldErrors.passwordConfirmation}
        />
        <FormBtn text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
