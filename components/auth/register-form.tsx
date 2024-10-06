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
import {  RegisterSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from '../form-error';
import FormSuccess from "../form-success";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";
import ShowHide from "./show-hide-passowrd";



const RegisterForm = () => {
  const [show,setShow] = useState(false);
 const [error,setError] = useState<string|undefined>("");
 const [success,setSuccess] = useState<string|undefined>("");
 const form =  useForm<z.infer<typeof RegisterSchema>>({
  resolver : zodResolver(RegisterSchema),
  defaultValues : {
   email :"",
   password:""
  }
 })
 const [isPending,startTransition]=useTransition()
const onSubmit = (values : z.infer<typeof RegisterSchema>)=>{
 startTransition( ()=>{
  setError("")
  setSuccess("")
   register(values).then((data) => {
    // console.log(data)
    setError(data.error)
    setSuccess(data.success)
   })
 })
}

 return ( 
  <CardWrapper
  backbButtonLabel="you have an account?"
  headerLabael="Create your account NOW!"
  backButtonHref="/auth/login"
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
          name="name"
          render={({field})=>(
            <FormItem>
               <FormLabel>
                 Name
               </FormLabel>
               <FormControl>
                 <Input 
                 disabled={isPending}
                 {...field} type="name" placeholder="John Doe"/>
               </FormControl>
               <FormMessage className="first-letter:uppercase"/>
            </FormItem>
          )}
          />
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
                 <Input  disabled={isPending} {...field} type={show?"text":"password" }placeholder="*******"/>
               </FormControl>
               <FormMessage className="first-letter:uppercase"/>
                <ShowHide show={show} setShow={setShow}/>
            </FormItem>
          )}
          />
      </div>
      <FormError message={error}/>
      <FormSuccess message={success}/>
      <Button className="w-full"  disabled={isPending}>
       Register
      </Button>
    </form>
   </Form>
   </CardWrapper>
  );
}
 
export default RegisterForm;