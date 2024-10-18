// import NewVerficationForm from "@/components/auth/NewVerificationForm";
import dynamic from "next/dynamic";
const NewVerficationForm = dynamic(() => import('@/components/auth/NewVerificationForm'), { ssr: false });
const NewVerificaationPage = async () => {
 return ( 
  <NewVerficationForm/>
  );
}
 
export default NewVerificaationPage;