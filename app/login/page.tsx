import FormInput from "@/components/form-input";
import FormBtn from "@/components/form-btn";
import SocialLogin from "@/components/social-login";

export default function Login() {
  const handleForm = async (formData: FormData) => {
    "use server";
    // 기본적으로 폼데이터로 보내기도 하고
    // server component의 server action이라 폼 데이터를 바로 받아옴
    console.log(formData.get("email"));
    console.log("run in server");
  };
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요.</h1>
        <h2 className="text-xl">로그인 후 이용해보세요.</h2>
      </div>
      <form className="flex flex-col gap-3" action={handleForm}>
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
          errors={[]}
        />
        <FormBtn loading={false} text="Login" />
      </form>
      <SocialLogin />
    </div>
  );
}
