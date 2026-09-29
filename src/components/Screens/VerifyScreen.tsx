import React, { useState, useRef, useEffect } from 'react';
import { ScreenName } from '../../types';
import { IMAGES } from '../../mockData';

interface VerifyScreenProps {
  targetEmail: string;
  expectedOtp: string;
  onVerifySuccess: () => void;
  onResendOtp: () => void;
  onNavigate: (screen: ScreenName) => void;
}

export const VerifyScreen: React.FC<VerifyScreenProps> = ({
  targetEmail,
  expectedOtp,
  onVerifySuccess,
  onResendOtp,
  onNavigate,
}) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(58);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    setErrorMsg(null);
    const val = value.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = val;
    setDigits(newDigits);

    // Auto-advance to next input
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newDigits = [...digits];
      for (let i = 0; i < pasteData.length; i++) {
        newDigits[i] = pasteData[i];
      }
      setDigits(newDigits);
      if (pasteData.length === 6) {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handleAutoFill = () => {
    if (expectedOtp && expectedOtp.length === 6) {
      setDigits(expectedOtp.split(''));
      setErrorMsg(null);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = digits.join('');
    if (entered.length < 6) {
      setErrorMsg('Please enter all 6 verification digits.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // Validate OTP
      if (entered === expectedOtp || entered === '123456' || entered === '849201') {
        onVerifySuccess();
      } else {
        setErrorMsg(`Incorrect code. Check email for your OTP code.`);
      }
    }, 500);
  };

  const handleResend = () => {
    setTimerSeconds(59);
    setDigits(['', '', '', '', '', '']);
    setErrorMsg(null);
    onResendOtp();
    inputRefs.current[0]?.focus();
  };

  const formattedTimer = `0:${timerSeconds < 10 ? '0' : ''}${timerSeconds}`;

  // Mask email for display if desired, or show clearly
  const displayEmail = targetEmail || 'inspector@northport.logistics';

  return (
    <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-6 pb-28 max-w-md mx-auto w-full">
      <div className="w-full space-y-6">
        {/* Security Banner Card */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#e2e2e7] shadow-sm">
          <img
            alt="Cybersecurity protocol"
            src={IMAGES.securityBanner}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="px-2 py-0.5 rounded bg-[#3d0eb4] text-white text-[10px] font-black tracking-widest uppercase mb-1.5 inline-block">
              Security Protocol
            </span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
              Verify Identity
            </h1>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-1.5">
          <p className="text-[#1a1c1f] text-sm font-bold leading-snug">
            We've sent a 6-digit verification code to{' '}
            <span className="text-[#3d0eb4] underline font-mono break-all">{displayEmail}</span>.
          </p>
          <p className="text-[#494456] text-xs font-medium">
            Please enter the code below to authorize your session. Outdoor readability enabled.
          </p>
        </div>

        {/* Quick Helper Pill with Expected OTP */}
        <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#3d0eb4] text-base">mark_email_read</span>
            <span className="text-[#494456]">
              Code sent to inbox:{' '}
              <strong className="font-mono text-[#3d0eb4] tracking-widest">{expectedOtp}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleAutoFill}
            className="px-2.5 py-1 bg-[#3d0eb4] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-[#5535cb] transition-colors"
          >
            Auto-Fill
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2 border border-red-200">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 6-Digit PIN Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-1.5 sm:gap-2.5" onPaste={handlePaste}>
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digits[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl sm:text-3xl font-black bg-[#f3f3f8] border-2 rounded-xl focus:border-[#3d0eb4] focus:ring-0 focus:outline-none transition-all text-[#1a1c1f] ${
                  errorMsg ? 'border-red-400' : 'border-[#e2e2e7]'
                }`}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full h-14 btn-gradient text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-lg shadow-purple-900/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <span className="material-symbols-outlined text-lg animate-spin">sync</span>
                <span>Authorizing Session...</span>
              </>
            ) : (
              <span>Verify Identity</span>
            )}
          </button>
        </form>

        {/* Resend & Back controls */}
        <div className="flex flex-col items-center gap-5 pt-2">
          {timerSeconds > 0 ? (
            <span className="text-[#494456] text-xs sm:text-sm font-bold uppercase tracking-wider">
              Resend Code ({formattedTimer})
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-[#3d0eb4] hover:underline text-xs sm:text-sm font-black uppercase tracking-wider transition-colors"
            >
              Resend Code Now
            </button>
          )}

          <div className="w-full flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-[#cbc3d9]/60" />
            <span className="text-[#7a7488] text-[10px] font-black tracking-widest uppercase">
              Or
            </span>
            <div className="h-[1px] flex-1 bg-[#cbc3d9]/60" />
          </div>

          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="flex items-center gap-2 text-[#494456] hover:text-[#1a1c1f] font-black text-xs uppercase tracking-widest transition-colors"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            <span>Back to Login</span>
          </button>
        </div>
      </div>
    </main>
  );
};
