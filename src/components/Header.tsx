import React from 'react';
import { ScreenName } from '../types';

interface HeaderProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
  syncCount: number;
  onQuickSync?: () => void;
  isSyncing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  syncCount,
  onQuickSync,
  isSyncing = false,
}) => {
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'profile':
        return 'Customer Profile';
      case 'results':
        return 'ContainerCheck AI';
      case 'login':
        return 'ContainerCheck AI';
      case 'register':
        return 'Inspector Registration';
      case 'verify':
        return 'ContainerCheck AI';
      case 'entry':
        return 'ContainerCheck AI';
      case 'capture':
        return 'ContainerCheck AI';
      case 'history':
        return 'Inspection History';
      case 'sync':
        return 'Sync Manager';
      default:
        return 'ContainerCheck AI';
    }
  };

  const showBackButton =
    currentScreen === 'entry' ||
    currentScreen === 'capture' ||
    currentScreen === 'results' ||
    currentScreen === 'profile' ||
    currentScreen === 'register';

  return (
    <header className="sticky top-0 z-40 bg-[#f9f9fe] border-b border-[#e2e2e7] w-full backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Left Side: Back button or Logo */}
        <div className="flex items-center gap-3">
          {showBackButton ? (
            <button
              onClick={() => {
                if (currentScreen === 'capture') onNavigate('entry');
                else if (currentScreen === 'results') onNavigate('dashboard');
                else if (currentScreen === 'entry') onNavigate('dashboard');
                else if (currentScreen === 'profile') onNavigate('dashboard');
                else onNavigate('dashboard');
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#ededf2] text-[#3d0eb4] transition-colors active:scale-95"
              title="Go Back"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          ) : (
            <div
              onClick={() => onNavigate('dashboard')}
              className="cursor-pointer flex items-center gap-2.5 text-[#3d0eb4] transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                package_2
              </span>
            </div>
          )}

          <h1
            onClick={() => onNavigate('dashboard')}
            className="cursor-pointer font-['Inter'] font-extrabold tracking-tight text-lg sm:text-xl text-[#1a1c1f]"
          >
            {getScreenTitle()}
          </h1>
        </div>

        {/* Right Side: Quick status, theme, sync icon */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status pill for Capture & Entry */}
          {(currentScreen === 'capture' || currentScreen === 'entry') && (
            <div className="hidden sm:flex items-center gap-2 bg-[#f3f3f8] px-3 py-1.5 rounded-full border border-[#e2e2e7]">
              <span className="material-symbols-outlined text-sm text-[#3d0eb4]" style={{ fontVariationSettings: "'FILL' 1" }}>
                sync_saved_locally
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#494456]">
                Local Capture Active
              </span>
            </div>
          )}

          {/* Screen Switcher quick-jump for reviewer convenience */}
          <div className="relative group">
            <select
              value={currentScreen}
              onChange={(e) => onNavigate(e.target.value as ScreenName)}
              className="text-xs font-semibold bg-[#ededf2] text-[#494456] rounded-lg px-2.5 py-1.5 border-none focus:ring-2 focus:ring-[#3d0eb4] cursor-pointer"
              title="Jump to screen"
            >
              <option value="dashboard">Dashboard</option>
              <option value="entry">Inspection Entry</option>
              <option value="capture">Guided Capture</option>
              <option value="results">AI Analysis Results</option>
              <option value="profile">Customer Profile</option>
              <option value="login">Inspector Portal (Login)</option>
              <option value="register">Register Inspector</option>
              <option value="verify">Verify Identity (2FA)</option>
              <option value="history">History</option>
              <option value="sync">Sync</option>
            </select>
          </div>

          {/* Sync Trigger button */}
          <button
            onClick={onQuickSync}
            disabled={isSyncing}
            className="relative p-2 rounded-lg text-[#494456] hover:bg-[#ededf2] hover:text-[#3d0eb4] transition-colors active:scale-95 disabled:opacity-50"
            title={syncCount > 0 ? `${syncCount} items waiting to sync` : 'All items synced'}
            aria-label="Sync"
          >
            <span className={`material-symbols-outlined text-2xl ${isSyncing ? 'animate-spin' : ''}`}>
              sync_saved_locally
            </span>
            {syncCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#f9f9fe]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
