import React, { useState } from 'react';
import { InspectionReport, ScreenName } from '../../types';

interface HistoryScreenProps {
  reports: InspectionReport[];
  onSelectReport: (report: InspectionReport) => void;
  onNavigate: (screen: ScreenName) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  reports,
  onSelectReport,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Damaged' | 'Passed'>('all');

  const filtered = reports.filter((rep) => {
    const matchSearch =
      rep.containerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rep.terminal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || rep.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-28 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#1a1c1f]">
            Inspection History
          </h2>
          <p className="text-xs text-[#494456]">
            ISO 17712 certified container audits archived in local edge cache
          </p>
        </div>

        <button
          onClick={() => onNavigate('entry')}
          className="btn-gradient text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 self-start active:scale-95 shadow-md shadow-purple-900/20"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>New Inspection</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Container Code or Ref ID..."
            className="w-full bg-[#f3f3f8] border border-[#e2e2e7] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold focus:border-[#3d0eb4] focus:ring-0 text-[#1a1c1f]"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-lg text-[#7a7488]">
            search
          </span>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-[#f3f3f8] rounded-xl border border-[#e2e2e7] self-start">
          {(['all', 'Damaged', 'Passed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                filterStatus === st
                  ? 'bg-white text-[#3d0eb4] shadow-xs'
                  : 'text-[#494456] hover:text-[#1a1c1f]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {filtered.map((report) => {
          const isDamaged = report.status === 'Damaged';
          return (
            <div
              key={report.id}
              onClick={() => onSelectReport(report)}
              className="group bg-white p-4 sm:p-5 rounded-2xl border border-[#e2e2e7] hover:border-[#cbc3d9] transition-all cursor-pointer shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-black shrink-0 relative">
                  <img
                    src={report.imageUrl}
                    alt={report.containerCode}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {isDamaged && (
                    <div className="absolute top-1 left-1 bg-red-600 text-white rounded-xs p-0.5">
                      <span className="material-symbols-outlined text-xs">warning</span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono font-bold text-base text-[#1a1c1f]">
                      {report.containerCode}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isDamaged ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#494456]">
                    {report.timestamp} • {report.terminal}
                  </p>
                  <p className="text-[11px] text-[#7a7488] mt-0.5">
                    {report.defects.length > 0
                      ? `${report.defects.length} structural defects detected (${report.confidenceScore}% confidence)`
                      : `Zero defects detected • 100% compliant`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-[#e2e2e7]">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#494456] block">Ref</span>
                  <span className="font-mono text-xs font-semibold text-[#1a1c1f]">{report.id}</span>
                </div>
                <button
                  type="button"
                  className="px-3.5 py-2 bg-[#f3f3f8] group-hover:bg-[#3d0eb4] group-hover:text-white text-[#1a1c1f] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">visibility</span>
                  <span>Certificate</span>
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-[#f3f3f8] rounded-2xl border border-dashed border-[#cbc3d9]">
            <span className="material-symbols-outlined text-4xl text-[#7a7488] mb-2">folder_off</span>
            <p className="text-sm font-bold text-[#1a1c1f]">No Inspection Records Found</p>
            <p className="text-xs text-[#494456]">Try changing your search terms or filter criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
};
