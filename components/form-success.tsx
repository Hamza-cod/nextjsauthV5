"use client"

import { CheckCircle2Icon } from "lucide-react";


interface FormSuccess {
 message?: string
}
const FormSuccess = ({message}:FormSuccess) => {
 if(!message) return null;
 return ( 
  <div className="bg-emerald-500/15 p-3 rounded-md 
  flex items-center gap-x-2 text-emerald-500">
   <CheckCircle2Icon/>
   {message}
  </div>
  );
}
 
export default FormSuccess;