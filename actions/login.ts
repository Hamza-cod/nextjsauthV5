"use server"

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchem } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login  = async (values: z.infer<typeof LoginSchem> )=>{
  const validatedFields = LoginSchem.safeParse(values);

  if(!validatedFields.success){
    return {error : "invalid fields"}
  }
  const {email,password} = validatedFields.data;
  try {
    await signIn("credentials",{
      email,
      password,
      redirectTo : DEFAULT_LOGIN_REDIRECT
    })
    return { success : "email sent"}
  } catch (error) {
    if(error instanceof AuthError){
      switch (error.type) {
        case "CredentialsSignin":
           return { error : "invalid Credentials"};
        default:
          return { error : "somthing went wring!"}
      }
    }
    throw error;
  }
  // return { success : "email sent"}
}