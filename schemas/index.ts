import * as z from "zod";

export const LoginSchem  = z.object({
 email : z.string({
  required_error : "email is required",
  
 }).email({
  message: "email is required",
 }),
 password : z.string().min(1,{
  message: "password is required"
 })
})
export const RegisterSchema  = z.object({
 email : z.string({
  required_error : "email is required",
  
 }).email({
  message: "email is required",
 }),
 password : z.string().min(6,{
  message: "password is required and min characters in 6 "
 }),
 name : z.string().min(3,{
  message: "name is required"
 })
})

