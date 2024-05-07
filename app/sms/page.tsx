import FormInput from "@/components/form-input";
import FormBtn from "@/components/form-btn";
import SocialLogin from "@/components/social-login";

export default function SmsLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS 로그인</h1>
        <h2 className="text-xl">전화번호로 시작하세요.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          name="phoneNumber"
          type="number"
          placeholder="Phone number"
          required
          errors={[]}
        />
        <FormInput
          name="verificationCode"
          type="number"
          placeholder="Verification code"
          required
          errors={[]}
        />
        <FormBtn loading={false} text="Verify" />
      </form>
    </div>
  );
}
