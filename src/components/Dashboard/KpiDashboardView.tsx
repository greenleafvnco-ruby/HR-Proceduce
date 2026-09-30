import React, { useState } from 'react';
import { ANNUAL_EVENTS, ROADMAP_90_DAYS, LEGAL_REFERENCES } from '../../data/sopMasterData';
import { BarChart3, Calendar, Compass, BookOpen, CheckCircle2, AlertCircle, Shield } from 'lucide-react';

export const KpiDashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kpis' | 'calendar' | 'roadmap' | 'legal'>('kpis');

  // KPI data from Appendix A
  const kpiData = [
    {
      group: 'Tuyển dụng',
      metrics: [
        { name: 'Thời gian tuyển khối văn phòng', current: '24 ngày', target: '≤ 30 ngày', status: 'pass' },
        { name: 'Thời gian tuyển khối tài xế', current: '7 ngày', target: '≤ 10 ngày', status: 'pass' },
        { name: 'Tỷ lệ chấp nhận offer', current: '84.2%', target: '≥ 80%', status: 'pass' },
        { name: 'Tỷ lệ tuyển từ giới thiệu nội bộ (tài xế)', current: '36.5%', target: '≥ 30%', status: 'pass' }
      ]
    },
    {
      group: 'Giữ chân nhân sự',
      metrics: [
        { name: 'Tỷ lệ nghỉ việc năm khối tài xế', current: '21.4%', target: '≤ 25%', status: 'pass' },
        { name: 'Tỷ lệ nghỉ việc năm khối văn phòng', current: '9.8%', target: '≤ 12%', status: 'pass' },
        { name: 'Tỷ lệ nghỉ việc trong 90 ngày đầu (tài xế)', current: '16.2%', target: '≤ 20%', status: 'pass' }
      ]
    },
    {
      group: 'An toàn giao thông & Cabin',
      metrics: [
        { name: 'Số vụ tai nạn nghiêm trọng / triệu km', current: '0 vụ', target: 'Giảm dần (Mục tiêu 0)', status: 'pass' },
        { name: 'Vi phạm nồng độ cồn / ma túy', current: '0 ca', target: '0 tuyệt đối', status: 'pass' },
        { name: 'Vi phạm thời gian lái xe (4/10/48h)', current: '0 vi phạm', target: '0 tuyệt đối', status: 'pass' },
        { name: 'Tỷ lệ cảnh báo ngủ gật xử lý trong 24h', current: '97.4%', target: '≥ 95%', status: 'pass' }
      ]
    },
    {
      group: 'Vận hành nhân sự & C&B',
      metrics: [
        { name: 'Chốt bảng công đúng hạn (ngày 25)', current: '100%', target: '100%', status: 'pass' },
        { name: 'Chi trả lương đúng hạn (ngày 5)', current: '100%', target: '100%', status: 'pass' },
        { name: 'Tỷ lệ sai sót bảng lương', current: '0.2%', target: '≤ 0.5%', status: 'pass' }
      ]
    },
    {
      group: 'Tuân thủ pháp luật & Hồ sơ',
      metrics: [
        { name: 'Hồ sơ nhân sự đầy đủ danh mục chuẩn', current: '99.1%', target: '≥ 98%', status: 'pass' },
        { name: 'Tài xế giấy tờ hết hạn mà vẫn điều xe', current: '0 trường hợp', target: '0 tuyệt đối', status: 'pass' },
        { name: 'Đăng ký đóng BHXH đúng hạn 30 ngày', current: '100%', target: '100%', status: 'pass' }
      ]
    },
    {
      group: 'Quan hệ lao động & Đào tạo',
      metrics: [
        { name: 'Khiếu nại giải quyết đúng hạn (≤10 ngày)', current: '96.2%', target: '≥ 95%', status: 'pass' },
        { name: 'Điểm mức độ gắn kết nhân viên (eNPS)', current: '4.1 / 5', target: '≥ 3.8 / 5', status: 'pass' },
        { name: 'Tài xế hoàn thành đào tạo an toàn bắt buộc', current: '100%', target: '100%', status: 'pass' },
        { name: 'Giờ đào tạo bình quân tài xế / năm', current: '18.5 giờ', target: '≥ 16 giờ', status: 'pass' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span className="font-bold text-slate-900">Phần D Phụ lục</span>
            <span>·</span>
            <span>HR-SOP-MASTER</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            Chỉ Số KPI, Lịch Thường Niên & Lộ Trình 90 Ngày
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            Bộ công cụ quản trị chiến lược: Giám sát đo lường các chỉ số mục tiêu cốt lõi của Phòng Nhân sự,
            lịch hoạt động định kỳ hàng tháng/quý và tiến độ triển khai thực tế.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded text-xs font-semibold text-slate-700">
          <button
            onClick={() => setActiveTab('kpis')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 ${
              activeTab === 'kpis' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Phụ lục A: KPI</span>
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 ${
              activeTab === 'calendar' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Phụ lục B: Lịch năm</span>
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 ${
              activeTab === 'roadmap' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Phụ lục C: Lộ trình 90d</span>
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1 ${
              activeTab === 'legal' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Phụ lục D: Pháp luật</span>
          </button>
        </div>
      </div>

      {/* Tab 1: KPI Dashboard */}
      {activeTab === 'kpis' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiData.map(group => (
            <div key={group.group} className="bg-white border border-slate-200 rounded p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono border-b border-slate-100 pb-2">
                {group.group}
              </h3>
              <div className="space-y-2.5">
                {group.metrics.map(metric => (
                  <div key={metric.name} className="text-xs">
                    <span className="text-slate-600 block mb-0.5">{metric.name}</span>
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-bold text-slate-900 text-sm">{metric.current}</span>
                      <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-medium">
                        Mục tiêu: {metric.target}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Annual Calendar */}
      {activeTab === 'calendar' && (
        <div className="bg-white border border-slate-200 rounded overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold font-mono">
                <th className="py-2.5 px-4 w-36">Thời điểm</th>
                <th className="py-2.5 px-4">Hoạt động trọng tâm</th>
                <th className="py-2.5 px-4 w-48">Quy trình tham chiếu</th>
                <th className="py-2.5 px-4 w-32">Kỳ theo dõi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ANNUAL_EVENTS.map((event, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900 font-mono">{event.period}</td>
                  <td className="py-3 px-4 text-slate-700 leading-relaxed">{event.activity}</td>
                  <td className="py-3 px-4 font-mono text-blue-700">
                    {event.sopCodes.join(', ')}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{event.quarter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: 90 Days Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="space-y-4">
          {ROADMAP_90_DAYS.map((stage, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded p-4.5">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    stage.completed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-mono">
                    {stage.stage}: {stage.days}
                  </h3>
                </div>

                <span className={`text-xs font-mono px-2 py-0.5 rounded border font-medium ${
                  stage.completed ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-100 border-slate-300 text-slate-700'
                }`}>
                  {stage.completed ? 'Đã hoàn thành' : 'Đang triển khai'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 block mb-1 font-mono">Công việc thực hiện:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600">
                    {stage.tasks.map((task, tIdx) => (
                      <li key={tIdx}>{task}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="font-semibold text-slate-700 block mb-1 font-mono">Đầu ra / Kết quả bàn giao:</span>
                  <strong className="text-slate-900">{stage.deliverable}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Legal Framework */}
      {activeTab === 'legal' && (
        <div className="space-y-4">
          {LEGAL_REFERENCES.map((legal, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded p-4 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded">
                  {legal.field}
                </span>
              </div>
              <h4 className="font-semibold text-blue-900 leading-snug">{legal.document}</h4>
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">
                <strong>Điểm then chốt thực thi:</strong> {legal.keyPoints}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
