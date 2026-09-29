import React from 'react';
import { InspectionReport } from '../../types';

interface PdfReportModalProps {
  report: InspectionReport;
  onClose: () => void;
}

export const PdfReportModal: React.FC<PdfReportModalProps> = ({ report, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#e2e2e7] my-8 text-[#1a1c1f]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e2e2e7] pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3d0eb4] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">ISO 17712 Inspection Certificate</h2>
              <p className="text-xs text-[#494456]">Report Ref: {report.id} • Terminal Dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f3f3f8] hover:bg-[#e2e2e7] flex items-center justify-center text-[#494456] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Certificate Body */}
        <div className="space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#f9f9fe] rounded-xl border border-[#e2e2e7]">
            <div>
              <p className="text-[10px] font-bold text-[#494456] uppercase tracking-wider">Container Code</p>
              <p className="font-mono text-base font-bold text-[#1a1c1f]">{report.containerCode}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#494456] uppercase tracking-wider">Dimensions</p>
              <p className="text-sm font-bold text-[#1a1c1f]">{report.isoType} Standard Dry</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#494456] uppercase tracking-wider">Inspector</p>
              <p className="text-sm font-bold text-[#1a1c1f]">{report.inspectorName} ({report.inspectorId})</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#494456] uppercase tracking-wider">Analysis Status</p>
              <span className="inline-block mt-0.5 px-2 py-0.5 text-xs font-black uppercase rounded bg-red-100 text-red-700">
                {report.status}
              </span>
            </div>
          </div>

          {/* Captured Defect Image */}
          <div>
            <p className="text-xs font-bold text-[#494456] uppercase tracking-wider mb-2">Diagnostic Scan Imagery</p>
            <div className="relative rounded-xl overflow-hidden border border-[#e2e2e7] bg-black max-h-56">
              <img
                src={report.imageUrl}
                alt="Container defect scan"
                className="w-full h-56 object-cover opacity-90"
              />
              <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                Defect Highlight Active
              </div>
            </div>
          </div>

          {/* Identified Anomalies */}
          <div>
            <p className="text-xs font-bold text-[#494456] uppercase tracking-wider mb-2">Detected Structural Anomalies</p>
            <div className="space-y-2">
              {report.defects.map((def) => (
                <div key={def.id} className="p-3 bg-[#f3f3f8] rounded-xl flex items-start justify-between border border-[#e2e2e7]">
                  <div>
                    <p className="font-bold text-sm text-[#1a1c1f]">{def.title}</p>
                    <p className="text-xs text-[#494456] mt-0.5">{def.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-600 text-white uppercase">
                      {def.severity}
                    </span>
                    {def.depth && <p className="text-xs text-[#494456] mt-1 font-mono">Depth: {def.depth}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confidence and Signature */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-[#e2e2e7]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-[#3d0eb4]">
                <span className="material-symbols-outlined text-2xl font-bold">neurology</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#494456]">Model Confidence Rating</p>
                <p className="text-xl font-black text-[#3d0eb4]">{report.confidenceScore}% High Accuracy</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-bold text-[#494456] uppercase">Terminal Seal Authentication</p>
              <p className="font-mono text-xs font-bold text-emerald-700">✓ SEC-KEY-0849204-VALID</p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-3.5 px-4 bg-[#3d0eb4] hover:bg-[#5535cb] text-white font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-xl">print</span>
            Print / Save as PDF
          </button>
          <button
            onClick={onClose}
            className="py-3.5 px-6 bg-[#f3f3f8] hover:bg-[#e2e2e7] text-[#1a1c1f] font-bold rounded-xl active:scale-95 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
