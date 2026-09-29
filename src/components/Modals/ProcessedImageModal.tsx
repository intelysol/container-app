import React, { useState } from 'react';
import { DefectItem } from '../../types';

interface ProcessedImageModalProps {
  imageUrl: string;
  defects: DefectItem[];
  onClose: () => void;
}

export const ProcessedImageModal: React.FC<ProcessedImageModalProps> = ({
  imageUrl,
  defects,
  onClose,
}) => {
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [selectedDefect, setSelectedDefect] = useState<DefectItem | null>(defects[0] || null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-[#18181b] text-white rounded-2xl max-w-4xl w-full flex flex-col max-h-[90vh] overflow-hidden border border-zinc-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#cabeff] text-2xl">image_search</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold">Processed Diagnostic Imagery</h2>
              <p className="text-xs text-zinc-400">14-point tensor anomaly localization</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                showBoundingBoxes ? 'bg-[#3d0eb4] text-white' : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              <span className="material-symbols-outlined text-sm">crop_free</span>
              <span>Anomalies</span>
            </button>
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                showHeatmap ? 'bg-amber-600 text-white' : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              <span className="material-symbols-outlined text-sm">thermostat</span>
              <span>Depth Map</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-300 ml-2"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Viewport Canvas */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[320px] sm:min-h-[460px]">
          <img
            src={imageUrl}
            alt="Container inspection"
            className="w-full h-full object-contain select-none"
          />

          {/* Depth map overlay effect */}
          {showHeatmap && (
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-yellow-600/30 to-red-600/50 mix-blend-color pointer-events-none" />
          )}

          {/* Interactive Bounding Boxes */}
          {showBoundingBoxes &&
            defects.map((def) => {
              const isSelected = selectedDefect?.id === def.id;
              return (
                <div
                  key={def.id}
                  onClick={() => setSelectedDefect(def)}
                  style={{
                    left: `${def.x}%`,
                    top: `${def.y}%`,
                    width: `${def.width}%`,
                    height: `${def.height}%`,
                  }}
                  className={`absolute border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-red-500 bg-red-500/25 ring-2 ring-red-400'
                      : 'border-yellow-400 bg-yellow-400/15 hover:bg-yellow-400/30'
                  }`}
                >
                  <span
                    className={`absolute -top-6 left-0 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow ${
                      isSelected ? 'bg-red-600 text-white' : 'bg-yellow-400 text-black'
                    }`}
                  >
                    {def.title} {def.depth ? `(${def.depth})` : ''}
                  </span>
                </div>
              );
            })}
        </div>

        {/* Selected Defect Info Footer */}
        {selectedDefect && (
          <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-lg bg-red-950 text-red-400 material-symbols-outlined text-lg">
                warning
              </span>
              <div>
                <p className="font-bold text-sm text-zinc-100">{selectedDefect.title}</p>
                <p className="text-zinc-400">
                  {selectedDefect.location} • Severity: {selectedDefect.severity} • {selectedDefect.description}
                </p>
              </div>
            </div>
            {selectedDefect.depth && (
              <div className="bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700">
                <span className="text-zinc-400">Deformation: </span>
                <span className="font-mono font-bold text-red-400">{selectedDefect.depth}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
