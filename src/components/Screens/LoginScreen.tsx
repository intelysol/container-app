import React, { useState } from 'react';
import { ScreenName } from '../../types';

interface LoginScreenProps {
  onLoginSubmit: (email: string, otp: string) => void;
  onNavigate: (screen: ScreenName) => void;
  initialEmail?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSubmit,
  onNavigate,
  initialEmail = 'inspector@northport.logistics',
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [accessKey, setAccessKey] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsAuthorizing(true);
    // Generate secure 6-digit OTP code for login
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    setTimeout(() => {
      setIsAuthorizing(false);
      onLoginSubmit(email.trim(), generatedOtp);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f9f9fe] text-[#1a1c1f]">
      {/* Hero/Branding Side (Industrial Context on md screens) */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-[#f3f3f8] relative overflow-hidden flex-col justify-between p-12 border-r border-[#e2e2e7]">
        <div className="z-10">
          <div
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[#3d0eb4] text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              package_2
            </span>
            <h1 className="text-2xl font-black tracking-tighter text-[#1a1c1f]">ContainerCheck AI</h1>
          </div>
        </div>

        <div className="z-10 max-w-lg">
          <p className="text-[#494456] text-lg font-medium leading-relaxed mb-8">
            Professional industrial logistics verification powered by edge intelligence. Optimized for
            high-glare environments and low-connectivity port operations.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e2e7]">
              <span className="text-3xl font-black text-[#3d0eb4] block mb-1">99.8%</span>
              <span className="text-xs uppercase tracking-widest text-[#7a7488] font-bold">
                Accuracy Rate
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e2e2e7]">
              <span className="text-3xl font-black text-[#3d0eb4] block mb-1">&lt;200ms</span>
              <span className="text-xs uppercase tracking-widest text-[#7a7488] font-bold">
                Edge Latency
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Industrial Pattern */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-25 dot-pattern" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#3d0eb4] opacity-5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Login Form Side */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        {/* Mobile Brand Header */}
        <div className="md:hidden mb-8 flex flex-col items-center">
          <span
            className="material-symbols-outlined text-[#3d0eb4] text-5xl mb-2"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            package_2
          </span>
          <h1 className="text-xl font-black tracking-tighter text-[#1a1c1f]">ContainerCheck AI</h1>
        </div>

        <div className="w-full max-w-md">
          <header className="mb-8 text-center md:text-left">
            <div className="inline-block px-2.5 py-1 bg-purple-100 text-[#3d0eb4] rounded-lg text-[10px] font-black uppercase tracking-wider mb-2">
              Authentication Portal
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1a1c1f] mb-2">
              Inspector Portal
            </h2>
            <p className="text-[#494456] text-sm">
              Enter your credentials to authorize terminal. A 6-digit OTP will be dispatched to your email address.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative group">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="peer w-full bg-[#e2e2e7]/60 border-none border-b-2 border-[#7a7488] px-4 py-4 pt-6 rounded-t-xl focus:ring-0 focus:border-[#3d0eb4] transition-all text-[#1a1c1f] font-semibold text-sm sm:text-base"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-4 text-[#494456] text-xs pointer-events-none transition-all duration-200 peer-focus:-translate-y-2 peer-focus:text-[#3d0eb4] peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px] uppercase font-bold tracking-wider"
              >
                Inspector Email
              </label>
            </div>

            {/* Access Key Field */}
            <div className="relative group">
              <input
                id="key"
                type={showPassword ? 'text' : 'password'}
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder=" "
                className="peer w-full bg-[#e2e2e7]/60 border-none border-b-2 border-[#7a7488] px-4 py-4 pt-6 rounded-t-xl focus:ring-0 focus:border-[#3d0eb4] transition-all text-[#1a1c1f] font-semibold text-sm sm:text-base pr-12"
                required
              />
              <label
                htmlFor="key"
                className="absolute left-4 top-4 text-[#494456] text-xs pointer-events-none transition-all duration-200 peer-focus:-translate-y-2 peer-focus:text-[#3d0eb4] peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px] uppercase font-bold tracking-wider"
              >
                Access Key
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-5 text-[#494456] hover:text-[#3d0eb4] transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {/* Offline Mode Toggle */}
            <div className="bg-[#f3f3f8] p-4 rounded-2xl flex items-center justify-between border border-[#e2e2e7]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#494456] shadow-xs">
                  <span className="material-symbols-outlined text-xl">cloud_off</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1a1c1f]">Offline Mode</p>
                  <p className="text-[11px] text-[#494456] uppercase tracking-wider font-semibold">
                    Local cache enabled
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={offlineMode}
                  onChange={() => setOfflineMode(!offlineMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#e2e2e7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3d0eb4]" />
              </label>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={isAuthorizing}
              className="w-full btn-gradient text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-900/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 group text-sm sm:text-base disabled:opacity-50"
            >
              {isAuthorizing ? (
                <>
                  <span className="material-symbols-outlined text-xl animate-spin">sync</span>
                  <span>Sending OTP to Email...</span>
                </>
              ) : (
                <>
                  <span>Authorize Terminal & Send OTP</span>
                  <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                    mail
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Switch to Register */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#494456]">
              New field inspector?{' '}
              <button
                type="button"
                onClick={() => onNavigate('register')}
                className="font-bold text-[#3d0eb4] hover:underline"
              >
                Register Terminal Account
              </button>
            </p>
          </div>

          <footer className="mt-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-[1px] w-12 bg-[#cbc3d9]/40" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7a7488]">
                Terminal Status
              </span>
              <span className="h-[1px] w-12 bg-[#cbc3d9]/40" />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ededf2] border border-[#e2e2e7]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-[#494456] uppercase tracking-wide">
                  Network Ready
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ededf2] border border-[#e2e2e7]">
                <span className="material-symbols-outlined text-[15px] text-[#3d0eb4]">
                  sync_saved_locally
                </span>
                <span className="text-[11px] font-bold text-[#494456] uppercase tracking-wide">
                  v4.2.1-stable
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowAccessModal(true)}
                className="text-xs font-semibold text-[#3d0eb4] hover:underline decoration-2 underline-offset-4 transition-all"
              >
                Request Technical Access
              </button>
            </div>
          </footer>
        </div>
      </main>

      {/* Technical Access Modal */}
      {showAccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#e2e2e7] text-[#1a1c1f]">
            <h3 className="font-bold text-base mb-2">Technical Terminal Access</h3>
            <p className="text-xs text-[#494456] mb-4">
              For field operators requiring biometric keys, contact Terminal Security Dispatch at Port of Long Beach or use the pre-authorized demo inspector credentials.
            </p>
            <div className="bg-[#f3f3f8] p-3 rounded-xl font-mono text-xs text-[#1a1c1f] mb-4 space-y-1">
              <p>Email: inspector@northport.logistics</p>
              <p>Terminal: LB-GATE-4</p>
              <p>Firmware: EdgeAI-v4.2.1</p>
            </div>
            <button
              onClick={() => {
                setShowAccessModal(false);
                handleSubmit(new Event('submit') as unknown as React.FormEvent);
              }}
              className="w-full py-2.5 bg-[#3d0eb4] text-white font-bold rounded-xl text-xs"
            >
              Dispatch Demo OTP & Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
