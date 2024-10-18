"use client"
 
import { Checkbox } from "@/components/ui/checkbox"
interface ShowHideProps {
 show : boolean;
 setShow : (notShow : boolean) => void
}
const ShowHide = ({setShow,show} : ShowHideProps) => {
 return ( 
  <div className="flex items-center space-x-2 w-full justify-end" >
      <Checkbox id="terms" onCheckedChange={()=>setShow(!show)} />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        show password?
      </label>
    </div>
  );
}
 
export default ShowHide;