import React, { useState } from 'react';
import { useSop } from '../../context/SopContext';
import { FormTemplate } from '../../types/sop';
import { X, CheckCircle, Printer, Send, AlertTriangle, ShieldCheck } from 'lucide-react';

interface FormModalRendererProps {
  formTemplate: FormTemplate;
  onClose: () => void;
  onSuccessTaskCreated?: (taskCode: string) => void;
}

export const FormModalRenderer: React.FC<FormModalRendererProps> = ({
  formTemplate,
  onClose,
  onSuccessTaskCreated
}) => {
  const { submitForm } = useSop();

  // Common State
  const [staffName, setStaffName] = useState('');
  const [staffCode, setStaffCode] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [department, setDepartment] = useState('Đội xe Vận tải');
  const [notes, setNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [createdTaskCode, setCreatedTaskCode] = useState('');

  // HR-F03 (Kiểm tra đầu vào tài xế) State
  const [f03TheoryScore, setF03TheoryScore] = useState(85);
  const [f03AlcoholPass, setF03AlcoholPass] = useState(true);
  const [f03DrugPass, setF03DrugPass] = useState(true);
  const [f03PreCheck, setF03PreCheck] = useState(4); // 1-5
  const [f03SpeedControl, setF03SpeedControl] = useState(4);
  const [f03Parking, setF03Parking] = useState(4);
  const [f03Defensive, setF03Defensive] = useState(4);
  const [f03SafetyRules, setF03SafetyRules] = useState(5);
  const [f03Result, setF03Result] = useState<'pass' | 'conditional' | 'fail'>('pass');

  // HR-F09 (Làm thêm giờ) State
  const [f09Hours, setF09Hours] = useState(2);
  const [f09MonthlyHours, setF09MonthlyHours] = useState(18);
  const [f09Agreed, setF09Agreed] = useState(true);

  // HR-F14 (Khiếu nại / Phản ánh) State
  const [f14Anonymous, setF14Anonymous] = useState(false);
  const [f14Category, setF14Category] = useState('Lương, thưởng, phụ cấp chuyến');

  // HR-F17 (Đánh giá tài xế) State
  const [f17Safety, setF17Safety] = useState(5); // 30%
  const [f17Punctuality, setF17Punctuality] = useState(4); // 20%
  const [f17Fuel, setF17Fuel] = useState(4); // 15%
  const [f17Cargo, setF17Cargo] = useState(5); // 15%
  const [f17Compliance, setF17Compliance] = useState(4); // 10%
  const [f17Attendance, setF17Attendance] = useState(5); // 10%

  // Calculate HR-F17 weighted score
  const f17TotalScore = Math.round(
    (f17Safety * 20 * 0.3) +
    (f17Punctuality * 20 * 0.2) +
    (f17Fuel * 20 * 0.15) +
    (f17Cargo * 20 * 0.15) +
    (f17Compliance * 20 * 0.1) +
    (f17Attendance * 20 * 0.1)
  );

  const getF17Rank = (score: number) => {
    if (score >= 90) return { rank: 'A (Xuất sắc)', color: 'text-emerald-700' };
    if (score >= 80) return { rank: 'B (Khá / Tốt)', color: 'text-blue-700' };
    if (score >= 65) return { rank: 'C (Đạt yêu cầu)', color: 'text-amber-700' };
    return { rank: 'D (Cần cải thiện)', color: 'text-rose-700' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: Record<string, any> = {
      staffName: f14Anonymous ? 'Ẩn danh (Qua QR bãi xe)' : staffName,
      staffCode,
      vehiclePlate,
      department,
      notes,
      timestamp: new Date().toISOString()
    };

    if (formTemplate.code === 'HR-F03') {
      formData.f03TheoryScore = f03TheoryScore;
      formData.f03AlcoholPass = f03AlcoholPass;
      formData.f03DrugPass = f03DrugPass;
      formData.f03Result = f03Result;
    }

    if (formTemplate.code === 'HR-F09') {
      formData.f09Hours = f09Hours;
      formData.f09MonthlyHours = f09MonthlyHours;
      formData.f09Agreed = f09Agreed;
    }

    if (formTemplate.code === 'HR-F17') {
      formData.f17TotalScore = f17TotalScore;
      formData.rank = getF17Rank(f17TotalScore).rank;
    }

    const newTask = submitForm(
      formTemplate.code,
      formData,
      f14Anonymous ? 'Ẩn danh (QR bãi xe)' : staffName || undefined,
      vehiclePlate || undefined
    );

    setCreatedTaskCode(newTask.taskCode);
    setSubmittedSuccess(true);
    if (onSuccessTaskCreated) onSuccessTaskCreated(newTask.taskCode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <span className="font-bold text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded">
                {formTemplate.code}
              </span>
              <span>·</span>
              <span>Thuộc quy trình {formTemplate.sopCode}</span>
              <span>·</span>
              <span>Hệ thống điện tử</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">{formTemplate.title}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Banner */}
        {submittedSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Đã nộp biểu mẫu & tự động sinh nhiệm vụ SOP!
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Dữ liệu biểu mẫu <strong>{formTemplate.code}</strong> đã được xác thực thành công.
              Nhiệm vụ kiểm soát tiến độ thời gian thực <strong className="font-mono text-slate-900">{createdTaskCode}</strong> đã được đưa vào luồng SLA.
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800"
              >
                Đóng và xem tiến độ nhiệm vụ
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
            {/* Header info */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-700 text-xs">
              <p><strong>Mục đích:</strong> {formTemplate.description}</p>
            </div>

            {/* Specific Form Fields based on Template Code */}
            {formTemplate.code === 'HR-F03' && (
              /* HR-F03: Kiểm tra đầu vào tài xế */
              <div className="space-y-4 border border-slate-200 rounded p-4">
                <h4 className="font-bold text-slate-900 font-mono uppercase text-xs">
                  Sát hạch lý thuyết & Thực hành lái thử 45 phút
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Điểm thi lý thuyết luật giao thông (/100)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={f03TheoryScore}
                      onChange={e => setF03TheoryScore(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded p-2 text-xs font-mono"
                    />
                    <span className="text-[10px] text-slate-500 font-mono">Quy định: Đạt từ 80 điểm trở lên</span>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Kiểm tra cồn & ma túy</label>
                    <div className="space-y-1 pt-1">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={f03AlcoholPass}
                          onChange={e => setF03AlcoholPass(e.target.checked)}
                          className="rounded text-blue-600"
                        />
                        <span>Âm tính nồng độ cồn</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={f03DrugPass}
                          onChange={e => setF03DrugPass(e.target.checked)}
                          className="rounded text-blue-600"
                        />
                        <span>Âm tính ma túy đa chất</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <span className="font-semibold block mb-2">Chấm điểm thực hành lái xe 45 phút (Thang điểm 1-5):</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <span>Kiểm tra xe trước hành trình (10%)</span>
                      <select value={f03PreCheck} onChange={e => setF03PreCheck(Number(e.target.value))} className="border rounded p-1">
                        {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} điểm</option>)}
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <span>Khởi hành, cự ly, giữ làn (25%)</span>
                      <select value={f03SpeedControl} onChange={e => setF03SpeedControl(Number(e.target.value))} className="border rounded p-1">
                        {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} điểm</option>)}
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <span>Lùi, đỗ, quay đầu xe (20%)</span>
                      <select value={f03Parking} onChange={e => setF03Parking(Number(e.target.value))} className="border rounded p-1">
                        {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} điểm</option>)}
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <span>Lái xe phòng thủ, xử lý gấp (30%)</span>
                      <select value={f03Defensive} onChange={e => setF03Defensive(Number(e.target.value))} className="border rounded p-1">
                        {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} điểm</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Kết luận sát hạch</label>
                  <select
                    value={f03Result}
                    onChange={e => setF03Result(e.target.value as any)}
                    className="w-full border border-slate-300 rounded p-2 text-xs bg-white font-semibold"
                  >
                    <option value="pass">ĐẠT - Cho phép tiếp nhận & phân xe</option>
                    <option value="conditional">ĐẠT CÓ ĐIỀU KIỆN - Huấn luyện bổ túc trước khi giao xe</option>
                    <option value="fail">KHÔNG ĐẠT - Không tuyển dụng</option>
                  </select>
                </div>
              </div>
            )}

            {formTemplate.code === 'HR-F09' && (
              /* HR-F09: Phiếu đăng ký làm thêm giờ */
              <div className="space-y-3 border border-slate-200 rounded p-4 bg-slate-50">
                <h4 className="font-bold text-slate-900 font-mono uppercase text-xs">
                  Kiểm soát giới hạn pháp luật (Điều 107 BLLĐ & NĐ 283/2026)
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Số giờ làm thêm dự kiến (hôm nay)</label>
                    <input
                      type="number"
                      min={0.5}
                      max={4}
                      step={0.5}
                      value={f09Hours}
                      onChange={e => setF09Hours(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded p-2 text-xs font-mono"
                    />
                    <span className="text-[10px] text-slate-500">Tối đa ≤ 50% giờ bình thường/ngày</span>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Lũy kế giờ làm thêm trong tháng (/40h)</label>
                    <input
                      type="number"
                      min={0}
                      max={40}
                      value={f09MonthlyHours}
                      onChange={e => setF09MonthlyHours(Number(e.target.value))}
                      className="w-full border border-slate-300 rounded p-2 text-xs font-mono"
                    />
                    <span className="text-[10px] text-slate-500">Giới hạn luật: ≤ 40 giờ/tháng</span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={f09Agreed}
                      onChange={e => setF09Agreed(e.target.checked)}
                      required
                      className="mt-0.5 rounded text-blue-600"
                    />
                    <span className="text-xs text-slate-800 leading-relaxed">
                      <strong>Xác nhận tự nguyện:</strong> Người lao động đồng ý làm thêm giờ theo thỏa thuận văn bản.
                      Doanh nghiệp cam kết thời gian lái xe trong ngày không vượt quá 10 giờ theo Điều 64 Luật Trật tự ATGT 2024.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {formTemplate.code === 'HR-F14' && (
              /* HR-F14: Đơn khiếu nại / phản ánh */
              <div className="space-y-3 border border-slate-200 rounded p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 font-mono uppercase text-xs">
                    Kênh phản ánh trực tiếp & Quét QR Bãi xe
                  </h4>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs text-blue-700 font-semibold">
                    <input
                      type="checkbox"
                      checked={f14Anonymous}
                      onChange={e => setF14Anonymous(e.target.checked)}
                      className="rounded"
                    />
                    <span>Gửi ẩn danh bảo mật</span>
                  </label>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Loại vấn đề phản ánh</label>
                  <select
                    value={f14Category}
                    onChange={e => setF14Category(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 text-xs bg-white"
                  >
                    <option value="Lương, thưởng, phụ cấp chuyến">Lương, thưởng, phụ cấp chuyến</option>
                    <option value="Thời giờ làm việc & giờ lái xe">Thời giờ làm việc & thời gian lái xe</option>
                    <option value="Ứng xử quản lý / Phân xe không đều">Ứng xử quản lý / Phân xe không đều</option>
                    <option value="An toàn & Điều kiện phương tiện">An toàn & Điều kiện phương tiện</option>
                    <option value="Khác">Vấn đề khác</option>
                  </select>
                </div>
              </div>
            )}

            {formTemplate.code === 'HR-F17' && (
              /* HR-F17: Phiếu đánh giá hiệu suất tài xế */
              <div className="space-y-3 border border-slate-200 rounded p-4 bg-slate-50">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 font-mono uppercase text-xs">
                    Đánh giá hiệu suất tháng khối tài xế (6 tiêu chí)
                  </h4>
                  <div className="font-mono text-xs">
                    Tổng điểm: <strong className="text-slate-900 text-sm">{f17TotalScore}/100</strong> ·{' '}
                    <span className={`font-bold ${getF17Rank(f17TotalScore).color}`}>
                      Xếp loại {getF17Rank(f17TotalScore).rank}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                    <span>An toàn & Giờ lái (30%)</span>
                    <select value={f17Safety} onChange={e => setF17Safety(Number(e.target.value))} className="border rounded p-1 font-mono">
                      {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} / 5</option>)}
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                    <span>Đúng giờ hoàn thành (20%)</span>
                    <select value={f17Punctuality} onChange={e => setF17Punctuality(Number(e.target.value))} className="border rounded p-1 font-mono">
                      {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} / 5</option>)}
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                    <span>Tiết kiệm nhiên liệu (15%)</span>
                    <select value={f17Fuel} onChange={e => setF17Fuel(Number(e.target.value))} className="border rounded p-1 font-mono">
                      {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} / 5</option>)}
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                    <span>Chất lượng hàng hóa (15%)</span>
                    <select value={f17Cargo} onChange={e => setF17Cargo(Number(e.target.value))} className="border rounded p-1 font-mono">
                      {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} / 5</option>)}
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                    <span>Tuân thủ quy trình xe (10%)</span>
                    <select value={f17Compliance} onChange={e => setF17Compliance(Number(e.target.value))} className="border rounded p-1 font-mono">
                      {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} / 5</option>)}
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                    <span>Chuyên cần & thái độ (10%)</span>
                    <select value={f17Attendance} onChange={e => setF17Attendance(Number(e.target.value))} className="border rounded p-1 font-mono">
                      {[5, 4, 3, 2, 1].map(v => <option key={v} value={v}>{v} / 5</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Identifiers */}
            {!f14Anonymous && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Họ tên nhân sự / Tài xế</label>
                  <input
                    type="text"
                    required={!f14Anonymous}
                    value={staffName}
                    onChange={e => setStaffName(e.target.value)}
                    placeholder="VD: Nguyễn Văn Hùng"
                    className="w-full border border-slate-300 rounded p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Mã nhân viên / CCCD</label>
                  <input
                    type="text"
                    value={staffCode}
                    onChange={e => setStaffCode(e.target.value)}
                    placeholder="VD: DRV-102"
                    className="w-full border border-slate-300 rounded p-2 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Biển số xe (nếu có)</label>
                  <input
                    type="text"
                    value={vehiclePlate}
                    onChange={e => setVehiclePlate(e.target.value)}
                    placeholder="VD: 51C-892.41"
                    className="w-full border border-slate-300 rounded p-2 text-xs font-mono uppercase"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block font-semibold mb-1">Nội dung chi tiết / Diễn giải sự việc</label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Nhập chi tiết thông tin, đề xuất, hiện trường..."
                className="w-full border border-slate-300 rounded p-2 text-xs"
              />
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Tự động khởi tạo nhiệm vụ SOP & đếm ngược SLA
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 border border-slate-300 rounded text-slate-700 hover:bg-slate-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Xác nhận nộp & Lưu vết</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
