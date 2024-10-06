"use server"

import { LoginSchem } from "@/schemas";
import * as z from "zod";

export const login  = async (values: z.infer<typeof LoginSchem> )=>{
  const validatedFields = LoginSchem.safeParse(values);

  if(!validatedFields.success){
    return {error : "invalid fields"}
  }
  return { success : "email sent"}
}