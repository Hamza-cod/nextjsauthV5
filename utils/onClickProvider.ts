"use client"
import {signIn} from "next-auth/react"
import { provider } from "@/types";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const onClickProvider = (provider :provider) =>{
    signIn(provider,{
      callbackUrl :DEFAULT_LOGIN_REDIRECT
    })
  }
