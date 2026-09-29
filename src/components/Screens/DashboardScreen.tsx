import React from 'react';
import { QueueItem, ScreenName } from '../../types';

interface DashboardScreenProps {
  queue: QueueItem[];
  onNavigate: (screen: ScreenName) => void;
  onSyncItem: (id: string) => void;
  onResolveItem: (item: QueueItem) => void;
  reportsCount: number;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  queue,
  onNavigate,
  onSyncItem,
  onResolveItem,
  reportsCount,
}) => {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-28">
      {/* Hero Stats Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Main Signal */}
        <div className="md:col-span-2 bg-[#f3f3f8] rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[#e2e2e7]/40 shadow-sm">
          <div>
            <span className="text-[#494456] font-semibold text-xs tracking-wider uppercase mb-2 block">
              System Status
            </span>
            <h2 className="text-[#1a1c1f] font-black text-3xl sm:text-4xl tracking-tight mb-4">
              Precision Ready.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mt-4">
            <div className="space-y-1">
              <p className="text-[#494456] text-[11px] font-bold uppercase tracking-widest">
                Network Mode
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3d0eb4] shadow-[0_0_8px_rgba(61,14,180,0.6)] animate-pulse" />
                <span className="font-bold text-base sm:text-lg text-[#3d0eb4]">
                  Local-First (Active)
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('entry')}
              className="btn-gradient text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-purple-950/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">add_a_photo</span>
              <span>New Inspection</span>
            </button>
          </div>
        </div>

        {/* Side Metric Card */}
        <div className="bg-white border border-[#cbc3d9]/30 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-center items-center text-center">
          <p className="text-[#494456] text-xs font-bold uppercase tracking-widest mb-1">
            Reports Today
          </p>
          <p className="text-[#1a1c1f] text-5xl sm:text-6xl font-black tracking-tighter">
            {reportsCount}
          </p>
          <div className="mt-3 flex items-center gap-1 text-[#006d44] font-bold text-xs sm:text-sm">
            <span className="material-symbols-outlined text-base">trending_up</span>
            <span>12% High Vol.</span>
          </div>
        </div>
      </section>

      {/* Asymmetric Section: Active Queue */}
      <section className="mb-10">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-[#1a1c1f] font-black text-xl sm:text-2xl tracking-tight">
            Active Queue
          </h3>
          <span className="text-[#494456] text-xs sm:text-sm font-medium">
            {queue.filter((q) => q.status !== 'synced').length} Items Pending Sync
          </span>
        </div>

        <div className="space-y-3.5">
          {queue.map((item) => {
            const isWarning = item.status === 'validation_required';
            const isSynced = item.status === 'synced';

            return (
              <div
                key={item.id}
                className="group bg-[#f3f3f8] rounded-2xl p-1 transition-all hover:bg-[#e8e8ed]"
              >
                <div
                  className={`bg-white rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border transition-all ${
                    isWarning ? 'border-l-4 border-l-red-600 border-[#e2e2e7]' : 'border-[#e2e2e7]'
                  }`}
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-16 h-16 rounded-xl bg-[#e8e8ed] overflow-hidden shrink-0 relative">
                      <img
                        alt={item.code}
                        src={item.imageUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {isWarning && (
                        <div className="absolute inset-0 bg-red-900/30 flex items-center justify-center">
                          <span className="material-symbols-outlined text-red-500 text-2xl">report</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {isWarning ? (
                          <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Validation Required
                          </span>
                        ) : isSynced ? (
                          <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Synced
                          </span>
                        ) : (
                          <span className="bg-[#e2e2e7] text-[#1a1c1f] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Draft
                          </span>
                        )}
                        <h4 className="font-bold text-[#1a1c1f] text-sm sm:text-base font-mono">
                          {item.code}
                        </h4>
                      </div>
                      <p className={`text-xs ${isWarning ? 'text-red-600 font-semibold' : 'text-[#494456]'}`}>
                        {isWarning ? item.warningNote : `Captured: ${item.capturedTime} • ${item.location}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[#e2e2e7]">
                    <div className="text-left md:text-right">
                      <p className="text-[#494456] text-[10px] font-bold uppercase tracking-widest mb-0.5">
                        Data Weight
                      </p>
                      <p className="text-[#1a1c1f] font-mono text-xs sm:text-sm font-semibold">
                        {item.dataWeight}
                      </p>
                    </div>

                    {isWarning ? (
                      <button
                        onClick={() => onResolveItem(item)}
                        className="bg-[#e8e8ed] hover:bg-[#e2e2e7] text-[#1a1c1f] px-5 py-2.5 rounded-xl font-bold text-xs transition-colors active:scale-95 uppercase tracking-wider"
                      >
                        Resolve
                      </button>
                    ) : (
                      <button
                        onClick={() => onSyncItem(item.id)}
                        disabled={isSynced}
                        className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all active:scale-95 ${
                          isSynced
                            ? 'bg-emerald-100 text-emerald-800 cursor-default'
                            : 'bg-[#3d0eb4] hover:bg-[#5535cb] text-white shadow-sm'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isSynced ? 'cloud_done' : 'cloud_upload'}
                        </span>
                        <span>{isSynced ? 'SYNCED' : 'SYNC NOW'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Secondary Utility Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#f3f3f8] rounded-2xl p-5 sm:p-6 border border-[#e2e2e7]/40">
          <h4 className="font-bold text-xs uppercase tracking-widest text-[#494456] mb-3">
            Inspection Guide
          </h4>
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-purple-100 rounded-xl text-[#3d0eb4] shrink-0">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <div>
              <p className="text-[#1a1c1f] font-bold text-sm">Industrial Standard ISO 6346</p>
              <p className="text-[#494456] text-xs mt-1 leading-relaxed">
                Ensure all 4 corner castings are clearly visible in draft captures before attempting cloud sync.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#f3f3f8] rounded-2xl p-5 sm:p-6 border border-[#e2e2e7]/40">
          <h4 className="font-bold text-xs uppercase tracking-widest text-[#494456] mb-3">
            Storage Metrics
          </h4>
          <div className="w-full bg-[#e2e2e7] h-2.5 rounded-full mb-3 overflow-hidden">
            <div className="bg-[#3d0eb4] w-3/4 h-full rounded-full" />
          </div>
          <div className="flex justify-between text-[11px] font-bold text-[#494456] uppercase tracking-tight">
            <span>Local: 2.4 GB</span>
            <span>Total: 4.0 GB Limit</span>
          </div>
        </div>
      </section>
    </main>
  );
};
