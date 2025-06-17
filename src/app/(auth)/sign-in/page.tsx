'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function SignInPage() {
  const { data: session } = useSession()
  
  if (session) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
          <p className="text-gray-600 mb-4">
            Signed in as <strong>{session.user?.email}</strong>
          </p>
          <button 
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-2">Sign In</h2>
        <p className="text-gray-600 mb-6">Please sign in to continue</p>
        
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-sm">
          You are not signed in
        </div>
        
        <button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    </div>
  )
}