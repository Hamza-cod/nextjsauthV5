"use client"

import { 
 Card,
 CardContent,
 CardFooter,
 CardHeader
 } from "@/components/ui/card";
import Header from "./card-header";
import Socail from "@/components/auth/socail";
import BackButton from "./back-button";


interface CardWrapperProps{
 children : React.ReactNode;
 headerLabaer : string;
 backbButtonLabel : string;
 backButtonHref : string;
 showSocial?: boolean;
}
export const CardWrapper = ({
 children ,
 headerLabael ,
 backbButtonLabel,
 backButtonHref,
 showSocial,
} : CardWrapperProps)=>{
 return(
 <Card className="w-[400px] shadow-md">
  <CardHeader>
   <Header label={headerLabael}/>
  </CardHeader>
  <CardContent>
    {children}
  </CardContent>
  {showSocial &&(
    <CardFooter>
      <Socail/>
    </CardFooter>
  )}
  <CardFooter>
    <BackButton
    label={backbButtonLabel}
    href={backButtonHref}
    />
  </CardFooter>
 </Card>)
}