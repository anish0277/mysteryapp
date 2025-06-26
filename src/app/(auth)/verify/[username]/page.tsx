"use client"
import axios from 'axios'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {verifySchema} from '@/schemas/verifySchema'
import { useParams } from 'next/navigation'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type VerifyFormData = z.infer<typeof verifySchema>

const VerifyAccount = () => {
    const { username } = useParams()
    const router = useRouter()
    
    const form = useForm<VerifyFormData>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
        code: ''
  }

    })
    
    const onSubmit = async (data: VerifyFormData) => {
        try {
                        console.log(username,'username')
            console.log(data.code,'code')

            const result = await axios.post('/api/verify-code', {
                username,
                verifyCode: data.code
            })
            toast.success(result.data.message)
            router.replace('/sign-in')
        } catch (error) {
            toast.error('Error While verifying Code .......Try again')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg 
                                className="w-8 h-8 text-white" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                                />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Verify Your Account
                        </h1>
                        <p className="text-gray-600">
                            Enter the verification code sent to your email
                        </p>
                    </div>

                    {/* Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-semibold text-gray-700">
                                            Verification Code
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Enter 6-digit code" 
                                                {...field}
                                                className="h-12 text-center text-lg font-mono tracking-widest border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 rounded-xl"
                                                maxLength={6}
                                            />
                                        </FormControl>
                                        <FormDescription className="text-center text-sm text-gray-500">
                                            Please enter the 6-digit verification code
                                        </FormDescription>
                                        <FormMessage className="text-center" />
                                    </FormItem>
                                )}
                            />
                            
                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Verifying...</span>
                                    </div>
                                ) : (
                                    'Verify Account'
                                )}
                            </Button>
                        </form>
                    </Form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500 mb-4">
                            Didn't receive the code?
                        </p>
                        <button 
                            type="button"
                            className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200 hover:underline"
                            onClick={() => {
                                // Add resend code logic here
                                toast.info('Resend functionality coming soon!')
                            }}
                        >
                            Resend Code
                        </button>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <button
                        type="button"
                        onClick={() => router.push('/sign-in')}
                        className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200"
                    >
                        ← Back to Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}
export default VerifyAccount;
