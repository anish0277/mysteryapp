'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Navbar from "@/components/navbar";
import { Message } from '@/model/User';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { z } from "zod"
import axios from 'axios';
import { toast } from 'sonner';
import { useSession } from "next-auth/react";
import { User } from 'next-auth';

const page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)
  
  type AcceptMessageFormData = z.infer<typeof acceptMessageSchema>
  
  const { data: session } = useSession();

  const deleteMessage = async (messageId: string) => {
  try {
    const response = await axios.delete(`/api/delete-message/${messageId}`)
    if (response.data.success) {
      setMessages((prev) =>
        prev.filter((message) => message._id.toString() !== messageId)
      )
      toast.success('Message deleted successfully')
    } else {
      toast.error(response.data.message || 'Failed to delete message')
    }
  } catch (error) {
    toast.error('Error deleting message')
  }
}


  const form = useForm<AcceptMessageFormData>({
    resolver: zodResolver(acceptMessageSchema)
  })
  
  const { watch, setValue } = form
  const isAcceptingMessage = watch('isAcceptingMessage')

  const fetchAcceptMessage = useCallback(async () => {
    try {
      setIsSwitchLoading(true)
      const result = await axios.get('/api/accepting-messages')
      setValue('isAcceptingMessage', result.data.isAcceptingMessage)
    } catch (error) {
      console.error("Error while getting the state that is accepting", error)
      toast.error('Failed to Fetch Message Settings')
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue])

  const getMessages = useCallback(async () => {
    try {
      setIsLoading(true)
      const result = await axios.get('/api/get-messages')
      setMessages(result.data.messages || [])
    } catch (error) {
      console.error("Error Fetching Messages", error)
      toast.error('Failed to Fetch Messages')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!session || !session.user) return
    getMessages()
    fetchAcceptMessage()
  }, [session, getMessages, fetchAcceptMessage])

  const handleSwitchChange = async () => {
    try {
      setIsSwitchLoading(true)
      const result = await axios.post('/api/accepting-messages', {
        AcceptingMessage: !isAcceptingMessage
      })
      setValue('isAcceptingMessage', !isAcceptingMessage)
      toast.success('Changed State Successfully')
    } catch (err) {
      toast.error('Error While Changing State')
    } finally {
      setIsSwitchLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast.success('Copied Successfully')
  }

  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p>Please login to access your dashboard</p>
        </div>
      </div>
    )
  }

  const { username } = session?.user as User
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Profile URL</h2>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={profileUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">Accept Messages</h2>
                <p className="text-gray-600">
                  {isAcceptingMessage ? 'You are currently accepting messages' : 'You are not accepting messages'}
                </p>
              </div>
              <button
                onClick={handleSwitchChange}
                disabled={isSwitchLoading}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isAcceptingMessage ? 'bg-blue-600' : 'bg-gray-200'
                } ${isSwitchLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAcceptingMessage ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Your Messages</h2>
              <button
                onClick={getMessages}
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No messages yet</p>
                <p className="text-sm mt-2">Share your profile URL to start receiving messages!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message._id.toString()} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-gray-800 mb-2">{message.content}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString()} at{' '}
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteMessage(message._id.toString())}
                        className="ml-4 px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page