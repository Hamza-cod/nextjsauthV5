"use client"

import { newVerificationToken } from "@/actions/new-verification"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import {BeatLoader} from "react-spinners"
import FormError from "../form-error"
import FormSuccess from "../form-success"
const NewVerficationForm = () => {
 const searchParams = useSearchParams();
 const token  = searchParams.get("token") 
 const [error,setError] = useState<string |undefined>();
 const [success,setSuccess] = useState<string |undefined>();


 const onSubmit = useCallback(async ()=>{
  if(success || error) return;
  if(!token){ 
    setError("Missing token")
    return;
  }
  await newVerificationToken(token).then((data)=>{
    setSuccess(data.seccuss);
    setError(data.error);
  }).catch(()=>{setError("Somthing went wrong:")})
 },[token,success,error])
 useEffect(()=>{
  if(!error && !success ) onSubmit();
 },[onSubmit,success,error])
  return (
    <CardWrapper
    headerLabel="Confirming your verfication"
    backbButtonLabel="back to login page"
    backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
      { !error && !success && <BeatLoader/>}
      <FormError message={error}/>
      <FormSuccess message={success}/>
      </div>
    </CardWrapper>
  )
}

export default NewVerficationForm