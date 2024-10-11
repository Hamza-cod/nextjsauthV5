"use server"

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

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
  return { success : "email sent"}
}