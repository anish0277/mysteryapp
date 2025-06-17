import {resend} from '../lib/resend'
import VerificationEmail from '../../emails/verificationEmail'
import {ApiResponse}from '../types/ApiResponse'

export default async function sendVerification(
  email: string,
  username: string,
  verifyCode: string
):Promise<ApiResponse>{
    try{
            
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Mystery message | Verification Code',
      react: VerificationEmail({username,otp:verifyCode}),
    });
        return {
            success:true,
            message:'successfully sent verfication email'
        }
    }catch(error){
        console.error("Error sending verification email",error)
        return {
            success:false,
            message:'failed to send verfication email'
        }
    }


}

