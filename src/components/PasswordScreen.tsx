import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordScreenProps {
  onAuthenticate: () => void;
}

export default function PasswordScreen({ onAuthenticate }: PasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple password check - in production, this would be more secure
    setTimeout(() => {
      if (password === 'Loki1loki') {
        onAuthenticate();
      } else {
        setError('Invalid password');
        setPassword('');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Crystalline grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 40%, white 40%, white 60%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, white 40%, white 60%, transparent 60%)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-8">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-white tracking-wider mb-8">
            LEAKED
          </h1>
          <p className="text-white/60 text-sm font-medium tracking-wide">
            ENTER ACCESS CODE
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-lg blur-sm"></div>
            <div className="relative bg-black/50 backdrop-blur-xl border border-white/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="w-5 h-5 text-white/60" />
                <span className="text-white/80 text-sm font-medium tracking-wide">MASTER PASSWORD</span>
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 font-mono tracking-wider"
                  placeholder="••••••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <div className="mt-3 text-red-400 text-sm font-medium tracking-wide animate-pulse">
                  {error}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!password || isLoading}
            className="w-full relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-300 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative bg-white text-black font-black py-4 px-6 rounded-lg tracking-wider text-sm hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  <span>AUTHENTICATING...</span>
                </div>
              ) : (
                'ACCESS DASHBOARD'
              )}
            </div>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs tracking-wide">
            LEAKED BRAND MANAGEMENT SYSTEM v2.0
          </p>
        </div>
      </div>
    </div>
  );
}