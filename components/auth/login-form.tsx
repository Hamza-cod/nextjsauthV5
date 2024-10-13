"use client";
import * as z from "zod";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
Form,
FormField,
FormItem,
FormLabel,
FormControl,
FormMessage
} from "@/components/ui/form";
import { LoginSchem } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from './../form-error';
import FormSuccess from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import ShowHide from "./show-hide-passowrd";
import { useSearchParams } from "next/navigation";



const LoginForm = () => {
  const searchPrams = useSearchParams()
  const urlEroor = searchPrams.get("error") == "OAuthAccountNotLinked"?
                  "Email already in use with diffrent provider!" : ""
 const [error,setError] = useState<string|undefined>("");
 const [success,setSuccess] = useState<string|undefined>("");
 const [show,setShow] = useState(false)
 const form =  useForm<z.infer<typeof LoginSchem>>({
  resolver : zodResolver(LoginSchem),
  defaultValues : {
   email :"",
   password:""
  }
 })
 const [isPending,startTransition]=useTransition()
const onSubmit = (values : z.infer<typeof LoginSchem>)=>{
 startTransition( ()=>{
  setError("")
  setSuccess("")
   login(values).then((data) => {
    setError(data?.error)
    setSuccess(data?.success)
   })
 })
}

 return ( 
  <CardWrapper
  backbButtonLabel="Don't have an account?"
  headerLabel="Welcome back"
  backButtonHref="/auth/register"
  showSocial
  >
   <Form {...form}>
    <form 
         onSubmit={form.handleSubmit(onSubmit)}
         className="space-y-6"
     >
      <div className="space-y-4">
        <FormField 
          control={form.control}
          name="email"
          render={({field})=>(
            <FormItem>
               <FormLabel>
                 Email
               </FormLabel>
               <FormControl>
                 <Input 
                 disabled={isPending}
                 {...field} type="email" placeholder="exmple@email.com"/>
               </FormControl>
               <FormMessage className="first-letter:uppercase"/>
            </FormItem>
          )}
          />
        <FormField 
          control={form.control}
          name="password"
          render={({field})=>(
            <FormItem>
               <FormLabel>
                 Password
               </FormLabel>
               <FormControl>
                 <Input  disabled={isPending} {...field} type={show?"text" :"password"} placeholder="*******"/>
               </FormControl>
               <FormMessage className="first-letter:uppercase"/>
               <ShowHide show={show} setShow={setShow}/>
            </FormItem>
          )}
          />
      </div>
      <FormError message={error || urlEroor}/>
      <FormSuccess message={success}/>
      <Button className="w-full"  disabled={isPending}>
       Login
      </Button>
    </form>
   </Form>
   </CardWrapper>
  );
}
 
export default LoginForm;