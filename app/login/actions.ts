"use server";

import { redirect } from "next/navigation";

export async function handleForm(prevState: any, formData: FormData) {
  // 기본적으로 폼데이터로 보내기도 하고
  // server component의 server action이라 폼 데이터를 바로 받아옴
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  //redirect("/");
  console.log("run in server");
  return { errors: ["password wrong", "password too short"] };
}
