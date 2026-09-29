import React, { useEffect } from 'react';

interface OtpEmailToastProps {
  email: string;
  otp: string;
  type: 'login' | 'registration' | 'resend';
  onClose: () => void;
  onAutoFill?: () => void;
}

export const OtpEmailToast: React.FC<OtpEmailToastProps> = ({
  email,
  otp,
  type,
  onClose,
  onAutoFill,
}) => {
  useEffect(() => {
    // Auto-dismiss toast after 10 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(otp);
  };

  const getTitle = () => {
    if (type === 'registration') return 'Inspector Registration OTP Dispatched';
    if (type === 'resend') return 'Fresh Security OTP Dispatched';
    return 'Terminal Login OTP Dispatched';
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      <div className="bg-[#18181b] text-white rounded-2xl p-4 shadow-2xl border-2 border-purple-500/40 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3d0eb4] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md">
              <span className="material-symbols-outlined text-xl">mark_email_read</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 bg-purple-950 px-2 py-0.5 rounded">
                  Email Dispatch Service
                </span>
                <span className="text-[11px] text-zinc-400">Just now</span>
              </div>
              <h4 className="font-bold text-sm text-zinc-100 mt-1">{getTitle()}</h4>
              <p className="text-xs text-zinc-300 mt-0.5">
                Sent to <strong className="text-white underline">{email}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between bg-black/40 rounded-xl p-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Your 6-Digit Code:</span>
            <span className="font-mono text-lg font-black tracking-widest text-purple-400 bg-purple-950/80 px-2.5 py-0.5 rounded-lg border border-purple-800">
              {otp}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
              title="Copy OTP to clipboard"
            >
              Copy
            </button>
            {onAutoFill && (
              <button
                onClick={onAutoFill}
                className="px-2.5 py-1 rounded-lg bg-[#3d0eb4] hover:bg-[#5535cb] text-xs font-bold text-white transition-colors"
              >
                Apply
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
