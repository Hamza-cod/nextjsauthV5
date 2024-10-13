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
 headerLabel : string;
 backbButtonLabel : string;
 backButtonHref : string;
 showSocial?: boolean;
}
export const CardWrapper = ({
 children ,
 headerLabel ,
 backbButtonLabel,
 backButtonHref,
 showSocial,
} : CardWrapperProps)=>{
 return(
 <Card className="w-[400px] shadow-md">
  <CardHeader>
   <Header label={headerLabel}/>
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