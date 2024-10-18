"use server"
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db } from "@/lib/db";


export const newVerificationToken = async (
 token : string
)=>{
  const existingToken  = await getVerificationTokenByToken(token)
  if(!existingToken) {
   return { error : "Token those not exist!"}
  }
  const hasExpired = new Date(existingToken.expires)<  new Date();
  if(hasExpired){
   return {error :  "your verification link is exipred!"}
  }
  const existingUser = await getUserByEmail(existingToken.email)
  if(!existingUser){
   return { error :" user those not exist"}
  }
  if(existingUser.emailVerified){
    return {seccuss : "You email already verified 😃"}
  }
  await db.user.update({
   where : {
    id : existingUser?.id
   },
   data : {
    emailVerified : new Date(),
    email : existingToken.email
   }
  })
  await db.verivicationToken.delete({
   where : {id : existingToken.id}
  })
  return {seccuss : "Email verified 😃"}
}