import React, { useState } from 'react';
import { QueueItem } from '../../types';

interface ResolveSealModalProps {
  item: QueueItem;
  onResolve: (id: string, sealId: string) => void;
  onClose: () => void;
}

export const ResolveSealModal: React.FC<ResolveSealModalProps> = ({
  item,
  onResolve,
  onClose,
}) => {
  const [sealInput, setSealInput] = useState('ISO-17712-H-994102');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sealInput.trim()) return;
    onResolve(item.id, sealInput.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e2e2e7] text-[#1a1c1f]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">report</span>
            </div>
            <div>
              <h2 className="text-base font-bold">Validation Required</h2>
              <p className="text-xs text-[#494456]">Container {item.code}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3f3f8] hover:bg-[#e2e2e7] flex items-center justify-center text-[#494456]"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-red-50 text-red-900 rounded-xl text-xs flex gap-2.5 items-start">
            <span className="material-symbols-outlined text-red-600 text-lg shrink-0">gpp_maybe</span>
            <span>
              High-security bolt seal identification is mandatory under Customs-Trade Partnership Against Terrorism (CTPAT) regulations before cloud synchronization.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#494456] mb-1.5">
              Verified High-Security Bolt Seal ID
            </label>
            <input
              type="text"
              value={sealInput}
              onChange={(e) => setSealInput(e.target.value)}
              placeholder="e.g. ISO-17712-H-XXXXXX"
              className="w-full bg-[#f3f3f8] border border-[#e2e2e7] focus:border-[#3d0eb4] focus:ring-0 rounded-xl px-4 py-3 font-mono text-sm font-bold text-[#1a1c1f]"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSealInput(`ISO-17712-H-${Math.floor(100000 + Math.random() * 900000)}`)}
              className="text-xs font-semibold text-[#3d0eb4] hover:underline"
            >
              Generate Sample Seal ID
            </button>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="submit"
              className="flex-1 py-3 bg-[#3d0eb4] hover:bg-[#5535cb] text-white font-bold rounded-xl text-sm transition-all active:scale-95 shadow-md"
            >
              Verify & Clear Warning
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 bg-[#f3f3f8] hover:bg-[#e2e2e7] text-[#494456] font-bold rounded-xl text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
