import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import LoginPage from './components/LoginPage';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  if (showLogin) {
    return (
      <LoginPage 
        onBack={() => setShowLogin(false)} 
        onLogin={(userName) => {
          setUser(userName);
          setShowLogin(false);
        }} 
      />
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white text-black select-none">
      
      {/* Background Stationery Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src="/NoteBox_stationery_product_film_4267860a_1080p.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Subtle, non-faded overlay: video stays clear & vibrant */}
        <div className="absolute inset-0 bg-white/25 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6)_0%,transparent_75%)] pointer-events-none" />
      </div>

      {/* Landing Content */}
      <div className="relative z-10 h-full w-full flex flex-col justify-between p-6 sm:p-10 md:p-14 max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-black">NoteBox</span>
            <span className="w-2 h-2 rounded-full bg-purple-600 mb-1" />
          </div>

          <div>
            {user ? (
              <div className="flex items-center gap-3 text-xs sm:text-sm bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-zinc-200/80 shadow-xs">
                <span className="font-semibold text-black">Hi, {user}</span>
                <button onClick={() => setUser(null)} className="text-zinc-600 hover:text-black underline cursor-pointer">
                  Sign out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="text-xs sm:text-sm font-semibold text-zinc-900 hover:text-purple-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-200/80 shadow-xs transition-all cursor-pointer"
              >
                Log in <span className="text-zinc-400 mx-1">/</span> Sign in
              </button>
            )}
          </div>
        </header>

        {/* Center Hero */}
        <main className="text-center max-w-3xl mx-auto my-auto px-4">
          <div className="mb-4 sm:mb-6">
            <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-zinc-900 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-zinc-200">
              Monthly Stationery Delivery
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-black tracking-tight leading-[1.12]">
            The art of writing, <br className="hidden sm:inline" />
            <span className="italic font-normal">delivered to your desk.</span>
          </h1>

          <p className="mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-black max-w-lg mx-auto font-medium leading-relaxed">
            Curated subscription boxes filled with heirloom fountain pens, bleed-proof notebooks, and desk essentials.
          </p>

          <div className="mt-8 sm:mt-10">
            <button
              onClick={() => setShowLogin(true)}
              className="group inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm sm:text-base tracking-wide shadow-xl shadow-purple-600/30 hover:shadow-purple-600/45 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Start Exploring</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </main>

        {/* Minimal Footer */}
        <footer className="text-xs">
          <span className="inline-block text-zinc-800 font-medium bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-zinc-200/80 shadow-xs">
            NoteBox © {new Date().getFullYear()} • Subscription Kits
          </span>
        </footer>

      </div>
    </div>
  );
}
