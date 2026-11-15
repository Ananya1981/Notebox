import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage({ onBack, onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email.split('@')[0]);
    }
  };

  return (
    <div className="relative z-20 min-h-screen w-full flex items-center justify-center p-6 bg-white/70 backdrop-blur-md">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-black hover:text-purple-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to NoteBox
      </button>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-zinc-100 text-center">
        
        {/* Brand */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-black">NoteBox</h2>
          <span className="w-2 h-2 rounded-full bg-purple-600" />
        </div>
        <p className="text-xs text-zinc-500 mb-6">
          {isSignUp ? 'Create an account to subscribe' : 'Sign in to access your monthly kits'}
        </p>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-full mb-6 text-xs font-medium">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`py-2 rounded-full transition-all ${!isSignUp ? 'bg-white text-black font-semibold shadow-sm' : 'text-zinc-500'}`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`py-2 rounded-full transition-all ${isSignUp ? 'bg-white text-black font-semibold shadow-sm' : 'text-zinc-500'}`}
          >
            Sign in
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-purple-600 text-black"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-purple-600 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition-all shadow-md shadow-purple-600/20 active:scale-95"
          >
            {isSignUp ? 'Create Account' : 'Log In'}
          </button>
        </form>

      </div>
    </div>
  );
}
