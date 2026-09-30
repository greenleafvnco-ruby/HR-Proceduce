import React, { useState } from 'react';
import { SopDefinition, SopStep } from '../../types/sop';
import { useSop } from '../../context/SopContext';
import { FlowchartViewer } from './FlowchartViewer';
import { X, Play, FileText, CheckCircle2, ShieldCheck, Scale, BookOpen, Clock } from 'lucide-react';

interface SopDetailModalProps {
  sop: SopDefinition;
  onClose: () => void;
  onOpenForm: (formCode: string) => void;
  onTriggerStep: (sop: SopDefinition, step: SopStep) => void;
}

export const SopDetailModal: React.FC<SopDetailModalProps> = ({
  sop,
  onClose,
  onOpenForm,
  onTriggerStep
}) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'flowchart' | 'legal' | 'kpis'>('steps');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <span className="font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded">
                {sop.code}
              </span>
              <span>·</span>
              <span>Phiên bản: {sop.version}</span>
              <span>·</span>
              <span>Hiệu lực: {sop.effectiveDate}</span>
              <span>·</span>
              <span>Chủ quản: {sop.department}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 leading-snug">{sop.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="flex items-center gap-6 px-6 border-b border-slate-200 bg-white text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('steps')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'steps' ? 'border-slate-900 text-slate-900' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Các bước thực hiện ({sop.steps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('flowchart')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'flowchart' ? 'border-slate-900 text-slate-900' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Lưu đồ trực quan</span>
          </button>

          <button
            onClick={() => setActiveTab('legal')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'legal' ? 'border-slate-900 text-slate-900' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Căn cứ pháp lý & Biểu mẫu</span>
          </button>

          <button
            onClick={() => setActiveTab('kpis')}
            className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'kpis' ? 'border-slate-900 text-slate-900' : 'border-transparent hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Chỉ số đo lường KPI</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Metadata Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 border border-slate-200 rounded text-xs">
            <div>
              <span className="font-semibold text-slate-700 block mb-1">1. Mục đích:</span>
              <p className="text-slate-600 leading-relaxed">{sop.purpose}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-700 block mb-1">2. Phạm vi áp dụng:</span>
              <p className="text-slate-600 leading-relaxed">{sop.scope}</p>
              <div className="mt-2 text-slate-500 font-mono">
                Đối tượng: <strong className="text-slate-800">{sop.targetAudience}</strong>
              </div>
            </div>
          </div>

          {/* Tab 1: Detailed Steps Table */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              {/* RACI Matrix for this SOP */}
              <div className="p-3 bg-white border border-slate-200 rounded">
                <span className="text-xs font-bold text-slate-800 uppercase block mb-2 font-mono">
                  Phân công trách nhiệm (RACI Matrix):
                </span>
                <div className="grid grid-cols-6 gap-2 text-center text-xs font-mono">
                  <div className="bg-slate-100 p-2 rounded">
                    <span className="text-slate-500 block text-[10px]">HR</span>
                    <strong className="text-slate-900 text-sm">{sop.raci.hr}</strong>
                  </div>
                  <div className="bg-slate-100 p-2 rounded">
                    <span className="text-slate-500 block text-[10px]">Quản lý/Đội</span>
                    <strong className="text-slate-900 text-sm">{sop.raci.ql}</strong>
                  </div>
                  <div className="bg-slate-100 p-2 rounded">
                    <span className="text-slate-500 block text-[10px]">Điều độ</span>
                    <strong className="text-slate-900 text-sm">{sop.raci.dd}</strong>
                  </div>
                  <div className="bg-slate-100 p-2 rounded">
                    <span className="text-slate-500 block text-[10px]">An toàn</span>
                    <strong className="text-slate-900 text-sm">{sop.raci.at}</strong>
                  </div>
                  <div className="bg-slate-100 p-2 rounded">
                    <span className="text-slate-500 block text-[10px]">Kế toán</span>
                    <strong className="text-slate-900 text-sm">{sop.raci.kt}</strong>
                  </div>
                  <div className="bg-slate-100 p-2 rounded">
                    <span className="text-slate-500 block text-[10px]">Ban Giám đốc</span>
                    <strong className="text-slate-900 text-sm">{sop.raci.bgd}</strong>
                  </div>
                </div>
              </div>

              {/* Steps List */}
              <div className="border border-slate-200 rounded overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold font-mono">
                      <th className="py-2.5 px-3 w-16">Bước</th>
                      <th className="py-2.5 px-3">Nội dung thực hiện</th>
                      <th className="py-2.5 px-3 w-24">Phụ trách</th>
                      <th className="py-2.5 px-3 w-32">Thời hạn SLA</th>
                      <th className="py-2.5 px-3 w-36">Đầu ra quy định</th>
                      <th className="py-2.5 px-3 w-28 text-right">Khởi chạy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sop.steps.map(step => (
                      <tr key={step.stepNumber} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-mono font-bold text-slate-800">
                          {step.stepNumber}
                        </td>
                        <td className="py-3 px-3">
                          <strong className="text-slate-900 block mb-0.5">{step.title}</strong>
                          <span className="text-slate-600 leading-relaxed block">{step.description}</span>
                          {step.isDecision && (
                            <span className="inline-block mt-1 text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Điểm quyết định Có/Không
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-blue-700">
                          {step.assignedRole}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-700">
                          {step.sla}
                        </td>
                        <td className="py-3 px-3 font-mono">
                          <span className="font-semibold text-slate-800">{step.outputName}</span>
                          {step.outputFormCode && (
                            <button
                              onClick={() => {
                                onClose();
                                onOpenForm(step.outputFormCode!);
                              }}
                              className="text-[11px] text-blue-600 underline block mt-0.5 hover:text-blue-800"
                            >
                              Mở mẫu {step.outputFormCode}
                            </button>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => onTriggerStep(sop, step)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
                            title="Khởi tạo nhiệm vụ ngay"
                          >
                            <Play className="w-3 h-3" />
                            <span>Chạy</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Flowchart */}
          {activeTab === 'flowchart' && (
            <FlowchartViewer
              sop={sop}
              onStepClick={step => onTriggerStep(sop, step)}
            />
          )}

          {/* Tab 3: Legal & Forms */}
          {activeTab === 'legal' && (
            <div className="space-y-4 text-xs">
              <div className="border border-slate-200 rounded p-4 bg-slate-50">
                <h4 className="font-bold text-slate-900 uppercase font-mono mb-2 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-slate-700" />
                  Quy định & Lưu ý Pháp lý tham chiếu
                </h4>
                <ul className="list-disc list-inside space-y-2 text-slate-700 leading-relaxed">
                  {sop.legalFramework.map((legal, i) => (
                    <li key={i}>{legal}</li>
                  ))}
                </ul>
              </div>

              <div className="border border-slate-200 rounded p-4">
                <h4 className="font-bold text-slate-900 uppercase font-mono mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-700" />
                  Biểu mẫu & Checklist liên quan ({sop.relatedForms.length})
                </h4>
                {sop.relatedForms.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {sop.relatedForms.map(code => (
                      <div
                        key={code}
                        className="p-3 border border-slate-200 rounded flex items-center justify-between bg-white hover:border-blue-400 transition-colors"
                      >
                        <div className="flex items-center gap-2 font-mono">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <strong className="text-slate-900">{code}</strong>
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            onOpenForm(code);
                          }}
                          className="px-2.5 py-1 text-xs bg-slate-900 text-white rounded hover:bg-slate-800"
                        >
                          Mở mẫu
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 italic">Không có biểu mẫu mẫu riêng (sử dụng tài liệu chuẩn của phòng ban hoặc văn bản pháp lý).</p>
                )}
              </div>
            </div>
          )}

          {/* Tab 4: KPIs */}
          {activeTab === 'kpis' && (
            <div className="border border-slate-200 rounded overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold font-mono">
                    <th className="py-2.5 px-4">Chỉ số đo lường hiệu quả (KPI)</th>
                    <th className="py-2.5 px-4 w-48">Mục tiêu quy định</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sop.kpis.map((kpi, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium text-slate-800">{kpi.indicator}</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-700">{kpi.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Phê duyệt: {sop.approvedBy}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-slate-700 border border-slate-300 rounded hover:bg-slate-100"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
