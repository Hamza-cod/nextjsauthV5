"use client"

import { useRouter } from "next/navigation";


interface LoginButtonPronps {
 children : React.ReactNode;
 mode?:"modal"|"redirect";
 asChild?:boolean;
} 
export const LoginButton  =({
 children ,
 mode = "redirect",
 // asChild
}:LoginButtonPronps)=>{
 const router = useRouter();
 const onClick = ()=>{
  router.push("/auth/login")
 }
 if( mode == "modal"){
  return (
   <span>
    todo : modal 
   </span>
  )
 }

 return <span onClick={onClick} className="cursor-pointer">
  {children}
 </span>
}