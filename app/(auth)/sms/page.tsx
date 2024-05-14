"use client";

import FormInput from "@/components/form-input";
import FormBtn from "@/components/form-btn";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { smsVerification } from "./actions";
import { error } from "console";

const initialState = {
  token: false,
  error: undefined,
};

export default function SmsLogin() {
  const [state, dispatch] = useFormState(smsVerification, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">전화번호로 시작하세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <FormInput
            key="token"
            name="token"
            type="number"
            placeholder="Verification code"
            required
            errors={state.error?.formErrors}
          />
        ) : (
          <FormInput
            key="phone"
            name="phone"
            type="text"
            placeholder="Phone number"
            required
            errors={state.error?.formErrors}
          />
        )}

        <FormBtn
          text={state.token ? "Verify Token" : "Send Verification SMS"}
        />
      </form>
    </div>
  );
}
