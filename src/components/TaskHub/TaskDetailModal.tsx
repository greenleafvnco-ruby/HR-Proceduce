import React, { useState } from 'react';
import { SopTask, TaskStatus, RoleKey } from '../../types/sop';
import { useSop } from '../../context/SopContext';
import { SOP_LIST } from '../../data/sopMasterData';
import { X, Clock, CheckCircle, FileText, Send, User, ShieldAlert, ArrowRight, CornerDownRight } from 'lucide-react';

interface TaskDetailModalProps {
  task: SopTask;
  onClose: () => void;
  onOpenForm?: (formCode: string) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose, onOpenForm }) => {
  const { updateTaskStatus, addTaskComment, assignTask, currentRole } = useSop();
  const [commentInput, setCommentInput] = useState('');
  const [assigneeInput, setAssigneeInput] = useState(task.assigneeName);
  const [roleInput, setRoleInput] = useState<RoleKey>(task.assignedRole);

  const sopDef = SOP_LIST.find(s => s.code === task.sopCode);
  const currentStep = sopDef?.steps.find(st => st.stepNumber === task.stepNumber);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addTaskComment(task.id, commentInput.trim());
    setCommentInput('');
  };

  const handleUpdateAssignee = () => {
    if (!assigneeInput.trim()) return;
    assignTask(task.id, roleInput, assigneeInput.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <span className="font-bold text-slate-800">{task.taskCode}</span>
              <span>·</span>
              <span className="font-semibold text-blue-700">{task.sopCode}: {task.sopTitle}</span>
              <span>·</span>
              <span>Bước {task.stepNumber}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">{task.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status and SLA Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded">
            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Trạng thái</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 font-mono">
                  {task.status === 'in_progress' && 'Đang thực hiện'}
                  {task.status === 'pending' && 'Chờ tiếp nhận'}
                  {task.status === 'approval_required' && 'Cần phê duyệt'}
                  {task.status === 'completed' && 'Đã hoàn thành'}
                  {task.status === 'breached' && 'Quá hạn SLA'}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Thời hạn SLA chuẩn</span>
              <div className="flex items-center gap-1.5 text-xs text-slate-800 font-mono">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{currentStep?.sla || 'Theo quy trình'}</span>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-500 block mb-0.5">Thời gian còn lại</span>
              <span className={`text-xs font-mono font-bold ${task.isBreached ? 'text-rose-600' : 'text-slate-800'}`}>
                {task.isBreached
                  ? 'ĐÃ QUÁ HẠN SLA'
                  : task.slaRemainingMinutes
                  ? `Còn ${task.slaRemainingMinutes} phút`
                  : 'Đúng tiến độ'}
              </span>
            </div>
          </div>

          {/* SOP Step Definition details */}
          <div className="border border-slate-200 rounded p-4">
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
              <CornerDownRight className="w-3.5 h-3.5 text-blue-600" />
              Chi tiết bước thực hiện theo chuẩn SOP
            </h4>
            <div className="text-xs text-slate-700 space-y-2">
              <p><strong>Nội dung:</strong> {task.description}</p>
              {currentStep && (
                <>
                  <p><strong>Đầu ra bắt buộc:</strong> <span className="font-mono text-slate-900 font-semibold">{currentStep.outputName}</span></p>
                  {currentStep.legalNote && (
                    <p className="p-2 bg-amber-50 border border-amber-200 rounded text-amber-900">
                      <strong>Lưu ý pháp lý:</strong> {currentStep.legalNote}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Context Details (Staff, Vehicle, Form) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="border border-slate-200 rounded p-3 space-y-1.5">
              <span className="text-slate-400 block font-mono">Đối tượng liên quan</span>
              <div className="font-semibold text-slate-800">
                {task.relatedStaffName || 'Không định danh cá nhân'}
              </div>
              <div className="text-slate-500">
                Khối: {task.staffType === 'driver' ? 'Tài xế lái xe' : 'Nhân sự văn phòng'}
                {task.vehiclePlate && ` · Biển số xe: ${task.vehiclePlate}`}
              </div>
            </div>

            <div className="border border-slate-200 rounded p-3 space-y-1.5">
              <span className="text-slate-400 block font-mono">Biểu mẫu đính kèm</span>
              {task.relatedFormCode ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-slate-800 font-bold">
                    <FileText className="w-4 h-4 text-blue-600" />
                    {task.relatedFormCode}
                  </div>
                  {onOpenForm && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenForm(task.relatedFormCode!);
                      }}
                      className="px-2.5 py-1 text-xs bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
                    >
                      Mở biểu mẫu
                    </button>
                  )}
                </div>
              ) : (
                <span className="text-slate-500 italic">Không có biểu mẫu bắt buộc</span>
              )}
            </div>
          </div>

          {/* RACI Re-assignment */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded">
            <span className="text-xs font-semibold text-slate-800 block mb-2">Phân công cán bộ phụ trách (RACI: {task.assignedRole})</span>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={roleInput}
                onChange={e => setRoleInput(e.target.value as RoleKey)}
                className="text-xs bg-white border border-slate-300 rounded px-2 py-1.5"
              >
                <option value="HR">HR - Nhân sự</option>
                <option value="ĐĐ">ĐĐ - Điều độ</option>
                <option value="AT">AT - An toàn</option>
                <option value="QL">QL - Quản lý / Đội trưởng</option>
                <option value="KT">KT - Kế toán</option>
                <option value="BGĐ">BGĐ - Ban Giám đốc</option>
                <option value="Tài xế">Tài xế</option>
              </select>

              <input
                type="text"
                value={assigneeInput}
                onChange={e => setAssigneeInput(e.target.value)}
                placeholder="Tên cán bộ thực hiện..."
                className="text-xs bg-white border border-slate-300 rounded px-3 py-1.5 flex-1 min-w-[200px]"
              />

              <button
                onClick={handleUpdateAssignee}
                className="px-3 py-1.5 text-xs bg-slate-800 text-white rounded hover:bg-slate-900"
              >
                Lưu phân công
              </button>
            </div>
          </div>

          {/* Audit History & Activity Logs */}
          <div>
            <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
              Nhật ký xử lý & Lịch sử kiểm toán
            </h4>
            <div className="border border-slate-200 rounded divide-y divide-slate-100 max-h-48 overflow-y-auto">
              {task.history.map((h, idx) => (
                <div key={idx} className="p-2.5 text-xs flex items-start justify-between gap-3">
                  <div>
                    <span className="font-semibold text-slate-800">{h.action}</span>
                    <span className="text-slate-400 mx-1.5">bởi</span>
                    <span className="text-slate-700 font-medium">{h.actor}</span>
                    {h.comment && <p className="text-slate-600 mt-0.5">{h.comment}</p>}
                  </div>
                  <span className="text-slate-400 font-mono text-xs whitespace-nowrap">{h.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Comment input form */}
            <form onSubmit={handleSendComment} className="mt-2 flex items-center gap-2">
              <input
                type="text"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Thêm ghi chú xử lý hoặc phản hồi..."
                className="flex-1 text-xs border border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-slate-500"
              />
              <button
                type="submit"
                className="p-1.5 text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
                title="Gửi ghi chú"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500">Chuyển trạng thái:</span>
            {task.status !== 'in_progress' && (
              <button
                onClick={() => updateTaskStatus(task.id, 'in_progress', 'Cán bộ bắt đầu thực hiện')}
                className="px-2.5 py-1 text-xs border border-blue-300 text-blue-700 hover:bg-blue-50 rounded"
              >
                Đang làm
              </button>
            )}
            {task.status !== 'approval_required' && (
              <button
                onClick={() => updateTaskStatus(task.id, 'approval_required', 'Chuyển cấp thẩm quyền phê duyệt')}
                className="px-2.5 py-1 text-xs border border-amber-300 text-amber-700 hover:bg-amber-50 rounded"
              >
                Trình duyệt
              </button>
            )}
            {task.status !== 'completed' && (
              <button
                onClick={() => {
                  updateTaskStatus(task.id, 'completed', 'Nhiệm vụ đã hoàn tất chuẩn chỉ');
                  onClose();
                }}
                className="px-3 py-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded"
              >
                Hoàn thành
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs text-slate-700 hover:text-slate-900 border border-slate-300 rounded hover:bg-slate-100"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
