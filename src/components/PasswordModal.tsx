import React, { useState } from 'react';
import { Lock, Eye, EyeOff, X } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title: string;
  description: string;
}

export default function PasswordModal({ isOpen, onClose, onSuccess, title, description }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (password === 'Loki1loki') {
        onSuccess();
        setPassword('');
        onClose();
      } else {
        setError('Invalid password');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative max-w-md w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl blur-sm"></div>
        <div className="relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Lock className="w-6 h-6 text-white/80" />
              <h2 className="text-xl font-black text-white">{title}</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-white/40 hover:text-white/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-white/60 text-sm mb-6">{description}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all duration-300 font-mono tracking-wider pr-12"
                placeholder="Enter password..."
                disabled={isLoading}
                autoFocus
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
              <div className="text-red-400 text-sm font-medium animate-pulse">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-white/10 text-white px-4 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!password || isLoading}
                className="flex-1 bg-white text-black px-4 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Confirm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}