import React, { useState } from 'react';
import { QueueItem, ScreenName } from '../../types';

interface SyncScreenProps {
  queue: QueueItem[];
  onSyncAll: () => void;
  onSyncItem: (id: string) => void;
  onNavigate: (screen: ScreenName) => void;
  isSyncing: boolean;
}

export const SyncScreen: React.FC<SyncScreenProps> = ({
  queue,
  onSyncAll,
  onSyncItem,
  onNavigate,
  isSyncing,
}) => {
  const [autoSync, setAutoSync] = useState(true);
  const pendingItems = queue.filter((q) => q.status !== 'synced');
  const syncedItems = queue.filter((q) => q.status === 'synced');

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-28 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#1a1c1f]">
            Sync & Cache Manager
          </h2>
          <p className="text-xs text-[#494456]">
            Local-first high availability engine with deferred background synchronization
          </p>
        </div>

        <button
          onClick={onSyncAll}
          disabled={isSyncing || pendingItems.length === 0}
          className={`btn-gradient text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 self-start active:scale-95 shadow-md shadow-purple-900/20 disabled:opacity-50`}
        >
          <span className={`material-symbols-outlined text-base ${isSyncing ? 'animate-spin' : ''}`}>
            {isSyncing ? 'sync' : 'cloud_upload'}
          </span>
          <span>{isSyncing ? 'Syncing Queue...' : `Sync All (${pendingItems.length} Pending)`}</span>
        </button>
      </div>

      {/* Connectivity & Telemetry Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e2e2e7] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-[#494456] uppercase tracking-wider">
              Network Protocol
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="font-bold text-sm text-[#1a1c1f]">Harbor 5G Edge</p>
            </div>
            <p className="text-[11px] text-[#7a7488] mt-0.5 font-mono">18ms round-trip latency</p>
          </div>
          <span className="material-symbols-outlined text-3xl text-emerald-600">wifi</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e2e7] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-[#494456] uppercase tracking-wider">
              Local Storage Allocation
            </p>
            <p className="font-bold text-sm text-[#1a1c1f] mt-1">2.4 GB / 4.0 GB Limit</p>
            <p className="text-[11px] text-[#7a7488] mt-0.5">60% edge capacity used</p>
          </div>
          <span className="material-symbols-outlined text-3xl text-[#3d0eb4]">database</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e2e2e7] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-[#494456] uppercase tracking-wider">
              Auto Cloud Dispatch
            </p>
            <p className="font-bold text-sm text-[#1a1c1f] mt-1">
              {autoSync ? 'Enabled (Wi-Fi/Cellular)' : 'Paused (Manual only)'}
            </p>
            <p className="text-[11px] text-[#7a7488] mt-0.5">CTPAT encrypted tunnel</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={autoSync}
              onChange={() => setAutoSync(!autoSync)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-[#e2e2e7] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3d0eb4]" />
          </label>
        </div>
      </section>

      {/* Sync Queue Table */}
      <section className="bg-white rounded-2xl border border-[#e2e2e7] overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-[#e2e2e7] flex items-center justify-between">
          <h3 className="font-bold text-sm sm:text-base text-[#1a1c1f]">
            Pending & Synced Outbox ({queue.length})
          </h3>
          <span className="text-xs font-semibold text-[#494456]">
            {pendingItems.length} awaiting server acknowledge
          </span>
        </div>

        <div className="divide-y divide-[#e2e2e7]">
          {queue.map((item) => {
            const isSynced = item.status === 'synced';
            const isWarning = item.status === 'validation_required';

            return (
              <div
                key={item.id}
                className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-[#f9f9fe] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#e2e2e7] shrink-0">
                    <img src={item.imageUrl} alt={item.code} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#1a1c1f]">{item.code}</span>
                      <span className="text-xs text-[#7a7488]">({item.dataWeight})</span>
                    </div>
                    <p className="text-xs text-[#494456]">
                      {item.location} • Captured {item.capturedTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {isSynced ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <span className="material-symbols-outlined text-sm">cloud_done</span>
                      Synced to Cloud
                    </span>
                  ) : isWarning ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-lg">
                      <span className="material-symbols-outlined text-sm">error</span>
                      Seal Required
                    </span>
                  ) : (
                    <button
                      onClick={() => onSyncItem(item.id)}
                      disabled={isSyncing}
                      className="px-3.5 py-1.5 bg-[#3d0eb4] hover:bg-[#5535cb] text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-sm">cloud_upload</span>
                      <span>Sync</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
