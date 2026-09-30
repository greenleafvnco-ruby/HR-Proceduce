import React, { useState } from 'react';
import { useSop } from '../../context/SopContext';
import { SopTask, TaskStatus, RoleKey } from '../../types/sop';
import { TaskCard } from './TaskCard';
import { TaskDetailModal } from './TaskDetailModal';
import { Search, Filter, LayoutGrid, ListFilter, AlertTriangle, Clock, CheckCircle2, ShieldAlert, Plus } from 'lucide-react';

interface TaskHubViewProps {
  onOpenCreateTask: () => void;
  onOpenForm: (formCode: string) => void;
}

export const TaskHubView: React.FC<TaskHubViewProps> = ({ onOpenCreateTask, onOpenForm }) => {
  const { tasks, currentRole, urgentCount, breachedCount, approvalRequiredCount } = useSop();

  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'ALL'>('ALL');
  const [roleFilter, setRoleFilter] = useState<RoleKey | 'ALL'>(currentRole !== 'ALL' ? currentRole : 'ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTask, setSelectedTask] = useState<SopTask | null>(null);

  // Sync role filter if global role changes
  React.useEffect(() => {
    if (currentRole !== 'ALL') {
      setRoleFilter(currentRole);
    }
  }, [currentRole]);

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (statusFilter !== 'ALL' && task.status !== statusFilter) return false;
    if (roleFilter !== 'ALL' && task.assignedRole !== roleFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCode = task.taskCode.toLowerCase().includes(q);
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchSop = task.sopCode.toLowerCase().includes(q);
      const matchStaff = task.relatedStaffName?.toLowerCase().includes(q);
      const matchPlate = task.vehiclePlate?.toLowerCase().includes(q);
      if (!matchCode && !matchTitle && !matchSop && !matchStaff && !matchPlate) return false;
    }
    return true;
  });

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;

  return (
    <div className="space-y-6">
      {/* Executive Quick Stats Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white border border-slate-200 rounded p-3.5">
          <span className="text-xs text-slate-500 font-medium block">Nhiệm vụ đang chạy</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900">{inProgressCount}</span>
            <span className="text-xs text-slate-400 font-mono">/ {tasks.length}</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-3.5 border-l-4 border-l-rose-500">
          <span className="text-xs text-rose-700 font-medium block flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            Khẩn cấp (Tai nạn / Sự cố)
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-rose-700">{urgentCount}</span>
            <span className="text-xs text-rose-600 font-mono">SLA 5-15p</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-3.5 border-l-4 border-l-amber-500">
          <span className="text-xs text-amber-700 font-medium block flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Chờ BGĐ/QL duyệt
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-700">{approvalRequiredCount}</span>
            <span className="text-xs text-slate-400 font-mono">Hồ sơ chờ</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-3.5 border-l-4 border-l-red-600">
          <span className="text-xs text-red-700 font-medium block flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            Quá hạn SLA
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-red-700">{breachedCount}</span>
            <span className="text-xs text-red-500 font-mono">Cần can thiệp</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-3.5 col-span-2 md:col-span-1">
          <span className="text-xs text-emerald-700 font-medium block flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Đã hoàn thành
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-700">{completedCount}</span>
            <span className="text-xs text-emerald-600 font-mono">Đạt SLA</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters, Search, View Mode */}
      <div className="bg-white border border-slate-200 rounded p-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Tìm theo mã TSK, tên SOP, nhân viên, biển số xe..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-slate-400"
          />
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded text-xs">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded transition-colors ${
                statusFilter === 'ALL' ? 'bg-white text-slate-900 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({tasks.length})
            </button>
            <button
              onClick={() => setStatusFilter('in_progress')}
              className={`px-2.5 py-1 rounded transition-colors ${
                statusFilter === 'in_progress' ? 'bg-white text-blue-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Đang làm ({inProgressCount})
            </button>
            <button
              onClick={() => setStatusFilter('approval_required')}
              className={`px-2.5 py-1 rounded transition-colors ${
                statusFilter === 'approval_required' ? 'bg-white text-amber-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Chờ duyệt ({approvalRequiredCount})
            </button>
            <button
              onClick={() => setStatusFilter('breached')}
              className={`px-2.5 py-1 rounded transition-colors ${
                statusFilter === 'breached' ? 'bg-white text-rose-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Quá hạn ({breachedCount})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-1 rounded transition-colors ${
                statusFilter === 'completed' ? 'bg-white text-emerald-700 font-medium shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hoàn thành ({completedCount})
            </button>
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value as RoleKey | 'ALL')}
            className="text-xs bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-700 focus:outline-none"
          >
            <option value="ALL">Mọi vai trò RACI</option>
            <option value="HR">HR - Nhân sự</option>
            <option value="ĐĐ">ĐĐ - Điều độ</option>
            <option value="AT">AT - An toàn</option>
            <option value="QL">QL - Quản lý / Đội trưởng</option>
            <option value="KT">KT - Kế toán</option>
            <option value="BGĐ">BGĐ - Giám đốc</option>
            <option value="Tài xế">Tài xế</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-slate-200 rounded p-0.5 bg-slate-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
              title="Dạng thẻ lưới"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
              title="Dạng danh sách"
            >
              <ListFilter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Task Content: Grid or Table List */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded p-12 text-center">
          <p className="text-sm font-semibold text-slate-800 mb-1">Không có nhiệm vụ nào phù hợp</p>
          <p className="text-xs text-slate-500 mb-4">Thử thay đổi bộ lọc hoặc bấm tạo nhiệm vụ mới từ thư viện SOP.</p>
          <button
            onClick={onOpenCreateTask}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded hover:bg-slate-800"
          >
            Khởi tạo nhiệm vụ mới
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onOpenDetail={setSelectedTask}
              onOpenForm={onOpenForm}
            />
          ))}
        </div>
      ) : (
        /* Dense Table List View */
        <div className="bg-white border border-slate-200 rounded overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-2.5 px-3">Mã & Quy trình</th>
                <th className="py-2.5 px-3">Tiêu đề nhiệm vụ</th>
                <th className="py-2.5 px-3">Vai trò</th>
                <th className="py-2.5 px-3">Người phụ trách</th>
                <th className="py-2.5 px-3">Đối tượng / Xe</th>
                <th className="py-2.5 px-3">Thời hạn SLA</th>
                <th className="py-2.5 px-3">Trạng thái</th>
                <th className="py-2.5 px-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTasks.map(task => (
                <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-900 whitespace-nowrap">
                    <div>{task.taskCode}</div>
                    <div className="text-[10px] text-slate-500">{task.sopCode} · B.{task.stepNumber}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      onClick={() => setSelectedTask(task)}
                      className="font-medium text-slate-800 hover:text-blue-700 cursor-pointer line-clamp-1"
                    >
                      {task.title}
                    </span>
                    {task.relatedFormCode && (
                      <span className="text-[10px] text-blue-600 font-mono mt-0.5 block">
                        Mẫu: {task.relatedFormCode}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-700 whitespace-nowrap">
                    {task.assignedRole}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                    {task.assigneeName}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                    {task.relatedStaffName || '-'}
                    {task.vehiclePlate && (
                      <span className="block font-mono text-[10px] text-slate-800 font-semibold">
                        {task.vehiclePlate}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-mono whitespace-nowrap">
                    <span
                      className={
                        task.isBreached
                          ? 'text-rose-600 font-bold'
                          : task.slaRemainingMinutes && task.slaRemainingMinutes <= 30
                          ? 'text-amber-600 font-bold'
                          : 'text-slate-600'
                      }
                    >
                      {task.isBreached ? 'Quá hạn' : task.slaRemainingMinutes ? `${task.slaRemainingMinutes}p` : '-'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap font-mono text-xs">
                    {task.status === 'in_progress' && <span className="text-blue-700">Đang làm</span>}
                    {task.status === 'pending' && <span className="text-slate-600">Chờ xử lý</span>}
                    {task.status === 'approval_required' && <span className="text-amber-700 font-bold">Chờ duyệt</span>}
                    {task.status === 'completed' && <span className="text-emerald-700 font-semibold">Hoàn thành</span>}
                    {task.status === 'breached' && <span className="text-rose-700 font-bold">Quá hạn</span>}
                  </td>
                  <td className="py-2.5 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="px-2 py-1 text-[11px] text-slate-700 hover:text-slate-900 border border-slate-300 rounded hover:bg-slate-100"
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onOpenForm={onOpenForm}
        />
      )}
    </div>
  );
};
