"use server";

import { z } from "zod";

const checkPasswords = ({
  password,
  passwordConfirmation,
}: {
  password: string;
  passwordConfirmation: string;
}) => password === passwordConfirmation;

const formSchema = z
  .object({
    username: z.string().trim().min(3, "short!").max(10),
    email: z.string().email(),
    password: z.string().min(10),
    passwordConfirmation: z.string().min(10),
  })
  .refine(checkPasswords, {
    path: ["passwordConfirmation"],
    message: "Both passwords must match",
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirmation: formData.get("passwordConfirmation"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
