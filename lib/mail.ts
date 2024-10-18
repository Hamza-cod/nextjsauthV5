import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async(
 email :string,
 token : string
) =>{
   const  confirmationLink  = `http://localhost:3000/auth/new-verification?token=${token}`
  const {error} = await resend.emails.send({
    from: 'Next js auth app <onboarding@resend.dev>',
    to: [email],
    subject: 'Confirm your email',
    html: `<p>Click <a href=${confirmationLink}>here</a> to confirm you email</p>`
  });
  if(error) return false;
  return true;
}