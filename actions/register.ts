"use server"

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register  = async  (values: z.infer<typeof RegisterSchema> )=>{
  const validatedFields = RegisterSchema.safeParse(values);
  if(!validatedFields.success){
    return {error : "invalid fields"}
  }
  const {email ,password,name} = validatedFields.data
  const hashedPAssword = await bcrypt.hashSync(password,10)
  const userExists = await getUserByEmail(email);
  if(userExists){
    return { error : "email alredy in use!"}
  }
  await db.user.create({
    data:{
      name,
      email,
      password : hashedPAssword
    }
  })
  // TODO : send a  verification token  email
  const  veificationToken = await generateVerificationToken(email)
 const isSent =  await sendVerificationEmail(email,veificationToken.token)
 if(!isSent){
     return { error : "email not sent !"}
 }
  return { success : "verification email sent"}
}