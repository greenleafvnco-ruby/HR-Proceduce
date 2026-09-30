import React, { useState } from 'react';
import { useSop } from '../../context/SopContext';
import { AutomationRule } from '../../types/sop';
import { Cpu, Zap, Play, CheckCircle2, Clock, ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';

interface AutomationViewProps {
  onGoToTasks: () => void;
}

export const AutomationView: React.FC<AutomationViewProps> = ({ onGoToTasks }) => {
  const { automationRules, toggleAutomationRule, simulateTriggerRule } = useSop();
  const [triggerSuccessMsg, setTriggerSuccessMsg] = useState<string | null>(null);

  const handleSimulate = (rule: AutomationRule) => {
    simulateTriggerRule(rule.id);
    setTriggerSuccessMsg(`Đã kích hoạt tự động quy tắc "${rule.name}" thành công! Nhiệm vụ SLA mới đã được đưa vào hàng đợi.`);
    setTimeout(() => setTriggerSuccessMsg(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span className="font-bold text-slate-900">Automation & Workflow Engine</span>
            <span>·</span>
            <span>Đồng bộ hóa 16 Quy chuẩn SOP</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            Động Cơ Tự Động Hóa Quy Trình & Giám Sát SLA
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            Tự động kích hoạt các bước xử lý khi có biến cố thực tế phát sinh (tai nạn giao thông, camera cabin phát hiện ngủ gật,
            giờ lái xe chạm ngưỡng 4h/10h, GPLX hết hạn, tài xế thi đạt sát hạch). Đảm bảo tuân thủ nghiêm ngặt khung giờ SLA pháp lý.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-800">
            Trạng thái máy chủ: <strong className="text-emerald-700">Đang hoạt động 24/7</strong>
          </span>
        </div>
      </div>

      {/* Trigger Toast */}
      {triggerSuccessMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{triggerSuccessMsg}</span>
          </div>
          <button
            onClick={onGoToTasks}
            className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-mono font-semibold"
          >
            Xem nhiệm vụ ngay →
          </button>
        </div>
      )}

      {/* Rules List */}
      <div className="space-y-4">
        {automationRules.map(rule => (
          <div
            key={rule.id}
            className={`bg-white border rounded p-4.5 transition-all ${
              rule.isActive ? 'border-slate-300 shadow-xs' : 'border-slate-200 opacity-60 bg-slate-50'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono mb-1">
                  <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded">
                    {rule.id}
                  </span>
                  <span>·</span>
                  <span className="font-semibold text-blue-700">{rule.targetSop} (Bước {rule.targetStep})</span>
                  <span>·</span>
                  <span className="text-slate-500">Phụ trách: <strong>{rule.assignedRole}</strong></span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">{rule.name}</h3>
              </div>

              {/* Toggle & Trigger Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleAutomationRule(rule.id)}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-colors ${
                    rule.isActive
                      ? 'bg-slate-900 text-white hover:bg-slate-800'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {rule.isActive ? 'Đang bật' : 'Tạm tắt'}
                </button>

                <button
                  onClick={() => handleSimulate(rule)}
                  disabled={!rule.isActive}
                  className="px-3 py-1 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded transition-colors flex items-center gap-1 shadow-xs disabled:opacity-50"
                  title="Mô phỏng sự kiện kích hoạt thực tế"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Kích hoạt thử</span>
                </button>
              </div>
            </div>

            {/* Condition & Action description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs p-3 bg-slate-50 border border-slate-200 rounded">
              <div>
                <span className="font-semibold text-slate-700 block mb-0.5 font-mono">
                  Sự kiện kích hoạt (Event & Condition):
                </span>
                <p className="text-slate-600">{rule.triggerEvent}</p>
                <div className="mt-1 font-mono text-[11px] text-slate-500">
                  Điều kiện: <span className="text-slate-900 font-medium">{rule.condition}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-0.5 font-mono">
                  Hành động tự động (Automated SOP Task):
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">{rule.autoAction}</p>
              </div>
            </div>

            {/* Execution logs footer */}
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span>Số lần đã chạy: <strong className="text-slate-900">{rule.executionCount} lần</strong></span>
                <span>·</span>
                <span>Lần kích hoạt gần nhất: <span className="text-slate-700">{rule.lastTriggered || 'Chưa chạy'}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
