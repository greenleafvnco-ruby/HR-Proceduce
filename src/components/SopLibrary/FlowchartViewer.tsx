import React from 'react';
import { SopDefinition, SopStep } from '../../types/sop';
import { ArrowDown, AlertOctagon, CheckCircle2 } from 'lucide-react';

interface FlowchartViewerProps {
  sop: SopDefinition;
  onStepClick?: (step: SopStep) => void;
}

export const FlowchartViewer: React.FC<FlowchartViewerProps> = ({ sop, onStepClick }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded p-6 overflow-x-auto">
      {/* Legend according to Page 2 of the document */}
      <div className="flex flex-wrap items-center gap-4 p-3 bg-white border border-slate-200 rounded text-xs mb-6 font-mono">
        <span className="font-bold text-slate-800">Quy ước lưu đồ (Trang 2):</span>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-3 rounded-full bg-slate-900 border border-slate-900"></div>
          <span className="text-slate-600">Bắt đầu / Kết thúc</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-3 bg-sky-100 border border-sky-400 rounded-xs"></div>
          <span className="text-slate-600">Bước thực hiện (kèm bộ phận)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rotate-45 bg-amber-100 border border-amber-500"></div>
          <span className="text-slate-600 ml-1">Điểm quyết định (Có/Không)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-3 bg-rose-100 border border-rose-400 rounded-xs"></div>
          <span className="text-slate-600">Ngoại lệ / Từ chối</span>
        </div>
      </div>

      {/* Vertical Interactive Flow Diagram */}
      <div className="flex flex-col items-center max-w-xl mx-auto space-y-4">
        {/* Start Node */}
        <div className="w-48 py-2 text-center rounded-full bg-slate-900 text-white font-mono text-xs font-bold tracking-wide shadow-xs">
          BẮT ĐẦU: {sop.code}
        </div>

        <ArrowDown className="w-4 h-4 text-slate-400" />

        {/* Steps and Decisions */}
        {sop.steps.map((step, idx) => (
          <React.Fragment key={step.stepNumber}>
            {step.isDecision ? (
              /* Decision Layout */
              <div className="w-full flex items-center justify-center relative py-2">
                <div className="flex flex-col items-center">
                  <div
                    onClick={() => onStepClick && onStepClick(step)}
                    className="w-52 h-20 p-2 rotate-0 bg-amber-50 border-2 border-amber-400 rounded flex flex-col items-center justify-center text-center cursor-pointer hover:bg-amber-100 transition-colors shadow-xs"
                  >
                    <span className="text-[10px] font-mono text-amber-900 uppercase font-semibold">
                      Bước {step.stepNumber}: Quyết định
                    </span>
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {step.decisionCondition || step.title}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                      Duyệt: {step.assignedRole}
                    </span>
                  </div>

                  <div className="flex items-center text-[10px] font-mono font-bold text-emerald-700 mt-1">
                    <span>Có / Đạt</span>
                    <ArrowDown className="w-3.5 h-3.5 ml-0.5" />
                  </div>
                </div>

                {/* Right branch: "Không" hoặc ngoại lệ */}
                <div className="absolute right-0 flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-rose-600">Không →</span>
                  <div className="w-40 p-2 bg-rose-50 border border-rose-300 rounded text-center">
                    <span className="text-[10px] font-bold text-rose-800 block">Ngoại lệ / Từ chối</span>
                    <span className="text-[10px] text-slate-600">Yêu cầu bổ sung hoặc chấm dứt luồng</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Standard Process Step */
              <div
                onClick={() => onStepClick && onStepClick(step)}
                className="w-full max-w-md bg-white border border-slate-300 hover:border-blue-500 rounded p-3 flex items-start gap-3 cursor-pointer transition-all shadow-xs"
              >
                {/* Left role tag */}
                <div className="w-14 py-1 rounded bg-sky-100 border border-sky-300 text-sky-900 text-center font-mono font-bold text-xs shrink-0">
                  {step.assignedRole}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-0.5">
                    <span className="font-mono font-bold text-slate-700">Bước {step.stepNumber}</span>
                    <span className="font-mono text-blue-700 font-medium">SLA: {step.sla}</span>
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 leading-snug">{step.title}</h5>
                  <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">{step.description}</p>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">
                    Đầu ra: <strong className="text-slate-800">{step.outputName}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Connecting Arrow */}
            {idx < sop.steps.length - 1 && (
              <ArrowDown className="w-4 h-4 text-slate-400" />
            )}
          </React.Fragment>
        ))}

        <ArrowDown className="w-4 h-4 text-slate-400" />

        {/* End Node */}
        <div className="w-48 py-2 text-center rounded-full bg-slate-900 text-white font-mono text-xs font-bold tracking-wide shadow-xs">
          KẾT THÚC QUY TRÌNH
        </div>
      </div>
    </div>
  );
};
