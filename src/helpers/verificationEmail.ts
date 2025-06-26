import { resend } from '../lib/resend'
import VerificationEmail from '../../emails/verificationEmail'
import { ApiResponse } from '../types/ApiResponse'

export default async function sendVerification(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        console.log('Sending email to:', email, 'with code:', verifyCode)
        
        const { data, error } = await resend.emails.send({
            from: 'Mystery App <onboarding@resend.dev>',
            to: [email],
            subject: 'Mystery message | Verification Code',
            react: VerificationEmail({ username, otp: verifyCode }),
        });
        
        if (error) {
            console.error('Resend API error:', error)
            return {
                success: false,
                message: `Failed to send verification email: ${error.message || JSON.stringify(error)}`
            }
        }
        
        console.log('Email sent successfully:', data)
        return {
            success: true,
            message: 'Successfully sent verification email'
        }
        
    } catch (error) {
        console.error("Error sending verification email", error)
        return {
            success: false,
            message: `Failed to send verification email due to server error: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
    }
}