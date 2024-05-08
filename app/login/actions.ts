"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(10),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
