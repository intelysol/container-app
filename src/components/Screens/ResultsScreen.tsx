import React, { useState } from 'react';
import { DefectItem, InspectionReport, ScreenName } from '../../types';
import { IMAGES } from '../../mockData';

interface ResultsScreenProps {
  report: InspectionReport;
  onNavigate: (screen: ScreenName) => void;
  onOpenPdfReport: () => void;
  onOpenImageViewer: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  report,
  onNavigate,
  onOpenPdfReport,
  onOpenImageViewer,
}) => {
  const [forwarded, setForwarded] = useState(false);

  const handleForwardMaintenance = (e: React.MouseEvent) => {
    e.preventDefault();
    setForwarded(true);
    setTimeout(() => setForwarded(false), 4000);
  };

  return (
    <main className="pt-6 pb-28 px-4 max-w-2xl mx-auto space-y-6">
      {/* Processing State Animated Section */}
      <section className="flex flex-col items-center justify-center py-6 text-center">
        <div className="relative w-36 h-36 mb-4">
          {/* Circular Loader */}
          <svg className="w-full h-full animate-[spin_5s_linear_infinite]" viewBox="0 0 100 100">
            <circle
              className="text-[#e2e2e7]"
              cx="50"
              cy="50"
              fill="transparent"
              r="44"
              stroke="currentColor"
              strokeWidth="4"
            />
            <circle
              className="text-[#3d0eb4]"
              cx="50"
              cy="50"
              fill="transparent"
              r="44"
              stroke="currentColor"
              strokeDasharray="180"
              strokeLinecap="round"
              strokeWidth="4"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-4xl text-[#3d0eb4]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              neurology
            </span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-1 text-[#1a1c1f]">
          AI Damage Analysis in Progress...
        </h2>
        <p className="text-[#494456] text-xs sm:text-sm max-w-md">
          Scanning 14 high-resolution points for structural anomalies.
        </p>
      </section>

      {/* Results Section */}
      <section className="space-y-5">
        {/* Header Result Card */}
        <div className="bg-[#f3f3f8] border border-[#e2e2e7] p-5 sm:p-6 rounded-2xl flex items-center justify-between overflow-hidden relative shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#494456]">
              Analysis Status
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1a1c1f]">
              Inspection Complete
            </h3>
          </div>

          {/* Damaged Badge */}
          <div className="flex items-center gap-2 bg-[#dc2626] text-white px-4 py-2 rounded-full shadow-lg shadow-red-600/30">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              warning
            </span>
            <span className="font-black text-xs uppercase tracking-wider">Damaged</span>
          </div>
        </div>

        {/* Bento Grid of Issues */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Image Preview Card */}
          <div className="bg-[#f3f3f8] border border-[#e2e2e7] rounded-2xl overflow-hidden md:row-span-2 group relative min-h-[260px] shadow-sm">
            <img
              src={report.imageUrl || IMAGES.corrosionDent}
              alt="Industrial shipping container damage"
              className="w-full h-full min-h-[260px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <button
                type="button"
                onClick={onOpenImageViewer}
                className="w-full py-2.5 bg-white/20 backdrop-blur-md border border-white/40 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-white/30 transition-colors shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined text-sm">open_in_full</span>
                <span>View Processed Images</span>
              </button>
            </div>
          </div>

          {/* Issue List Card */}
          <div className="bg-[#f3f3f8] border border-[#e2e2e7] p-5 rounded-2xl shadow-sm">
            <h4 className="text-xs font-bold text-[#494456] mb-4 flex items-center gap-2 uppercase tracking-wide">
              <span className="material-symbols-outlined text-sm">list</span>
              <span>Detected Issues</span>
            </h4>
            <ul className="space-y-4">
              {report.defects.map((defect) => (
                <li key={defect.id} className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-xl shrink-0 ${
                      defect.severity === 'High'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-emerald-100 text-[#006d44]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {defect.type === 'dent' ? 'emergency_home' : 'build'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a1c1f]">{defect.title}</p>
                    <p className="text-xs text-[#494456]">
                      {defect.depth ? `Depth: ${defect.depth} • ` : ''}
                      Severity: {defect.severity}
                    </p>
                    <p className="text-[11px] text-[#7a7488] mt-0.5">{defect.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Meta Data Card (Confidence Score) */}
          <div className="bg-purple-50/80 border border-purple-200 p-5 rounded-2xl shadow-sm">
            <h4 className="text-xs font-bold text-[#3d0eb4] mb-2 uppercase tracking-wide">
              Confidence Score
            </h4>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tighter text-[#3d0eb4]">
                {report.confidenceScore}%
              </span>
              <span className="text-xs font-bold text-[#006d44] bg-emerald-50 px-2 py-0.5 rounded-full">
                High Accuracy
              </span>
            </div>
            <div className="mt-3.5 h-2 w-full bg-[#e2e2e7] rounded-full overflow-hidden">
              <div
                style={{ width: `${report.confidenceScore}%` }}
                className="bg-[#3d0eb4] h-full rounded-full shadow-[0_0_8px_rgba(61,14,180,0.5)]"
              />
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex flex-col gap-3 pt-3">
          <button
            onClick={onOpenPdfReport}
            className="w-full btn-gradient text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-purple-900/25 hover:opacity-95 active:scale-[0.98] transition-all text-sm uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-xl">download</span>
            <span>DOWNLOAD FULL PDF REPORT</span>
          </button>

          <div className="flex items-center justify-center">
            <button
              onClick={handleForwardMaintenance}
              className="text-[#494456] text-xs sm:text-sm font-semibold hover:text-[#3d0eb4] transition-colors flex items-center gap-2 group py-2"
            >
              <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">
                share
              </span>
              <span>
                {forwarded ? '✓ Analysis Dispatched to Long Beach Yard Ops' : 'Forward Analysis to Maintenance'}
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
