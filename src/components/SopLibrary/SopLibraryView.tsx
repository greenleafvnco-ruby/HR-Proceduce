import React, { useState } from 'react';
import { useSop } from '../../context/SopContext';
import { SopDefinition, SopStep } from '../../types/sop';
import { SopDetailModal } from './SopDetailModal';
import { Search, BookOpen, Layers, Users, Truck, ArrowRight, ShieldCheck } from 'lucide-react';

interface SopLibraryViewProps {
  onOpenForm: (formCode: string) => void;
  onTriggerStep: (sop: SopDefinition, step: SopStep) => void;
}

export const SopLibraryView: React.FC<SopLibraryViewProps> = ({ onOpenForm, onTriggerStep }) => {
  const { sops } = useSop();
  const [filterAudience, setFilterAudience] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSop, setSelectedSop] = useState<SopDefinition | null>(null);

  const filteredSops = sops.filter(sop => {
    if (filterAudience !== 'ALL') {
      if (filterAudience === 'driver' && sop.targetAudience !== 'Khối tài xế' && sop.targetAudience !== 'Cả hai khối') return false;
      if (filterAudience === 'office' && sop.targetAudience !== 'Khối văn phòng' && sop.targetAudience !== 'Cả hai khối') return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        sop.code.toLowerCase().includes(q) ||
        sop.title.toLowerCase().includes(q) ||
        sop.department.toLowerCase().includes(q) ||
        sop.purpose.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white border border-slate-200 rounded p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span className="font-bold text-slate-900">Mã HR-SOP-MASTER</span>
            <span>·</span>
            <span>Phiên bản 3.0</span>
            <span>·</span>
            <span>Doanh nghiệp Vận tải 500 Nhân sự</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            Bộ Quy Trình Nhân Sự Tiêu Chuẩn (16 SOP)
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            Tích hợp toàn diện 16 quy trình, 8 lưu đồ, 19 biểu mẫu/checklist. Đáp ứng Bộ luật Lao động 2019,
            Luật Trật tự an toàn giao thông đường bộ 2024 (Điều 64 trần lái xe 4/10/48h), Nghị định 168/2024,
            Nghị định 283/2026 và Nghị định 13/2023 bảo vệ dữ liệu cá nhân.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right font-mono text-xs">
            <span className="text-slate-400 block">Quy mô định biên</span>
            <strong className="text-slate-900 text-sm">400 Tài xế / 100 VP</strong>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded p-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm theo mã SOP (VD: HR-SOP-05), tên quy trình, từ khóa..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-400"
          />
        </div>

        {/* Audience Segmented Filter */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded text-xs">
          <button
            onClick={() => setFilterAudience('ALL')}
            className={`px-3 py-1 rounded transition-colors ${
              filterAudience === 'ALL' ? 'bg-white text-slate-900 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả 16 SOP
          </button>
          <button
            onClick={() => setFilterAudience('driver')}
            className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
              filterAudience === 'driver' ? 'bg-white text-blue-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Khối tài xế (80%)</span>
          </button>
          <button
            onClick={() => setFilterAudience('office')}
            className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
              filterAudience === 'office' ? 'bg-white text-slate-900 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Khối văn phòng (20%)</span>
          </button>
        </div>
      </div>

      {/* Grid of 16 SOP Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSops.map(sop => (
          <div
            key={sop.code}
            className="bg-white border border-slate-200 hover:border-slate-400 rounded p-4 flex flex-col justify-between transition-all hover:shadow-xs group cursor-pointer"
            onClick={() => setSelectedSop(sop)}
          >
            <div>
              {/* Header meta */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
                <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                  {sop.code}
                </span>
                <span>{sop.steps.length} bước</span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug mb-1.5">
                {sop.title}
              </h3>

              {/* Scope & Audience */}
              <div className="text-xs text-slate-500 font-mono mb-2 flex items-center gap-1.5">
                <span>{sop.department}</span>
                <span>·</span>
                <span className="text-slate-700 font-semibold">{sop.targetAudience}</span>
              </div>

              {/* Purpose snippet */}
              <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                {sop.purpose}
              </p>
            </div>

            {/* Bottom Meta & Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                <span>Mẫu: <strong className="text-slate-800">{sop.relatedForms.length}</strong></span>
                <span>·</span>
                <span>KPI: <strong className="text-slate-800">{sop.kpis.length}</strong></span>
              </div>

              <div className="flex items-center text-slate-800 font-semibold group-hover:text-blue-700">
                <span>Xem quy trình</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected SOP Detail Modal */}
      {selectedSop && (
        <SopDetailModal
          sop={selectedSop}
          onClose={() => setSelectedSop(null)}
          onOpenForm={onOpenForm}
          onTriggerStep={onTriggerStep}
        />
      )}
    </div>
  );
};
