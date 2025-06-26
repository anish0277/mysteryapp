import Navbar from "@/components/navbar";
import { ArrowRight, MessageCircle, Shield, Users, Zap, Star, Heart, Coffee } from "lucide-react";
import Link from "next/link"


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar/>
      
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20"></div>
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-8">
              <Heart className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-purple-300 text-sm font-medium">Built with care for your privacy</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Sometimes the best conversations
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> happen anonymously</span>
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              I created this because I believe everyone deserves a space to share their thoughts freely. No judgment, no tracking, just honest communication.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              
              <Link href='/sign-in'>
              <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center">
                Try it out
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>

            </div>
          </div>
        </div>
        
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      <section id="about" className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Why I built this
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              After years of seeing people hold back their real thoughts on social media, I wanted to create something different. 
              A place where you could be completely honest without worrying about your reputation, your job, or what others might think.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              This isn't about being mean or hurtful - it's about giving people the freedom to share genuine feedback, 
              ask difficult questions, or simply express themselves without fear.
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              What makes this different
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Built from the ground up with privacy and simplicity in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Actually anonymous</h3>
              <p className="text-gray-300 leading-relaxed">
                No hidden trackers, no data collection. I don't even want to know who you are. Your messages are truly private.
              </p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Dead simple</h3>
              <p className="text-gray-300 leading-relaxed">
                No complicated setup, no endless forms. Create a link, share it, start receiving honest messages. That's it.
              </p>
            </div>
            
            <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Real connections</h3>
              <p className="text-gray-300 leading-relaxed">
                When people can speak freely, you get to hear what they really think. No filters, no fake politeness.
              </p>
            </div>
          </div>
        </div>
      </section>

       <section className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-300">
              Three steps to start getting honest feedback
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Pick a username</h3>
              <p className="text-gray-300">
                Choose any name you like. No email, no phone number, no personal info needed.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Share your link</h3>
              <p className="text-gray-300">
                Post it on your social media, send it to friends, or share it however you want.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Get real feedback</h3>
              <p className="text-gray-300">
                People can now send you completely anonymous messages. No strings attached.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              What people are saying
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-gray-300 mb-4 italic">
                "Finally found out what my friends actually think about my cooking. Turns out I've been oversalting everything for years 😅"
              </p>
              <div className="text-purple-400 font-medium">- Sarah M.</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-gray-300 mb-4 italic">
                "Got some brutal but honest feedback about my YouTube videos. Changed everything and my views doubled!"
              </p>
              <div className="text-blue-400 font-medium">- Content creator</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-gray-300 mb-4 italic">
                "My team finally told me what they really thought about our project. Best decision I ever made as a manager."
              </p>
              <div className="text-green-400 font-medium">- Tech lead</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-gray-300 mb-4 italic">
                "Simple, clean, no BS. Exactly what I needed to get honest feedback from my customers."
              </p>
              <div className="text-pink-400 font-medium">- Small business owner</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to hear what people really think?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Sometimes the truth hurts, but it always helps you grow. Give it a try - what's the worst that could happen?
          </p>
          <Link href='/sign-in'>
          <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center mx-auto">
            Start receiving messages
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          </Link>
        </div>
      </section>

      <footer id="contact" className="py-8 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">
            Built by someone who cares about your privacy
          </p>
          <p className="text-gray-500 text-sm">
            Questions? Drop me a line: anonymous123@gmail.com
          </p>
        </div>
      </footer>
    </div>
  );
}