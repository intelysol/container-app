import React, { useState } from 'react';
import { InspectionStep, ScreenName } from '../../types';
import { IMAGES } from '../../mockData';

interface CaptureScreenProps {
  inspectionId: string;
  steps: InspectionStep[];
  onCompleteStep: (stepId: number) => void;
  onNavigate: (screen: ScreenName) => void;
  onStartAnalysis: () => void;
}

export const CaptureScreen: React.FC<CaptureScreenProps> = ({
  inspectionId,
  steps,
  onCompleteStep,
  onNavigate,
  onStartAnalysis,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(2); // Step 3: Right Side Exterior by default
  const [flashMode, setFlashMode] = useState<'auto' | 'on' | 'off'>('auto');
  const [showGrid, setShowGrid] = useState(true);
  const [isShutterActive, setIsShutterActive] = useState(false);
  const [capturedCount, setCapturedCount] = useState(2);

  const currentStep = steps[currentStepIndex] || steps[0];

  const handleCapture = () => {
    setIsShutterActive(true);
    setTimeout(() => {
      setIsShutterActive(false);
      onCompleteStep(currentStep.id);
      setCapturedCount((prev) => Math.min(prev + 1, steps.length));

      // If at end or want to continue
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        // All 7 points captured, proceed to analysis!
        onStartAnalysis();
      }
    }, 450);
  };

  const getFlashIcon = () => {
    if (flashMode === 'auto') return 'flash_auto';
    if (flashMode === 'on') return 'flash_on';
    return 'flash_off';
  };

  const toggleFlash = () => {
    if (flashMode === 'auto') setFlashMode('on');
    else if (flashMode === 'on') setFlashMode('off');
    else setFlashMode('auto');
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-4 pb-28 flex flex-col gap-6">
      {/* Top Step Header */}
      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[#3d0eb4] font-black tracking-tight text-xs uppercase">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1a1c1f] tracking-tight">
              {currentStep.label} Exterior
            </h2>
          </div>
          <div className="text-right">
            <p className="text-[#494456] text-[10px] font-bold uppercase tracking-wider">
              Inspection ID
            </p>
            <p className="font-mono text-sm sm:text-base font-bold text-[#1a1c1f]">{inspectionId}</p>
          </div>
        </div>

        {/* 7-Segment Progress Bar */}
        <div className="h-2 w-full bg-[#ededf2] rounded-full overflow-hidden flex gap-1 p-0.5">
          {steps.map((st, idx) => {
            const isDone = st.completed || idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={st.id}
                className={`h-full rounded-full flex-1 transition-all duration-300 ${
                  isDone
                    ? 'bg-[#3d0eb4]'
                    : isCurrent
                    ? 'bg-[#3d0eb4]/60 animate-pulse'
                    : 'bg-[#e2e2e7]'
                }`}
              />
            );
          })}
        </div>
      </section>

      {/* Camera Viewfinder Card */}
      <div className="relative flex-1 min-h-[380px] sm:min-h-[460px] rounded-3xl overflow-hidden bg-black shadow-2xl group border border-[#cbc3d9]/30">
        {/* Shutter White Flash animation */}
        {isShutterActive && (
          <div className="absolute inset-0 bg-white z-30 transition-opacity duration-150 opacity-90 pointer-events-none" />
        )}

        {/* Camera Image Preview */}
        <img
          src={IMAGES.cameraPortView}
          alt="Container inspection viewpoint"
          className="absolute inset-0 w-full h-full object-cover opacity-85 select-none"
        />

        {/* Dynamic Overlay Grid */}
        {showGrid && <div className="absolute inset-0 camera-overlay-grid pointer-events-none" />}
        <div className="absolute inset-0 border-[20px] sm:border-[28px] border-black/30 pointer-events-none" />

        {/* Container Alignment Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-3/5 border-2 border-dashed border-white/50 rounded-2xl flex items-center justify-center pointer-events-none">
          {/* 4 Corner Bracket accents */}
          <div className="w-8 h-8 border-t-4 border-l-4 border-[#3d0eb4] absolute top-0 left-0 -translate-x-1 -translate-y-1" />
          <div className="w-8 h-8 border-t-4 border-r-4 border-[#3d0eb4] absolute top-0 right-0 translate-x-1 -translate-y-1" />
          <div className="w-8 h-8 border-b-4 border-l-4 border-[#3d0eb4] absolute bottom-0 left-0 -translate-x-1 translate-y-1" />
          <div className="w-8 h-8 border-b-4 border-r-4 border-[#3d0eb4] absolute bottom-0 right-0 translate-x-1 translate-y-1" />

          {/* Centered Instruction pill */}
          <div className="text-white text-center bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-lg">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em]">
              Align edge of container
            </p>
          </div>
        </div>

        {/* Controls: Top Left Flash & Straighten */}
        <div className="absolute top-5 left-5 flex flex-col gap-3 z-20">
          <button
            type="button"
            onClick={toggleFlash}
            className="w-11 h-11 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all border border-white/20 active:scale-95"
            title={`Flash: ${flashMode}`}
          >
            <span className="material-symbols-outlined text-xl">{getFlashIcon()}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowGrid(!showGrid)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all border active:scale-95 ${
              showGrid
                ? 'bg-[#3d0eb4] text-white border-purple-400'
                : 'bg-black/40 text-white hover:bg-black/60 border-white/20'
            }`}
            title="Toggle Alignment Grid"
          >
            <span className="material-symbols-outlined text-xl">straighten</span>
          </button>
        </div>

        {/* Controls: Bottom Right Low Light Warning */}
        <div className="absolute bottom-5 right-5 z-20">
          <div className="px-3.5 py-2 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 flex items-center gap-2.5 shadow-lg">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] text-white font-bold uppercase tracking-widest">
              Low Light Warning
            </span>
          </div>
        </div>
      </div>

      {/* Lens, Storage & Capture CTA Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#f3f3f8] p-4 sm:p-5 rounded-2xl flex items-center gap-4 border border-[#e2e2e7]">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#3d0eb4] shadow-sm">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              camera_enhance
            </span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#494456] uppercase tracking-wider">Lens Status</p>
            <p className="font-bold text-[#1a1c1f] text-sm sm:text-base">Precision Aligned</p>
          </div>
        </div>

        <div className="bg-[#f3f3f8] p-4 sm:p-5 rounded-2xl flex items-center gap-4 border border-[#e2e2e7]">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#006d44] shadow-sm">
            <span className="material-symbols-outlined text-2xl">sd_card</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#494456] uppercase tracking-wider">Local Storage</p>
            <p className="font-bold text-[#1a1c1f] text-sm sm:text-base">1.2 GB Available</p>
          </div>
        </div>

        <div
          onClick={handleCapture}
          className="md:col-span-1 btn-gradient text-white p-4 sm:p-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-purple-900/20 active:scale-95 transition-transform cursor-pointer select-none"
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            photo_camera
          </span>
          <span className="font-black uppercase tracking-widest text-xs sm:text-sm">
            Capture {currentStep.label} View
          </span>
        </div>
      </section>

      {/* 7-Point ISO Checklist */}
      <section className="bg-[#f3f3f8] rounded-2xl p-5 sm:p-6 border border-[#e2e2e7]">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <h3 className="font-bold text-[#1a1c1f] flex items-center gap-2 text-sm sm:text-base">
            <span className="material-symbols-outlined text-[#3d0eb4]">assignment</span>
            <span>7-Point Checklist</span>
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-[#494456] bg-[#e2e2e7] px-3 py-1 rounded-full uppercase tracking-wider">
              ISO 17712 Compliant
            </span>
            <button
              onClick={onStartAnalysis}
              className="text-xs font-bold text-[#3d0eb4] hover:underline"
            >
              Analyze Now →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {steps.map((st, idx) => {
            const isCompleted = st.completed || idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className="flex flex-col items-center gap-2 group focus:outline-none"
              >
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isCompleted
                      ? 'bg-[#3d0eb4] text-white shadow-sm'
                      : isCurrent
                      ? 'bg-white border-2 border-[#3d0eb4] text-[#3d0eb4] ring-4 ring-[#3d0eb4]/20'
                      : 'bg-[#e2e2e7] text-[#494456] opacity-60 hover:opacity-100'
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-base">check</span>
                  ) : (
                    <span>{st.id}</span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold uppercase text-center tracking-tight ${
                    isCurrent ? 'text-[#3d0eb4]' : 'text-[#494456]'
                  }`}
                >
                  {st.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
};
