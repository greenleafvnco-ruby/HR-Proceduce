import React, { useState } from 'react';
import { useSop } from '../../context/SopContext';
import { SOP_LIST, FORM_TEMPLATES } from '../../data/sopMasterData';
import { RoleKey, TaskPriority } from '../../types/sop';
import { X, Plus, Sparkles } from 'lucide-react';

interface CreateTaskModalProps {
  onClose: () => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose }) => {
  const { createTask, currentRole } = useSop();

  const [selectedSopCode, setSelectedSopCode] = useState('HR-SOP-01');
  const [selectedStepNumber, setSelectedStepNumber] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [staffType, setStaffType] = useState<'driver' | 'office'>('driver');
  const [relatedStaffName, setRelatedStaffName] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('normal');
  const [slaHours, setSlaHours] = useState(24);
  const [relatedFormCode, setRelatedFormCode] = useState('');

  const currentSop = SOP_LIST.find(s => s.code === selectedSopCode);
  const steps = currentSop?.steps || [];
  const currentStep = steps.find(s => s.stepNumber === selectedStepNumber);

  // Auto populate title when step changes
  const handleStepChange = (stepNum: number) => {
    setSelectedStepNumber(stepNum);
    const st = steps.find(s => s.stepNumber === stepNum);
    if (st) {
      setTitle(`${st.title}`);
      setDescription(st.description);
      if (st.outputFormCode) {
        setRelatedFormCode(st.outputFormCode);
      }
    }
  };

  const handleSopChange = (code: string) => {
    setSelectedSopCode(code);
    setSelectedStepNumber(1);
    const newSop = SOP_LIST.find(s => s.code === code);
    if (newSop && newSop.steps.length > 0) {
      setTitle(`${newSop.steps[0].title}`);
      setDescription(newSop.steps[0].description);
      if (newSop.steps[0].outputFormCode) {
        setRelatedFormCode(newSop.steps[0].outputFormCode);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createTask({
      sopCode: selectedSopCode,
      sopTitle: currentSop?.title || '',
      stepNumber: selectedStepNumber,
      stepTitle: currentStep?.title || '',
      title: title.trim(),
      description: description.trim(),
      assignedRole: currentStep?.assignedRole || 'HR',
      assigneeName: `Cán bộ ${currentStep?.assignedRole || 'HR'}`,
      relatedStaffName: relatedStaffName.trim() || undefined,
      staffType,
      vehiclePlate: vehiclePlate.trim() || undefined,
      priority,
      slaRemainingMinutes: slaHours * 60,
      relatedFormCode: relatedFormCode || undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-slate-900 text-white flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">Khởi tạo Nhiệm vụ Quy trình SOP</h3>
              <p className="text-xs text-slate-500">Tự động gắn kết với 16 Quy chuẩn SOP & Khung giờ SLA</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {/* Select SOP */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Chọn Quy trình chuẩn (HR-SOP)
            </label>
            <select
              value={selectedSopCode}
              onChange={e => handleSopChange(e.target.value)}
              className="w-full border border-slate-300 rounded p-2 text-xs bg-white focus:outline-none focus:border-slate-500 font-mono"
            >
              {SOP_LIST.map(sop => (
                <option key={sop.code} value={sop.code}>
                  {sop.code} - {sop.title} ({sop.targetAudience})
                </option>
              ))}
            </select>
          </div>

          {/* Select Step */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Chọn Bước thực hiện (SLA & RACI quy định)
            </label>
            <select
              value={selectedStepNumber}
              onChange={e => handleStepChange(Number(e.target.value))}
              className="w-full border border-slate-300 rounded p-2 text-xs bg-white focus:outline-none focus:border-slate-500"
            >
              {steps.map(st => (
                <option key={st.stepNumber} value={st.stepNumber}>
                  Bước {st.stepNumber}: {st.title} (Phụ trách: {st.assignedRole} · SLA: {st.sla})
                </option>
              ))}
            </select>
          </div>

          {/* Title & Description */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Tiêu đề nhiệm vụ cụ thể</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full border border-slate-300 rounded p-2 text-xs focus:outline-none focus:border-slate-500"
              placeholder="VD: Kiểm tra sát hạch lái thử xe đầu kéo cho ứng viên..."
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">Mô tả chi tiết / Ghi chú chỉ đạo</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full border border-slate-300 rounded p-2 text-xs focus:outline-none focus:border-slate-500"
              placeholder="Nội dung cần thực hiện, tiêu chí bàn giao..."
            />
          </div>

          {/* Context Target */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Đối tượng nhân sự</label>
              <select
                value={staffType}
                onChange={e => setStaffType(e.target.value as 'driver' | 'office')}
                className="w-full border border-slate-300 rounded p-2 text-xs bg-white"
              >
                <option value="driver">Khối tài xế (400 người)</option>
                <option value="office">Khối văn phòng (100 người)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Họ tên nhân viên / Ứng viên</label>
              <input
                type="text"
                value={relatedStaffName}
                onChange={e => setRelatedStaffName(e.target.value)}
                placeholder="VD: Nguyễn Văn A..."
                className="w-full border border-slate-300 rounded p-2 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Biển số xe (nếu có)</label>
              <input
                type="text"
                value={vehiclePlate}
                onChange={e => setVehiclePlate(e.target.value)}
                placeholder="VD: 51C-892.41..."
                className="w-full border border-slate-300 rounded p-2 text-xs font-mono uppercase"
              />
            </div>
          </div>

          {/* Priority & SLA */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Mức độ ưu tiên</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as TaskPriority)}
                className="w-full border border-slate-300 rounded p-2 text-xs bg-white"
              >
                <option value="urgent">Khẩn cấp (Sự cố / Báo động)</option>
                <option value="high">Ưu tiên cao</option>
                <option value="normal">Bình thường</option>
                <option value="low">Thấp</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Thời hạn xử lý (Giờ)</label>
              <input
                type="number"
                min={1}
                value={slaHours}
                onChange={e => setSlaHours(Number(e.target.value))}
                className="w-full border border-slate-300 rounded p-2 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Biểu mẫu đính kèm</label>
              <select
                value={relatedFormCode}
                onChange={e => setRelatedFormCode(e.target.value)}
                className="w-full border border-slate-300 rounded p-2 text-xs bg-white font-mono"
              >
                <option value="">-- Không đính kèm --</option>
                {FORM_TEMPLATES.map(f => (
                  <option key={f.code} value={f.code}>
                    {f.code} - {f.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-700 border border-slate-300 rounded hover:bg-slate-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800"
            >
              Tạo và phân công nhiệm vụ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
