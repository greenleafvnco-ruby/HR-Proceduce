import React, { useState } from 'react';
import { useSop } from '../../context/SopContext';
import { SopDefinition } from '../../types/sop';
import { SopDetailModal } from '../SopLibrary/SopDetailModal';
import { Grid3X3, Filter, ArrowRight } from 'lucide-react';

interface RaciMatrixViewProps {
  onOpenForm: (formCode: string) => void;
  onTriggerStep: (sop: SopDefinition, step: any) => void;
}

export const RaciMatrixView: React.FC<RaciMatrixViewProps> = ({ onOpenForm, onTriggerStep }) => {
  const { sops } = useSop();
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedSop, setSelectedSop] = useState<SopDefinition | null>(null);

  const getRaciBadge = (val: 'R' | 'A' | 'C' | 'I') => {
    switch (val) {
      case 'R':
        return <span className="inline-block w-7 py-0.5 bg-blue-100 border border-blue-300 text-blue-800 font-bold font-mono rounded text-center">R</span>;
      case 'A':
        return <span className="inline-block w-7 py-0.5 bg-purple-100 border border-purple-300 text-purple-800 font-bold font-mono rounded text-center">A</span>;
      case 'C':
        return <span className="inline-block w-7 py-0.5 bg-amber-100 border border-amber-300 text-amber-800 font-bold font-mono rounded text-center">C</span>;
      case 'I':
        return <span className="inline-block w-7 py-0.5 bg-slate-100 border border-slate-300 text-slate-700 font-bold font-mono rounded text-center">I</span>;
    }
  };

  const filteredSops = sops.filter(sop => {
    if (selectedRole === 'ALL') return true;
    if (selectedRole === 'HR') return sop.raci.hr === 'R' || sop.raci.hr === 'A';
    if (selectedRole === 'QL') return sop.raci.ql === 'R' || sop.raci.ql === 'A';
    if (selectedRole === 'DD') return sop.raci.dd === 'R' || sop.raci.dd === 'A';
    if (selectedRole === 'AT') return sop.raci.at === 'R' || sop.raci.at === 'A';
    if (selectedRole === 'KT') return sop.raci.kt === 'R' || sop.raci.kt === 'A';
    if (selectedRole === 'BGD') return sop.raci.bgd === 'R' || sop.raci.bgd === 'A';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white border border-slate-200 rounded p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <span className="font-bold text-slate-900">Mục A4 Tài liệu</span>
            <span>·</span>
            <span>Ma trận Trách nhiệm RACI Toàn Diện</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            Ma Trận Trách Nhiệm Phân Quyền (RACI Matrix)
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            R = Responsible (Thực hiện trực tiếp); A = Accountable (Chịu trách nhiệm & Phê duyệt cuối cùng);
            C = Consulted (Được tham vấn); I = Informed (Được thông tin). Đảm bảo không chồng chéo trách nhiệm giữa
            Nhân sự, Điều độ và An toàn.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1">
            <span className="w-5 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-center text-[10px]">R</span>
            <span className="text-slate-600">Thực hiện</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-5 py-0.5 bg-purple-100 text-purple-800 font-bold rounded text-center text-[10px]">A</span>
            <span className="text-slate-600">Phê duyệt</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-5 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-center text-[10px]">C</span>
            <span className="text-slate-600">Tham vấn</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-5 py-0.5 bg-slate-100 text-slate-700 font-bold rounded text-center text-[10px]">I</span>
            <span className="text-slate-600">Thông tin</span>
          </div>
        </div>
      </div>

      {/* Role Filter Bar */}
      <div className="bg-white border border-slate-200 rounded p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-700">Lọc quy trình theo vai trò then chốt (R / A):</span>
        <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-0.5 rounded">
          <button
            onClick={() => setSelectedRole('ALL')}
            className={`px-3 py-1 rounded transition-colors ${
              selectedRole === 'ALL' ? 'bg-white text-slate-900 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả 16 SOP
          </button>
          <button
            onClick={() => setSelectedRole('HR')}
            className={`px-3 py-1 rounded transition-colors ${
              selectedRole === 'HR' ? 'bg-white text-blue-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            HR (Nhân sự)
          </button>
          <button
            onClick={() => setSelectedRole('QL')}
            className={`px-3 py-1 rounded transition-colors ${
              selectedRole === 'QL' ? 'bg-white text-blue-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            QL (Quản lý / Đội trưởng)
          </button>
          <button
            onClick={() => setSelectedRole('DD')}
            className={`px-3 py-1 rounded transition-colors ${
              selectedRole === 'DD' ? 'bg-white text-blue-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ĐĐ (Điều độ)
          </button>
          <button
            onClick={() => setSelectedRole('AT')}
            className={`px-3 py-1 rounded transition-colors ${
              selectedRole === 'AT' ? 'bg-white text-blue-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AT (An toàn)
          </button>
          <button
            onClick={() => setSelectedRole('KT')}
            className={`px-3 py-1 rounded transition-colors ${
              selectedRole === 'KT' ? 'bg-white text-blue-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            KT (Kế toán)
          </button>
          <button
            onClick={() => setSelectedRole('BGD')}
            className={`px-3 py-1 rounded transition-colors ${
              selectedRole === 'BGD' ? 'bg-white text-purple-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            BGĐ (Ban Giám đốc)
          </button>
        </div>
      </div>

      {/* RACI Matrix Table */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold font-mono">
              <th className="py-3 px-4 w-32">Mã SOP</th>
              <th className="py-3 px-4">Tên quy trình chuẩn</th>
              <th className="py-3 px-4 text-center w-16">HR</th>
              <th className="py-3 px-4 text-center w-16">QL</th>
              <th className="py-3 px-4 text-center w-16">ĐĐ</th>
              <th className="py-3 px-4 text-center w-16">AT</th>
              <th className="py-3 px-4 text-center w-16">KT</th>
              <th className="py-3 px-4 text-center w-16">BGĐ</th>
              <th className="py-3 px-4 text-right w-24">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSops.map(sop => (
              <tr key={sop.code} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-slate-900">
                  {sop.code}
                </td>
                <td className="py-3 px-4">
                  <span
                    onClick={() => setSelectedSop(sop)}
                    className="font-medium text-slate-900 hover:text-blue-700 cursor-pointer"
                  >
                    {sop.title}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                    {sop.department} · {sop.targetAudience}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">{getRaciBadge(sop.raci.hr)}</td>
                <td className="py-3 px-4 text-center">{getRaciBadge(sop.raci.ql)}</td>
                <td className="py-3 px-4 text-center">{getRaciBadge(sop.raci.dd)}</td>
                <td className="py-3 px-4 text-center">{getRaciBadge(sop.raci.at)}</td>
                <td className="py-3 px-4 text-center">{getRaciBadge(sop.raci.kt)}</td>
                <td className="py-3 px-4 text-center">{getRaciBadge(sop.raci.bgd)}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setSelectedSop(sop)}
                    className="px-2 py-1 text-[11px] border border-slate-300 rounded text-slate-700 hover:bg-slate-100"
                  >
                    Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSop && (
        <SopDetailModal
          sop={selectedSop}
          onClose={() => setSelectedSop(null)}
          onOpenForm={onOpenForm}
          onTriggerStep={onTriggerStep}
        />
      )}
    </div>
  );
};
