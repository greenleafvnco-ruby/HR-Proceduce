import React, { useState } from 'react';
import { useSop } from '../../context/SopContext';
import { FormTemplate } from '../../types/sop';
import { FormModalRenderer } from './FormModalRenderer';
import { Search, FileText, ArrowRight, CheckCircle2, Shield, Calendar, Award } from 'lucide-react';

interface FormsCenterViewProps {
  onSuccessTaskCreated?: (taskCode: string) => void;
}

export const FormsCenterView: React.FC<FormsCenterViewProps> = ({ onSuccessTaskCreated }) => {
  const { forms } = useSop();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFormModal, setActiveFormModal] = useState<FormTemplate | null>(null);

  const categories = [
    { key: 'ALL', label: 'Tất cả 19 Biểu mẫu' },
    { key: 'Tuyển dụng', label: 'Tuyển dụng & Sát hạch' },
    { key: 'Onboarding', label: 'Hội nhập & Thử việc' },
    { key: 'Chấm công & Phép', label: 'Chấm công & Giờ lái' },
    { key: 'An toàn & Kỷ luật', label: 'An toàn, Sự cố & Kỷ luật' },
    { key: 'Đánh giá & Thôi việc', label: 'Hiệu suất & Thôi việc' }
  ];

  const filteredForms = forms.filter(f => {
    if (selectedCategory !== 'ALL' && f.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        f.code.toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q) ||
        f.sopCode.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q)
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
            <span className="font-bold text-slate-900">19 Biểu mẫu Tiêu chuẩn (HR-F01 đến HR-F19)</span>
            <span>·</span>
            <span>Phần C Tài liệu HR-SOP</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            Trung Tâm Biểu Mẫu & Checklist Điện Tử
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            Điền trực tuyến, tự động tính điểm sát hạch/hiệu suất, kiểm soát giới hạn làm thêm 40h/tháng và
            tự động đồng bộ hóa tạo nhiệm vụ theo dõi thời gian thực gắn với khung giờ SLA của từng quy trình SOP.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-700">
            Tổng số: <strong>19 Mẫu chuẩn</strong>
          </span>
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
            placeholder="Tìm theo mã biểu mẫu (VD: HR-F03, HR-F13), tên phiếu..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-400"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-0.5 rounded text-xs">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                selectedCategory === cat.key ? 'bg-white text-slate-900 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredForms.map(form => (
          <div
            key={form.code}
            className="bg-white border border-slate-200 hover:border-slate-400 rounded p-4 flex flex-col justify-between transition-all hover:shadow-xs group cursor-pointer"
            onClick={() => setActiveFormModal(form)}
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-mono">
                <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                  {form.code}
                </span>
                <span>{form.sopCode}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug mb-1">
                {form.title}
              </h3>

              <div className="text-[11px] text-slate-500 font-mono mb-2">
                Nhóm: <span className="text-slate-700 font-medium">{form.category}</span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                {form.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono">Điện tử / Tự động</span>
              <div className="flex items-center text-slate-800 font-semibold group-hover:text-blue-700">
                <span>Điền & Kích hoạt</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Form Modal */}
      {activeFormModal && (
        <FormModalRenderer
          formTemplate={activeFormModal}
          onClose={() => setActiveFormModal(null)}
          onSuccessTaskCreated={onSuccessTaskCreated}
        />
      )}
    </div>
  );
};
