import React, { useState } from 'react';
import { ContainerSize, ScreenName } from '../../types';
import { IMAGES } from '../../mockData';

interface EntryScreenProps {
  onNavigate: (screen: ScreenName) => void;
  onInitializeSession: (containerCode: string, size: ContainerSize) => void;
  onOpenOcr: () => void;
  activeContainerCode: string;
  setActiveContainerCode: (code: string) => void;
}

export const EntryScreen: React.FC<EntryScreenProps> = ({
  onNavigate,
  onInitializeSession,
  onOpenOcr,
  activeContainerCode,
  setActiveContainerCode,
}) => {
  const [selectedSize, setSelectedSize] = useState<ContainerSize>("20'");

  const sizes: { size: ContainerSize; label: string }[] = [
    { size: "20'", label: 'Standard Dry' },
    { size: "40'", label: 'Standard Dry' },
    { size: "40' HC", label: 'High Cube' },
    { size: "45' HC", label: 'High Cube Extra' },
  ];

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCode = activeContainerCode.trim() || 'MSKU 123456-7';
    onInitializeSession(finalCode, selectedSize);
  };

  return (
    <main className="max-w-xl mx-auto px-4 sm:px-6 py-6 pb-28">
      {/* Status Indicator / Local Session Context */}
      <div className="bg-[#f3f3f8] rounded-xl p-4 mb-8 flex items-center gap-3 border border-[#e2e2e7]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#3d0eb4] animate-pulse" />
        <p className="font-['Inter'] text-xs sm:text-sm font-bold text-[#494456] uppercase tracking-widest">
          Awaiting Local Session Data
        </p>
      </div>

      <form onSubmit={handleStartSession} className="space-y-8">
        {/* Section: Container Identification */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#1a1c1f]">Container ID</h2>
            <span className="text-[10px] font-bold text-[#494456] bg-[#e2e2e7] px-2 py-0.5 rounded uppercase">
              Required
            </span>
          </div>

          <div className="bg-[#e2e2e7]/40 p-4 rounded-2xl border border-[#cbc3d9]/40">
            <label className="block text-[10px] font-bold text-[#494456] uppercase mb-1">
              Serial Number / ISO Code
            </label>
            <div className="flex items-end gap-3">
              <input
                type="text"
                value={activeContainerCode}
                onChange={(e) => setActiveContainerCode(e.target.value.toUpperCase())}
                placeholder="MSKU 123456-7"
                className="w-full bg-transparent border-0 border-b-2 border-[#7a7488] focus:border-[#3d0eb4] focus:ring-0 text-xl sm:text-2xl font-mono font-bold tracking-wider text-[#1a1c1f] placeholder:text-[#7a7488]/50 pb-1 uppercase"
                required
              />
              <button
                type="button"
                onClick={onOpenOcr}
                className="bg-[#3d0eb4] hover:bg-[#5535cb] text-white p-3 sm:p-3.5 rounded-xl shadow-lg shadow-purple-900/20 active:scale-95 transition-all flex items-center justify-center shrink-0"
                title="Scan Container Marking with Camera"
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                  photo_camera
                </span>
                <span className="ml-1.5 font-bold text-xs">OCR</span>
              </button>
            </div>
          </div>
        </section>

        {/* Section: ISO Dimensions */}
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-[#1a1c1f] mb-4">ISO Dimensions</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {sizes.map((item) => {
              const isSelected = selectedSize === item.size;
              return (
                <button
                  key={item.size}
                  type="button"
                  onClick={() => setSelectedSize(item.size)}
                  className={`flex flex-col items-center justify-center p-6 sm:p-7 rounded-2xl border-2 transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-white border-[#3d0eb4] shadow-md ring-2 ring-[#3d0eb4]/20'
                      : 'bg-[#f3f3f8] border-transparent hover:border-[#cbc3d9]'
                  }`}
                >
                  <span
                    className={`text-2xl sm:text-3xl font-black mb-1 ${
                      isSelected ? 'text-[#3d0eb4]' : 'text-[#1a1c1f]'
                    }`}
                  >
                    {item.size}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#494456] uppercase tracking-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Camera Calibration Cue */}
        <div className="bg-[#f3f3f8] rounded-2xl overflow-hidden border border-[#e2e2e7]">
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#1a1c1f] uppercase tracking-wider">
                Camera Calibration
              </span>
              <span className="text-[10px] font-bold text-[#3d0eb4] bg-purple-100 px-2 py-0.5 rounded uppercase">
                Ready
              </span>
            </div>

            <div className="aspect-video bg-black rounded-xl relative overflow-hidden">
              <img
                src={IMAGES.calibrationYard}
                alt="Terminal yard calibration"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-44 h-28 border-2 border-[#3d0eb4]/60 rounded-lg flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#3d0eb4] rounded-full shadow-[0_0_8px_#3d0eb4]" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 flex gap-1 items-end">
                <div className="w-1.5 h-4 bg-[#3d0eb4] rounded-xs" />
                <div className="w-1.5 h-4 bg-[#3d0eb4] rounded-xs" />
                <div className="w-1.5 h-4 bg-[#3d0eb4]/40 rounded-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          className="w-full py-4 sm:py-5 rounded-2xl btn-gradient text-white font-black text-base sm:text-lg tracking-tight shadow-xl shadow-purple-900/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined text-2xl">shutter_speed</span>
          <span>INITIALIZE SESSION</span>
        </button>
      </form>
    </main>
  );
};
