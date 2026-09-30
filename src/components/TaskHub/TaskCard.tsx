import React from 'react';
import { SopTask, TaskStatus, TaskPriority } from '../../types/sop';
import { useSop } from '../../context/SopContext';
import { Clock, CheckCircle2, AlertCircle, FileText, ArrowRight, UserCheck } from 'lucide-react';

interface TaskCardProps {
  task: SopTask;
  onOpenDetail: (task: SopTask) => void;
  onOpenForm?: (formCode: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onOpenDetail, onOpenForm }) => {
  const { updateTaskStatus } = useSop();

  const priorityLabels: Record<TaskPriority, { text: string; color: string }> = {
    urgent: { text: 'Khẩn cấp', color: 'text-rose-700 bg-rose-50 border-rose-200' },
    high: { text: 'Ưu tiên cao', color: 'text-amber-800 bg-amber-50 border-amber-200' },
    normal: { text: 'Bình thường', color: 'text-slate-700 bg-slate-50 border-slate-200' },
    low: { text: 'Thấp', color: 'text-slate-600 bg-slate-50 border-slate-200' }
  };

  const statusLabels: Record<TaskStatus, { text: string; color: string; border: string }> = {
    pending: { text: 'Chờ tiếp nhận', color: 'text-slate-600', border: 'border-l-slate-400' },
    in_progress: { text: 'Đang thực hiện', color: 'text-blue-700', border: 'border-l-blue-600' },
    approval_required: { text: 'Chờ phê duyệt', color: 'text-amber-700', border: 'border-l-amber-500' },
    completed: { text: 'Đã hoàn thành', color: 'text-emerald-700', border: 'border-l-emerald-600' },
    breached: { text: 'Quá hạn SLA', color: 'text-rose-700', border: 'border-l-rose-600' }
  };

  const formatRemainingTime = (minutes?: number) => {
    if (minutes === undefined) return 'Theo hạn';
    if (minutes <= 0) return 'Đã trễ SLA';
    if (minutes < 60) return `Còn ${minutes} phút`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours < 24) return `Còn ${hours}h ${mins > 0 ? `${mins}p` : ''}`;
    const days = Math.floor(hours / 24);
    return `Còn ${days} ngày`;
  };

  return (
    <div
      className={`bg-white border border-slate-200 rounded p-4 transition-all hover:border-slate-400 hover:shadow-xs border-l-4 ${
        statusLabels[task.status].border
      }`}
    >
      {/* Top Meta Line: Zero-Pill Typography */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2 gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 font-mono">
          <span className="font-semibold text-slate-800">{task.taskCode}</span>
          <span aria-hidden="true">·</span>
          <span>{task.sopCode}</span>
          <span aria-hidden="true">·</span>
          <span>Bước {task.stepNumber}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Priority text */}
          <span
            className={`text-xs px-2 py-0.5 rounded border font-medium ${
              priorityLabels[task.priority].color
            }`}
          >
            {priorityLabels[task.priority].text}
          </span>
        </div>
      </div>

      {/* Title */}
      <h4
        onClick={() => onOpenDetail(task)}
        className="text-sm font-semibold text-slate-900 leading-snug cursor-pointer hover:text-blue-700 transition-colors mb-1.5"
      >
        {task.title}
      </h4>

      {/* Description Snippet */}
      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
        {task.description}
      </p>

      {/* Middle Context: Subject, Vehicle, Role */}
      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2 mb-3 py-1.5 border-t border-b border-slate-100 font-mono">
        <span>Vai trò: <strong className="text-slate-800">{task.assignedRole}</strong></span>
        <span aria-hidden="true">·</span>
        <span>Phụ trách: <span className="text-slate-700">{task.assigneeName}</span></span>
        {task.relatedStaffName && (
          <>
            <span aria-hidden="true">·</span>
            <span>Đối tượng: <strong className="text-slate-800">{task.relatedStaffName}</strong></span>
          </>
        )}
        {task.vehiclePlate && (
          <>
            <span aria-hidden="true">·</span>
            <span>Xe: <span className="text-slate-900 font-bold">{task.vehiclePlate}</span></span>
          </>
        )}
      </div>

      {/* Bottom Footer: SLA Countdown & Actions */}
      <div className="flex items-center justify-between gap-2 pt-1 text-xs">
        <div className="flex items-center gap-1.5">
          <Clock
            className={`w-3.5 h-3.5 ${
              task.slaRemainingMinutes && task.slaRemainingMinutes <= 30
                ? 'text-rose-600 animate-pulse'
                : 'text-slate-400'
            }`}
          />
          <span
            className={`font-mono text-xs ${
              task.status === 'completed'
                ? 'text-emerald-700 font-medium'
                : task.isBreached
                ? 'text-rose-700 font-bold'
                : task.slaRemainingMinutes && task.slaRemainingMinutes <= 30
                ? 'text-rose-600 font-bold'
                : 'text-slate-600'
            }`}
          >
            {task.status === 'completed' ? 'Đã hoàn tất' : formatRemainingTime(task.slaRemainingMinutes)}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {task.relatedFormCode && (
            <button
              onClick={() => onOpenForm && onOpenForm(task.relatedFormCode!)}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
              title={`Mở biểu mẫu ${task.relatedFormCode}`}
            >
              <FileText className="w-3 h-3 text-slate-500" />
              <span>{task.relatedFormCode}</span>
            </button>
          )}

          {task.status === 'approval_required' ? (
            <button
              onClick={() => updateTaskStatus(task.id, 'completed', 'Ban Giám đốc / Trưởng bộ phận đã duyệt')}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded transition-colors"
            >
              <UserCheck className="w-3 h-3" />
              <span>Phê duyệt</span>
            </button>
          ) : task.status !== 'completed' ? (
            <button
              onClick={() => updateTaskStatus(task.id, 'completed', 'Xác nhận hoàn thành các bước')}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-50 rounded transition-colors"
              title="Đánh dấu hoàn thành"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Xong</span>
            </button>
          ) : null}

          <button
            onClick={() => onOpenDetail(task)}
            className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
          >
            <span>Chi tiết</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
