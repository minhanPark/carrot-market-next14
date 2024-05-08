"use client";

import FormInput from "@/components/form-input";
import FormBtn from "@/components/form-btn";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { smsVerification } from "./actions";

export default function SmsLogin() {
  const [state, dispatch] = useFormState(smsVerification, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">전화번호로 시작하세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          name="phone"
          type="text"
          placeholder="Phone number"
          required
          errors={[]}
        />
        <FormInput
          name="token"
          type="number"
          placeholder="Verification code"
          required
          errors={[]}
        />
        <FormBtn text="Verify" />
      </form>
    </div>
  );
}
