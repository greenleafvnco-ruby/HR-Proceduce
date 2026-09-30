import React from 'react';
import { useSop } from '../context/SopContext';
import { RoleKey } from '../types/sop';
import { ShieldCheck, Plus, Clock, AlertTriangle, Cpu } from 'lucide-react';

interface HeaderProps {
  onOpenCreateTask: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCreateTask }) => {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    setCurrentRole,
    urgentCount,
    breachedCount,
    driverAlertCount
  } = useSop();

  const roles: { key: RoleKey | 'ALL'; label: string }[] = [
    { key: 'ALL', label: 'Toàn quyền (Tất cả)' },
    { key: 'HR', label: 'Phòng Nhân sự' },
    { key: 'ĐĐ', label: 'Bộ phận Điều độ' },
    { key: 'AT', label: 'Bộ phận An toàn' },
    { key: 'QL', label: 'Quản lý / Đội trưởng' },
    { key: 'KT', label: 'Kế toán' },
    { key: 'BGĐ', label: 'Ban Giám đốc' },
    { key: 'Tài xế', label: 'Giao diện Tài xế' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Top Bar 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-wider">
            SOP
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 leading-tight">
              HR-SOP Vận Tải
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Quy mô 500 NS · 400 Tài xế / 100 VP
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`transition-colors relative py-1 ${
              activeTab === 'tasks' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Tiến độ nhiệm vụ
            {urgentCount > 0 && (
              <span className="ml-1.5 text-xs text-rose-600 font-mono font-semibold">
                ({urgentCount})
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('sops')}
            className={`transition-colors py-1 ${
              activeTab === 'sops' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            16 Quy trình SOP
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`transition-colors py-1 ${
              activeTab === 'safety' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Giám sát 4/10/48h
            {driverAlertCount > 0 && (
              <span className="ml-1.5 text-xs text-amber-600 font-mono font-semibold">
                ({driverAlertCount})
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('forms')}
            className={`transition-colors py-1 ${
              activeTab === 'forms' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            19 Biểu mẫu & Phiếu
          </button>

          <button
            onClick={() => setActiveTab('automation')}
            className={`transition-colors py-1 ${
              activeTab === 'automation' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Tự động hóa
          </button>

          <button
            onClick={() => setActiveTab('kpis')}
            className={`transition-colors py-1 ${
              activeTab === 'kpis' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            KPI & Lộ trình
          </button>

          <button
            onClick={() => setActiveTab('raci')}
            className={`transition-colors py-1 ${
              activeTab === 'raci' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Ma trận RACI
          </button>
        </nav>

        {/* Zone 3: Primary Actions & Role Selector */}
        <div className="flex items-center gap-3">
          {/* Role perspective selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5">
            <span className="text-slate-400">Góc nhìn:</span>
            <select
              value={currentRole}
              onChange={e => setCurrentRole(e.target.value as RoleKey | 'ALL')}
              className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
            >
              {roles.map(r => (
                <option key={r.key} value={r.key}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* New Task Button */}
          <button
            onClick={onOpenCreateTask}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800 transition-colors whitespace-nowrap shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Khởi tạo SOP</span>
          </button>
        </div>
      </div>

      {/* Sub-bar for mobile & quick operational ticker */}
      <div className="border-t border-slate-100 bg-slate-50/80 px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
        <div className="flex items-center gap-4 overflow-x-auto py-0.5">
          <span className="font-semibold text-slate-700">Tình trạng thời gian thực:</span>
          <span className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            SLA Tuân thủ 100%
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 font-mono">
            <AlertTriangle className={`w-3.5 h-3.5 ${breachedCount > 0 ? 'text-rose-600' : 'text-slate-400'}`} />
            Quá hạn SLA: <strong className="text-slate-900">{breachedCount}</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Giờ lái 4/10/48h: <strong className="text-slate-900">Ổn định</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 font-mono">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            Quy tắc tự động: <strong className="text-slate-900">7 Active</strong>
          </span>
        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto w-full pt-1 border-t border-slate-200">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'tasks' ? 'font-bold text-slate-900' : 'text-slate-600'}`}
          >
            Nhiệm vụ ({urgentCount})
          </button>
          <button
            onClick={() => setActiveTab('sops')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'sops' ? 'font-bold text-slate-900' : 'text-slate-600'}`}
          >
            16 SOP
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'safety' ? 'font-bold text-slate-900' : 'text-slate-600'}`}
          >
            An toàn
          </button>
          <button
            onClick={() => setActiveTab('forms')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'forms' ? 'font-bold text-slate-900' : 'text-slate-600'}`}
          >
            Biểu mẫu
          </button>
          <button
            onClick={() => setActiveTab('automation')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'automation' ? 'font-bold text-slate-900' : 'text-slate-600'}`}
          >
            Tự động
          </button>
          <button
            onClick={() => setActiveTab('kpis')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'kpis' ? 'font-bold text-slate-900' : 'text-slate-600'}`}
          >
            KPIs
          </button>
          <button
            onClick={() => setActiveTab('raci')}
            className={`px-2 py-1 whitespace-nowrap ${activeTab === 'raci' ? 'font-bold text-slate-900' : 'text-slate-600'}`}
          >
            RACI
          </button>
        </div>
      </div>
    </header>
  );
};
