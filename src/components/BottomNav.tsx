import React from 'react';
import { ScreenName } from '../types';

interface BottomNavProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  pendingSyncCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  pendingSyncCount,
}) => {
  // If in login, register, or verify screen, do not show bottom navigation bar
  if (currentScreen === 'login' || currentScreen === 'register' || currentScreen === 'verify') {
    return null;
  }

  const isInspectActive =
    currentScreen === 'dashboard' ||
    currentScreen === 'entry' ||
    currentScreen === 'capture' ||
    currentScreen === 'results';

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-2.5 pb-6 bg-[#f9f9fe]/95 backdrop-blur-xl border-t border-[#cbc3d9]/30 shadow-[0_-4px_24px_-4px_rgba(26,28,31,0.08)]">
      {/* Inspect */}
      <button
        onClick={() => onNavigate('dashboard')}
        className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-90 ${
          isInspectActive
            ? 'bg-[#3d0eb4] text-white rounded-xl px-4 py-1.5 shadow-md shadow-[#3d0eb4]/20'
            : 'text-[#494456] hover:bg-[#f3f3f8] rounded-xl px-4 py-1.5'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={isInspectActive ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          dock
        </span>
        <span className="font-['Inter'] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mt-0.5">
          Inspect
        </span>
      </button>

      {/* History */}
      <button
        onClick={() => onNavigate('history')}
        className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-90 ${
          currentScreen === 'history'
            ? 'bg-[#3d0eb4] text-white rounded-xl px-4 py-1.5 shadow-md shadow-[#3d0eb4]/20'
            : 'text-[#494456] hover:bg-[#f3f3f8] rounded-xl px-4 py-1.5'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={currentScreen === 'history' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          history
        </span>
        <span className="font-['Inter'] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mt-0.5">
          History
        </span>
      </button>

      {/* Sync */}
      <button
        onClick={() => onNavigate('sync')}
        className={`relative flex flex-col items-center justify-center transition-all duration-150 active:scale-90 ${
          currentScreen === 'sync'
            ? 'bg-[#3d0eb4] text-white rounded-xl px-4 py-1.5 shadow-md shadow-[#3d0eb4]/20'
            : 'text-[#494456] hover:bg-[#f3f3f8] rounded-xl px-4 py-1.5'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={currentScreen === 'sync' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          cloud_sync
        </span>
        <span className="font-['Inter'] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mt-0.5">
          Sync
        </span>
        {pendingSyncCount > 0 && currentScreen !== 'sync' && (
          <span className="absolute top-1 right-3 w-2 h-2 bg-red-600 rounded-full" />
        )}
      </button>

      {/* Profile */}
      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-90 ${
          currentScreen === 'profile'
            ? 'bg-[#3d0eb4] text-white rounded-xl px-4 py-1.5 shadow-md shadow-[#3d0eb4]/20'
            : 'text-[#494456] hover:bg-[#f3f3f8] rounded-xl px-4 py-1.5'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={currentScreen === 'profile' ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          person
        </span>
        <span className="font-['Inter'] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mt-0.5">
          Profile
        </span>
      </button>
    </nav>
  );
};
