'use client'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import Link from "next/link"

const Navbar = () => {
    const { data: session } = useSession()
    const user: User = session?.user as User

    return (
        <nav className="bg-slate-900/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                   <Link 
                        href='#' 
                        className="text-white text-xl font-bold hover:text-purple-300 transition-colors duration-200"
                    >
                        Mystery App
                    </Link>

                    <div className="flex items-center space-x-4">
                        {session ? (
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-300 text-sm font-medium hidden sm:block">
                                    Welcome, {user.username || user.email}
                                </span>
                                <button 
                                    onClick={() => signOut()} 
                                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 hover:transform hover:scale-105 border border-white/20 hover:border-white/30"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link href='/sign-in'>
                                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 hover:transform hover:scale-105 border border-white/20 hover:border-white/30">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                </div>

                {session && (
                    <div className="sm:hidden pb-3">
                        <span className="text-gray-300 text-sm">
                            Welcome, {user.username || user.email}
                        </span>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar