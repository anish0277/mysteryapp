'use client'
import React, { useState,useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Navbar from '@/components/navbar'
import { Separator } from "@/components/ui/separator"

const page = () => {
  const params = useParams()
  const username = params.username as string

  const [content, setContent] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isSuggestingMsg, setIsSuggestingMsg] = useState(false)
  const [suggestMsg, setSuggestMsg] = useState<string[]>([])

  const sendMessage = async () => {
    if (!content.trim()) {
      toast.error("Message can't be empty")
      return
    }
    try {
      setIsSending(true)
      const result = await axios.post('/api/send-messages', {
        username,
        content
      })
      toast.success(result.data.message)
      setContent('')
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Error while sending message')
    } finally {
      setIsSending(false)
    }
  }

  const suggestMessages = async () => {
    try {
      setIsSuggestingMsg(true)
      const result = await axios.post('/api/suggest-message')
      setSuggestMsg(result.data.suggestions || [])
    } catch (error) {
      toast.error('Error suggesting messages')
    } finally {
      setIsSuggestingMsg(false)
    }
  }
  useEffect(() => {
  suggestMessages()
}, [])


  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Send Your Anonymous Message To <span className="text-blue-600">@{username}</span>
        </h1>
        <Separator className="my-4" />

        <Input
          type="text"
          placeholder="Type your anonymous message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <Button onClick={sendMessage} disabled={isSending || !content.trim()}>
            {isSending ? 'Sending...' : 'Send'}
          </Button>
          <Button
            onClick={suggestMessages}
            variant="secondary"
            disabled={isSuggestingMsg}
          >
            {isSuggestingMsg ? 'Loading...' : 'Suggest'}
          </Button>
        </div>

        {suggestMsg.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-2">Click a suggestion to use it:</p>
            <div className="space-y-2">
              {suggestMsg.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => setContent(msg)}
                  className="w-full text-left px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                >
                  {msg}
                </button>
              ))}
            </div>
            
          </div>
        )}
        
      </div>
      
    </div>
  )
}

export default page
