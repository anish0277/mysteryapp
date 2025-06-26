"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {useDebounce} from '@uidotdev/usehooks'
import {signUpSchema} from '@/schemas/signUpSchema'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

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
import {Library, Loader2} from 'lucide-react'
import Link from "next/link"

function page() {
        
    const router = useRouter() 
    type SignUpFormData = z.infer<typeof signUpSchema>
    const [username,setUsername]=useState('')
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [usernameMessage, setUsernameMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const debounceUsername=useDebounce(username,300)

    const checkUsernameUnique=async()=>{
        if(debounceUsername){
            setIsCheckingUsername(true)
            setUsernameMessage('')
            try{
                const result = await axios.get(`/api/check-username-unique?username=${debounceUsername}`)  
                console.log(result.data.message)           
                setUsernameMessage(result.data.message)
            }catch(error){
            setUsernameMessage('Error checking username')
            }finally {
            setIsCheckingUsername(false) 
        }
        }
    }

    useEffect(()=>{
        checkUsernameUnique()
    },[debounceUsername])

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })

    const onsubmit=async(data:SignUpFormData)=>{
        setIsSubmitting(true)
        try{
            const result=await axios.post('/api/sign-up',data)
            router.replace(`/verify/${username}`)
            toast.success(result.data.message) 
        }catch(error){
            toast.error('Something went wrong while submission of form. Try again')
        }finally{
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                   <Library className="h-6 w-6 text-white" />
                </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Mystery Message</h1>
            <h2 className="text-gray-600">Sign up to start your anonymous adventure</h2>
          </div>

          <div className="bg-white shadow-lg rounded-lg px-8 py-8 border border-gray-200">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
                      <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                      <FormItem>
                      <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                           Username
                      </FormLabel>
                      <FormControl>
                      <Input
                     placeholder="Enter your username"
                          {...field}
                        onChange={(e) => {
                        field.onChange(e)
                        setUsername(e.target.value)
                    }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"/>
              </FormControl>
                                        
                      {/* Username Status */}
                      {isCheckingUsername && (
                      <div className="flex items-center space-x-2 mt-2">
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-500" />
                      <span className="text-sm text-gray-600">Checking username...</span>
                    </div> )}
                                        
                    <FormDescription>
                  {!isCheckingUsername && usernameMessage && (
                    <span className={`text-sm mt-1 block ${
                          usernameMessage === 'username is unique' 
                          ? 'text-green-600' 
                          : 'text-red-600'}`}>
                        {usernameMessage}
                    </span>
                )}        
                    </FormDescription>
                    <FormMessage className="text-red-600 text-sm mt-1" />
                          </FormItem>
                            )}
                            />
                          <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                          <FormItem>
                          <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                                 Email
                            </FormLabel>
                            <FormControl>
                            <Input 
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                               />
                            </FormControl>
                            <FormMessage className="text-red-600 text-sm mt-1" />
                            </FormItem> )}/>

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                             <FormItem>
                        <FormLabel className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                        </FormLabel>
                        <FormControl>
                        <div className="relative">
                        <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        />
                        <button
                         type="button"
                         onClick={() => setShowPassword(!showPassword)}
                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                        </button>
                         </div>
                        </FormControl>
                         <FormMessage className="text-red-600 text-sm mt-1" />
                             </FormItem>
                                )}
                            />
                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        Submitting...
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-6 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">or</span>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">
                          Already a member?{' '}
                           <Link 
                             href='/sign-in'
                            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
              </div>
            </div>
        </div>
    )
}

export default page