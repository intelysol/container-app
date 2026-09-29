import React, { useState } from 'react';
import { ScreenName, UserProfile } from '../../types';

interface RegisterScreenProps {
  onRegisterSubmit: (profile: UserProfile, otp: string) => void;
  onNavigate: (screen: ScreenName) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegisterSubmit,
  onNavigate,
}) => {
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('inspector@northport.logistics');
  const [terminal, setTerminal] = useState('Port of Long Beach, CA');
  const [inspectorId, setInspectorId] = useState('8821');
  const [accessKey, setAccessKey] = useState('InspectorPass2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [offlineCache, setOfflineCache] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;

    setIsSubmitting(true);
    // Generate 6-digit OTP code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    setTimeout(() => {
      setIsSubmitting(false);
      const newProfile: UserProfile = {
        name: fullName,
        email: email,
        inspectorId: inspectorId || `ID-${Math.floor(1000 + Math.random() * 9000)}`,
        terminal: terminal,
        role: 'Certified Cargo Inspector',
        active: true,
      };
      onRegisterSubmit(newProfile, generatedOtp);
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
          <span className="text-[#3d0eb4] font-black tracking-widest text-xs uppercase mb-2 block">
            Accreditation Portal
          </span>
          <h2 className="text-3xl font-black text-[#1a1c1f] tracking-tight mb-4">
            Enroll New Field Inspector
          </h2>
          <p className="text-[#494456] text-base font-medium leading-relaxed mb-8">
            Create an authorized operator credential to perform ISO 17712 cargo audits, edge tensor damage localization, and automated CSC seal verification.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e2e2e7]">
              <span className="text-2xl font-black text-[#3d0eb4] block mb-1">ISO 17712</span>
              <span className="text-xs uppercase tracking-widest text-[#7a7488] font-bold">
                Security Standard
              </span>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-xs border border-[#e2e2e7]">
              <span className="text-2xl font-black text-[#3d0eb4] block mb-1">CTPAT</span>
              <span className="text-xs uppercase tracking-widest text-[#7a7488] font-bold">
                Customs Validated
              </span>
            </div>
          </div>
        </div>

        {/* Decorative Industrial Pattern */}
        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-25 dot-pattern" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#3d0eb4] opacity-5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Register Form Side */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 py-10">
        {/* Mobile Brand Header */}
        <div className="md:hidden mb-6 flex flex-col items-center">
          <span
            className="material-symbols-outlined text-[#3d0eb4] text-5xl mb-1"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            package_2
          </span>
          <h1 className="text-xl font-black tracking-tighter text-[#1a1c1f]">ContainerCheck AI</h1>
        </div>

        <div className="w-full max-w-md">
          <header className="mb-6 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1a1c1f] mb-1.5">
              Register Inspector
            </h2>
            <p className="text-[#494456] text-xs sm:text-sm">
              Enroll your credentials. A secure 6-digit OTP will be dispatched to your email.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="relative group">
              <input
                id="reg-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder=" "
                className="peer w-full bg-[#e2e2e7]/60 border-none border-b-2 border-[#7a7488] px-4 py-3.5 pt-5 rounded-t-xl focus:ring-0 focus:border-[#3d0eb4] transition-all text-[#1a1c1f] font-semibold text-sm"
                required
              />
              <label
                htmlFor="reg-name"
                className="absolute left-4 top-3 text-[#494456] text-xs pointer-events-none transition-all duration-200 peer-focus:-translate-y-2 peer-focus:text-[#3d0eb4] peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px] uppercase font-bold tracking-wider"
              >
                Full Name
              </label>
            </div>

            {/* Email Field */}
            <div className="relative group">
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="peer w-full bg-[#e2e2e7]/60 border-none border-b-2 border-[#7a7488] px-4 py-3.5 pt-5 rounded-t-xl focus:ring-0 focus:border-[#3d0eb4] transition-all text-[#1a1c1f] font-semibold text-sm"
                required
              />
              <label
                htmlFor="reg-email"
                className="absolute left-4 top-3 text-[#494456] text-xs pointer-events-none transition-all duration-200 peer-focus:-translate-y-2 peer-focus:text-[#3d0eb4] peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px] uppercase font-bold tracking-wider"
              >
                Work Email (OTP Target)
              </label>
            </div>

            {/* Terminal Location & Inspector ID Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group">
                <input
                  id="reg-terminal"
                  type="text"
                  value={terminal}
                  onChange={(e) => setTerminal(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-[#e2e2e7]/60 border-none border-b-2 border-[#7a7488] px-4 py-3.5 pt-5 rounded-t-xl focus:ring-0 focus:border-[#3d0eb4] transition-all text-[#1a1c1f] font-semibold text-xs sm:text-sm"
                  required
                />
                <label
                  htmlFor="reg-terminal"
                  className="absolute left-4 top-3 text-[#494456] text-xs pointer-events-none transition-all duration-200 peer-focus:-translate-y-2 peer-focus:text-[#3d0eb4] peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px] uppercase font-bold tracking-wider"
                >
                  Port / Yard
                </label>
              </div>

              <div className="relative group">
                <input
                  id="reg-id"
                  type="text"
                  value={inspectorId}
                  onChange={(e) => setInspectorId(e.target.value)}
                  placeholder=" "
                  className="peer w-full bg-[#e2e2e7]/60 border-none border-b-2 border-[#7a7488] px-4 py-3.5 pt-5 rounded-t-xl focus:ring-0 focus:border-[#3d0eb4] transition-all text-[#1a1c1f] font-mono font-bold text-xs sm:text-sm"
                  required
                />
                <label
                  htmlFor="reg-id"
                  className="absolute left-4 top-3 text-[#494456] text-xs pointer-events-none transition-all duration-200 peer-focus:-translate-y-2 peer-focus:text-[#3d0eb4] peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px] uppercase font-bold tracking-wider"
                >
                  Inspector Badge ID
                </label>
              </div>
            </div>

            {/* Access Key Field */}
            <div className="relative group">
              <input
                id="reg-key"
                type={showPassword ? 'text' : 'password'}
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder=" "
                className="peer w-full bg-[#e2e2e7]/60 border-none border-b-2 border-[#7a7488] px-4 py-3.5 pt-5 rounded-t-xl focus:ring-0 focus:border-[#3d0eb4] transition-all text-[#1a1c1f] font-semibold text-sm pr-12"
                required
              />
              <label
                htmlFor="reg-key"
                className="absolute left-4 top-3 text-[#494456] text-xs pointer-events-none transition-all duration-200 peer-focus:-translate-y-2 peer-focus:text-[#3d0eb4] peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px] uppercase font-bold tracking-wider"
              >
                Access Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-[#494456] hover:text-[#3d0eb4] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {/* Offline Cache Option */}
            <div className="bg-[#f3f3f8] p-3 rounded-xl flex items-center justify-between border border-[#e2e2e7]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#3d0eb4] text-lg">cloud_sync</span>
                <div>
                  <p className="text-xs font-bold text-[#1a1c1f]">Enable Offline Terminal Cache</p>
                  <p className="text-[10px] text-[#494456]">Permits offline captures at low-signal quaysides</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={offlineCache}
                  onChange={() => setOfflineCache(!offlineCache)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#e2e2e7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3d0eb4]" />
              </label>
            </div>

            {/* ISO compliance checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#494456] pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="mt-0.5 rounded border-[#7a7488] text-[#3d0eb4] focus:ring-[#3d0eb4]"
                required
              />
              <span>
                I agree to the terminal operating charter and acknowledge ISO 17712 security audit standards.
              </span>
            </label>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting || !agreeTerms}
              className="w-full btn-gradient text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-900/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 group text-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                  <span>Generating OTP & Registering...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Send Email OTP</span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                    mail
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-6 text-center">
            <p className="text-xs text-[#494456]">
              Already an authorized inspector?{' '}
              <button
                type="button"
                onClick={() => onNavigate('login')}
                className="font-bold text-[#3d0eb4] hover:underline"
              >
                Sign in to Inspector Portal
              </button>
            </p>
          </div>

          <footer className="mt-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-[1px] w-10 bg-[#cbc3d9]/40" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7a7488]">
                Terminal Status
              </span>
              <span className="h-[1px] w-10 bg-[#cbc3d9]/40" />
            </div>

            <div className="flex justify-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ededf2] border border-[#e2e2e7]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-[#494456] uppercase">
                  Network Ready
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ededf2] border border-[#e2e2e7]">
                <span className="material-symbols-outlined text-[13px] text-[#3d0eb4]">
                  sync_saved_locally
                </span>
                <span className="text-[10px] font-bold text-[#494456] uppercase">
                  v4.2.1-stable
                </span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};
