"use server"

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
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
  const existingUser =  await getUserByEmail(email)
  if(!existingUser || !existingUser.email || !existingUser.password){
    return {error : "Email does not exist!"}
  }
  if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(email)
 const isSent =  await sendVerificationEmail(email,verificationToken.token)
 if(!isSent){
     return { error : "email not sent !"}
 }
    return {success : "Verifacation email sent"}
  }
  try {
    await signIn("credentials",{
      email,
      password,
      redirectTo : DEFAULT_LOGIN_REDIRECT
    })
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
}