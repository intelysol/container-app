import React, { useState, useEffect } from 'react';
import { IMAGES } from '../../mockData';

interface OcrScannerModalProps {
  onScanComplete: (code: string) => void;
  onClose: () => void;
}

export const OcrScannerModal: React.FC<OcrScannerModalProps> = ({
  onScanComplete,
  onClose,
}) => {
  const [scanning, setScanning] = useState(true);
  const [detectedCode, setDetectedCode] = useState<string | null>(null);

  const presets = ['MSKU 123456-7', 'CMAU 789412-0', 'TCLU 882931-4', 'CNTR 992014-X'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDetectedCode('MSKU 123456-7');
      setScanning(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectCode = (code: string) => {
    onScanComplete(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="bg-[#18181b] text-white rounded-2xl max-w-md w-full overflow-hidden border border-zinc-700 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-400">qr_code_scanner</span>
            <span className="font-bold text-sm">ISO 6346 OCR Optical Scanner</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Scanner Viewport */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <img
            src={IMAGES.containerExterior}
            alt="Container text"
            className="w-full h-full object-cover opacity-60"
          />

          {/* Scanner Grid and Reticle */}
          <div className="absolute inset-0 border-[16px] border-black/50 pointer-events-none" />
          
          <div className="absolute w-4/5 h-2/5 border-2 border-dashed border-purple-400 rounded-lg flex items-center justify-center">
            {scanning && (
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_12px_#a855f7] animate-pulse" />
            )}
            <div className="bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-purple-400/40">
              <span className="font-mono text-xs font-bold text-purple-200 uppercase tracking-widest">
                {scanning ? 'Detecting ISO Codes...' : 'Code Locked'}
              </span>
            </div>
          </div>
        </div>

        {/* Scan Status & Quick Pick */}
        <div className="p-5 space-y-4">
          {detectedCode ? (
            <div className="bg-purple-950/60 border border-purple-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-purple-300">Detected Container Code</p>
                <p className="font-mono text-xl font-black text-white">{detectedCode}</p>
              </div>
              <button
                onClick={() => handleSelectCode(detectedCode)}
                className="px-4 py-2 bg-[#3d0eb4] text-white font-bold rounded-lg text-xs hover:bg-[#5535cb] transition-colors"
              >
                Apply Code
              </button>
            </div>
          ) : (
            <div className="text-center py-2 text-xs text-zinc-400 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm animate-spin">sync</span>
              <span>Position camera over container door or side panel</span>
            </div>
          )}

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Or Select Demo Serial:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelectCode(code)}
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs rounded-lg border border-zinc-700 text-left transition-colors"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
