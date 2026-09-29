import React, { useState } from 'react';
import { ScreenName, UserProfile } from '../../types';
import { IMAGES } from '../../mockData';

interface ProfileScreenProps {
  user: UserProfile;
  credits: {
    [key: string]: { remaining: number; total: number; label: string; icon: string; color: string };
  };
  onOpenPurchaseModal: () => void;
  onNavigate: (screen: ScreenName) => void;
  onLogOut: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  credits,
  onOpenPurchaseModal,
  onNavigate,
  onLogOut,
}) => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-4 pb-28 space-y-8">
      {/* User Profile Info */}
      <section className="flex flex-col items-center text-center space-y-3 pt-2">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-2 border-[#3d0eb4] p-1 bg-white shadow-md">
            <img
              alt={user.name}
              src={user.avatarUrl || IMAGES.avatar}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-[#006d44] text-white px-2 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow">
            Active
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1a1c1f]">
            {user.name}
          </h2>
          <p className="text-xs text-[#494456] font-medium">{user.email}</p>
          <div className="flex items-center justify-center gap-2 text-[#494456] text-xs sm:text-sm mt-1.5 flex-wrap">
            <span className="font-mono bg-[#e2e2e7]/80 px-2 py-0.5 rounded border border-[#cbc3d9]/60 font-bold">
              ID: {user.inspectorId}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#7a7488]" />
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#3d0eb4]">location_on</span>
              {user.terminal}
            </span>
          </div>
        </div>
      </section>

      {/* Processing Credits Dashboard */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#1a1c1f]">
            Processing Credits
          </h3>
          <button
            onClick={() => setShowHistoryModal(true)}
            className="text-[#3d0eb4] text-xs sm:text-sm font-semibold flex items-center gap-1 hover:underline"
          >
            <span>View History</span>
            <span className="material-symbols-outlined text-[16px]">history</span>
          </button>
        </div>

        {/* Bento Grid of Container Credits */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {Object.entries(credits).map(([key, item]) => {
            const percentage = Math.round((item.remaining / item.total) * 100);
            return (
              <div
                key={key}
                className="bg-[#f3f3f8] border border-[#e2e2e7] rounded-2xl p-4 sm:p-5 flex flex-col justify-between aspect-square shadow-xs hover:border-[#cbc3d9] transition-all"
              >
                <div className="flex justify-between items-start">
                  <span className="material-symbols-outlined text-[#3d0eb4] text-xl">
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-black text-[#494456] uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>

                <div className="my-2">
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#1a1c1f]">
                    {item.remaining}
                  </div>
                  <div className="text-[11px] text-[#494456] font-medium mt-0.5">
                    Credits Remaining
                  </div>
                </div>

                <div className="w-full bg-[#e2e2e7] h-1.5 rounded-full overflow-hidden">
                  <div
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: item.color,
                    }}
                    className="h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Up Button */}
        <button
          onClick={onOpenPurchaseModal}
          className="w-full btn-gradient text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-md shadow-purple-900/20 text-sm"
        >
          <span className="material-symbols-outlined">add_shopping_cart</span>
          <span>Purchase More Credits</span>
        </button>
      </section>

      {/* Account Settings */}
      <section className="space-y-3">
        <h3 className="text-xs font-bold tracking-widest text-[#494456] uppercase px-1">
          Account Settings
        </h3>

        <div className="bg-white border border-[#e2e2e7] rounded-2xl overflow-hidden shadow-xs divide-y divide-[#e2e2e7]">
          {/* Notification Preferences */}
          <div className="flex items-center justify-between p-4 hover:bg-[#f3f3f8] transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#494456]">notifications</span>
              <span className="text-[#1a1c1f] font-semibold text-sm">Notification Preferences</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-[#e2e2e7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3d0eb4]" />
            </label>
          </div>

          {/* Security */}
          <div
            onClick={() => onNavigate('verify')}
            className="flex items-center justify-between p-4 hover:bg-[#f3f3f8] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#494456]">security</span>
              <div>
                <p className="text-[#1a1c1f] font-semibold text-sm">Security & 2FA Protocols</p>
                <p className="text-[11px] text-[#494456]">Hardware key / biometric verification</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#7a7488] text-xl">chevron_right</span>
          </div>

          {/* Log Out */}
          <button
            onClick={onLogOut}
            className="w-full flex items-center justify-between p-4 hover:bg-red-50 text-red-600 transition-colors text-left font-bold text-sm"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">logout</span>
              <span>Log Out</span>
            </div>
            <span className="text-xs text-red-500 font-normal">Terminal session ends</span>
          </button>
        </div>
      </section>

      {/* Credit History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e2e2e7] text-[#1a1c1f]">
            <div className="flex items-center justify-between mb-4 border-b border-[#e2e2e7] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#3d0eb4]">history</span>
                <h3 className="font-bold text-base">Credit Usage Ledger</h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="w-8 h-8 rounded-full bg-[#f3f3f8] flex items-center justify-center text-[#494456]"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {[
                { time: 'Today 14:35', desc: "ISO 17712 Inspection CNTR-992-X (40' HC)", change: '-1 credit' },
                { time: 'Today 11:20', desc: "ISO 17712 Inspection MSKU-7719-2 (20')", change: '-1 credit' },
                { time: 'Yesterday 16:45', desc: "ISO 17712 Inspection CMAU-4401-9 (40')", change: '-1 credit' },
                { time: 'Sep 25 09:12', desc: 'Prepaid Terminal Pack Purchase (+50)', change: '+50 credits' },
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-start text-xs p-2.5 bg-[#f3f3f8] rounded-xl">
                  <div>
                    <p className="font-semibold text-[#1a1c1f]">{log.desc}</p>
                    <p className="text-[#494456] text-[10px] mt-0.5">{log.time}</p>
                  </div>
                  <span
                    className={`font-mono font-bold shrink-0 ${
                      log.change.startsWith('+') ? 'text-emerald-700' : 'text-[#3d0eb4]'
                    }`}
                  >
                    {log.change}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowHistoryModal(false)}
              className="mt-5 w-full py-2.5 bg-[#ededf2] text-[#1a1c1f] font-bold rounded-xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
