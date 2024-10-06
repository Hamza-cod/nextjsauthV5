"use client"

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

const Socail = () => {
 return ( 
  <div className="flex items-center w-full gap-x-2">
  <Button 
   className="w-full" 
   size={"lg"}
   variant={"outline"}
   onClick={()=>{}}
  >
   <FcGoogle size={30}/>
  </Button>
  <Button 
   className="w-full" 
   size={"lg"}
   variant={"outline"}
   onClick={()=>{}}
  >
   <FaGithub size={30}/>
  </Button>
  </div>
  );
}
 
export default Socail;