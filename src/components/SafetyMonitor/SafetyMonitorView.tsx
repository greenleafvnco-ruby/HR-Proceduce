import React, { useState } from 'react';
import { useSop } from '../../context/SopContext';
import { DriverTelemetry } from '../../types/sop';
import { ShieldCheck, AlertTriangle, Clock, Coffee, ShieldAlert, CheckCircle2, UserX, UserCheck, Eye, PhoneCall, RefreshCw } from 'lucide-react';

export const SafetyMonitorView: React.FC = () => {
  const {
    drivers,
    recordDriverRest,
    suspendDriverDocs,
    reinstateDriver,
    resolveFatigueAlert,
    submitAlcoholTest
  } = useSop();

  const [selectedDriver, setSelectedDriver] = useState<DriverTelemetry | null>(null);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'driving' | 'resting' | 'suspended_docs'>('ALL');
  const [testModalDriver, setTestModalDriver] = useState<DriverTelemetry | null>(null);

  const filteredDrivers = drivers.filter(d => {
    if (filterStatus !== 'ALL' && d.status !== filterStatus) return false;
    return true;
  });

  // Calculate high-risk drivers
  const nearLimitCount = drivers.filter(d => d.continuousDrivingHours >= 3.5).length;
  const expiredDocsCount = drivers.filter(d => d.status === 'suspended_docs').length;
  const unresolvedAlertsCount = drivers.reduce(
    (acc, d) => acc + d.recentFatigueAlerts.filter(a => !a.resolved).length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Law Banner */}
      <div className="bg-slate-900 text-white rounded p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <span className="text-amber-400 font-bold">HR-SOP-05 · HR-SOP-11</span>
            <span>·</span>
            <span>Điều 64 Luật Trật tự, ATGT Đường Bộ 2024</span>
            <span>·</span>
            <span>Nghị định 168/2024/NĐ-CP</span>
          </div>
          <h2 className="text-lg font-bold tracking-tight">
            Trung Tâm Giám Sát Thời Gian Lái Xe (4h / 10h / 48h) & An Toàn Cabin
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            Giám sát thời gian thực toàn bộ 400 tài xế. Tự động cảnh báo khi tài xế lái liên tục chạm ngưỡng 3.8h (trần 4h),
            trần ngày 10h, trần tuần 48h. Cảnh báo camera AI nhận diện ngủ gật, dùng điện thoại, và tự động đình chỉ điều xe
            ngay lập tức nếu GPLX hoặc Giấy khám sức khỏe hết hạn.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-800 rounded border border-slate-700 text-center font-mono">
            <span className="text-[10px] text-slate-400 block">Quy tắc vàng</span>
            <span className="text-amber-400 font-bold text-sm">4h / 10h / 48h</span>
          </div>
        </div>
      </div>

      {/* KPI & Alert Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded p-4">
          <span className="text-xs text-slate-500 font-medium block">Tài xế đang vận hành ca</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">
              {drivers.filter(d => d.status === 'driving').length}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ 400 xe</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 border-l-4 border-l-amber-500">
          <span className="text-xs text-amber-700 font-medium block flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Cận trần 4h liên tục (≥ 3.5h)
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-700">{nearLimitCount}</span>
            <span className="text-xs text-amber-600 font-mono">Cần nhắc nghỉ</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 border-l-4 border-l-rose-500">
          <span className="text-xs text-rose-700 font-medium block flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            Cảnh báo Camera AI Cabin
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-rose-700">{unresolvedAlertsCount}</span>
            <span className="text-xs text-rose-600 font-mono">Xử lý trong 24h</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 border-l-4 border-l-red-600">
          <span className="text-xs text-red-700 font-medium block flex items-center gap-1">
            <UserX className="w-3.5 h-3.5" />
            Đình chỉ do giấy tờ hết hạn
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-red-700">{expiredDocsCount}</span>
            <span className="text-xs text-slate-400 font-mono">Khóa điều xe</span>
          </div>
        </div>
      </div>

      {/* Control Segmented Bar */}
      <div className="bg-white border border-slate-200 rounded p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded text-xs">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1 rounded transition-colors ${
              filterStatus === 'ALL' ? 'bg-white text-slate-900 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả đội xe ({drivers.length})
          </button>
          <button
            onClick={() => setFilterStatus('driving')}
            className={`px-3 py-1 rounded transition-colors ${
              filterStatus === 'driving' ? 'bg-white text-blue-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đang chạy trên đường
          </button>
          <button
            onClick={() => setFilterStatus('resting')}
            className={`px-3 py-1 rounded transition-colors ${
              filterStatus === 'resting' ? 'bg-white text-emerald-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đang nghỉ ngơi / Bãi xe
          </button>
          <button
            onClick={() => setFilterStatus('suspended_docs')}
            className={`px-3 py-1 rounded transition-colors ${
              filterStatus === 'suspended_docs' ? 'bg-white text-rose-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đình chỉ điều xe ({expiredDocsCount})
          </button>
        </div>

        <span className="text-xs text-slate-500 font-mono">
          Dữ liệu định vị GPS & Camera trực tiếp
        </span>
      </div>

      {/* Live Drivers Table */}
      <div className="bg-white border border-slate-200 rounded overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold font-mono">
              <th className="py-2.5 px-3">Tài xế & Loại xe</th>
              <th className="py-2.5 px-3">Tuyến đường</th>
              <th className="py-2.5 px-3">Lái liên tục (Trần 4h)</th>
              <th className="py-2.5 px-3">Lái trong ngày (Trần 10h)</th>
              <th className="py-2.5 px-3">Tuần (Trần 48h)</th>
              <th className="py-2.5 px-3">Hạn GPLX & Khám SK</th>
              <th className="py-2.5 px-3">Test Cồn/Ma túy</th>
              <th className="py-2.5 px-3">Camera Cabin</th>
              <th className="py-2.5 px-3 text-right">Thao tác can thiệp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredDrivers.map(driver => {
              const isContinuousWarning = driver.continuousDrivingHours >= 3.5;
              const isContinuousBreached = driver.continuousDrivingHours >= 4.0;
              const isDailyWarning = driver.dailyDrivingHours >= 9.0;
              const isWeeklyWarning = driver.weeklyDrivingHours >= 45.0;

              return (
                <tr key={driver.driverId} className="hover:bg-slate-50 transition-colors">
                  {/* Driver & Vehicle */}
                  <td className="py-3 px-3">
                    <strong className="text-slate-900 block">{driver.driverName}</strong>
                    <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1 mt-0.5">
                      <span className="font-semibold text-slate-800">{driver.driverCode}</span>
                      <span>·</span>
                      <span className="font-bold text-slate-900">{driver.vehiclePlate}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">{driver.vehicleType}</span>
                  </td>

                  {/* Route */}
                  <td className="py-3 px-3 text-slate-700 font-mono text-[11px]">
                    {driver.route}
                  </td>

                  {/* Continuous Driving Hours */}
                  <td className="py-3 px-3 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-bold ${
                          isContinuousBreached
                            ? 'text-red-700'
                            : isContinuousWarning
                            ? 'text-amber-700'
                            : 'text-slate-800'
                        }`}
                      >
                        {driver.continuousDrivingHours.toFixed(1)}h / 4.0h
                      </span>
                    </div>
                    <div className="w-24 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          isContinuousBreached
                            ? 'bg-red-600'
                            : isContinuousWarning
                            ? 'bg-amber-500'
                            : 'bg-blue-600'
                        }`}
                        style={{ width: `${Math.min(100, (driver.continuousDrivingHours / 4.0) * 100)}%` }}
                      ></div>
                    </div>
                  </td>

                  {/* Daily Hours */}
                  <td className="py-3 px-3 font-mono">
                    <span className={`text-xs ${isDailyWarning ? 'text-amber-700 font-bold' : 'text-slate-800'}`}>
                      {driver.dailyDrivingHours.toFixed(1)}h / 10h
                    </span>
                    <div className="w-20 bg-slate-100 rounded-full h-1 mt-1 overflow-hidden">
                      <div
                        className={`h-1 rounded-full ${isDailyWarning ? 'bg-amber-500' : 'bg-slate-400'}`}
                        style={{ width: `${Math.min(100, (driver.dailyDrivingHours / 10.0) * 100)}%` }}
                      ></div>
                    </div>
                  </td>

                  {/* Weekly Hours */}
                  <td className="py-3 px-3 font-mono">
                    <span className={`text-xs ${isWeeklyWarning ? 'text-amber-700 font-bold' : 'text-slate-800'}`}>
                      {driver.weeklyDrivingHours.toFixed(1)}h / 48h
                    </span>
                  </td>

                  {/* License & Health Check Expiry */}
                  <td className="py-3 px-3 font-mono text-[11px]">
                    <div>
                      GPLX: <span className={driver.status === 'suspended_docs' ? 'text-rose-600 font-bold' : 'text-slate-700'}>{driver.licenseExpiry}</span>
                    </div>
                    <div>
                      Khám SK: <span className={driver.status === 'suspended_docs' ? 'text-rose-600 font-bold' : 'text-slate-700'}>{driver.healthCertExpiry}</span>
                    </div>
                  </td>

                  {/* Alcohol / Drug */}
                  <td className="py-3 px-3 font-mono">
                    {driver.alcoholDrugCheck === 'passed' && (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Âm tính
                      </span>
                    )}
                    {driver.alcoholDrugCheck === 'pending' && (
                      <span className="text-amber-700 font-medium">Chờ kiểm tra</span>
                    )}
                    {driver.alcoholDrugCheck === 'warning' && (
                      <span className="text-rose-700 font-bold">CẢNH BÁO DƯƠNG TÍNH</span>
                    )}
                  </td>

                  {/* Fatigue AI */}
                  <td className="py-3 px-3">
                    {driver.recentFatigueAlerts.length > 0 ? (
                      <div className="space-y-1">
                        {driver.recentFatigueAlerts.map(alert => (
                          <div
                            key={alert.id}
                            className={`p-1 rounded text-[10px] font-mono flex items-center justify-between gap-1 ${
                              alert.resolved ? 'bg-slate-100 text-slate-600' : 'bg-rose-50 text-rose-800 border border-rose-200'
                            }`}
                          >
                            <span>{alert.type === 'ngu_gat' ? 'Ngủ gật' : 'Dùng ĐT'} ({alert.time})</span>
                            {!alert.resolved && (
                              <button
                                onClick={() => resolveFatigueAlert(driver.driverId, alert.id, 'Đã gọi điện thoại cảnh báo và yêu cầu dừng xe')}
                                className="px-1 text-[9px] bg-rose-700 text-white rounded hover:bg-rose-800"
                              >
                                Xử lý
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 font-mono text-[11px]">Bình thường</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Driver rest button */}
                      {driver.continuousDrivingHours > 0 && (
                        <button
                          onClick={() => recordDriverRest(driver.driverId)}
                          className="px-2 py-1 text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-300 rounded hover:bg-emerald-100 flex items-center gap-1"
                          title="Táp lề trạm nghỉ 30 phút theo Điều 64"
                        >
                          <Coffee className="w-3 h-3" />
                          <span>Nghỉ 30p</span>
                        </button>
                      )}

                      {/* Alcohol test button */}
                      <button
                        onClick={() => setTestModalDriver(driver)}
                        className="px-2 py-1 text-[11px] bg-slate-100 text-slate-700 border border-slate-300 rounded hover:bg-slate-200"
                        title="Kiểm tra cồn / ma túy ngẫu nhiên"
                      >
                        Test cồn
                      </button>

                      {/* Suspend or Reinstate */}
                      {driver.status === 'suspended_docs' ? (
                        <button
                          onClick={() => reinstateDriver(driver.driverId)}
                          className="px-2 py-1 text-[11px] bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
                          title="Kích hoạt lại sau khi nộp hồ sơ hợp lệ"
                        >
                          <UserCheck className="w-3 h-3" />
                          <span>Mở khóa</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => suspendDriverDocs(driver.driverId, 'GPLX / Khám sức khỏe không đạt tiêu chuẩn')}
                          className="px-2 py-1 text-[11px] text-rose-700 hover:bg-rose-50 border border-rose-300 rounded"
                          title="Đình chỉ điều xe"
                        >
                          Đình chỉ
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Alcohol & Drug Test Modal */}
      {testModalDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-md p-6 text-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Kiểm tra nhanh Nồng độ cồn & Ma túy (HR-SOP-11)
            </h3>
            <p className="text-slate-600">
              Tài xế: <strong>{testModalDriver.driverName}</strong> ({testModalDriver.driverCode}) · Xe: {testModalDriver.vehiclePlate}
            </p>
            <p className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-700 text-[11px] leading-relaxed">
              Thực hiện theo chính sách Không dung thứ (Zero tolerance) theo Luật Trật tự, ATGT Đường bộ 2024.
              Kết quả được bảo mật theo quy trình SOP-16.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  submitAlcoholTest(testModalDriver.driverId, 'passed');
                  setTestModalDriver(null);
                }}
                className="py-2.5 px-3 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-center"
              >
                Âm tính (Cho phép chạy)
              </button>

              <button
                onClick={() => {
                  submitAlcoholTest(testModalDriver.driverId, 'warning');
                  setTestModalDriver(null);
                }}
                className="py-2.5 px-3 rounded bg-rose-600 hover:bg-rose-700 text-white font-semibold text-center"
              >
                Dương tính (Đình chỉ ngay)
              </button>
            </div>

            <button
              onClick={() => setTestModalDriver(null)}
              className="w-full py-1.5 border border-slate-300 rounded text-slate-600 hover:bg-slate-50 text-center"
            >
              Hủy bỏ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
