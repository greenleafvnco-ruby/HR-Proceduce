import React, { createContext, useContext, useState, useEffect } from 'react';
import { SopTask, SopDefinition, FormTemplate, DriverTelemetry, AutomationRule, RoleKey, TaskStatus, TaskPriority } from '../types/sop';
import { SOP_LIST, FORM_TEMPLATES, INITIAL_TASKS, INITIAL_DRIVERS } from '../data/sopMasterData';
import { INITIAL_AUTOMATION_RULES } from '../data/automationRules';

interface SopContextType {
  tasks: SopTask[];
  drivers: DriverTelemetry[];
  sops: SopDefinition[];
  forms: FormTemplate[];
  automationRules: AutomationRule[];
  currentRole: RoleKey | 'ALL';
  setCurrentRole: (role: RoleKey | 'ALL') => void;
  activeTab: 'tasks' | 'sops' | 'safety' | 'forms' | 'automation' | 'kpis' | 'raci';
  setActiveTab: (tab: 'tasks' | 'sops' | 'safety' | 'forms' | 'automation' | 'kpis' | 'raci') => void;
  // Task actions
  createTask: (taskData: Partial<SopTask>) => SopTask;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus, note?: string) => void;
  assignTask: (taskId: string, role: RoleKey, assigneeName: string) => void;
  addTaskComment: (taskId: string, comment: string, actor?: string) => void;
  deleteTask: (taskId: string) => void;
  // Driver actions
  recordDriverRest: (driverId: string) => void;
  suspendDriverDocs: (driverId: string, reason: string) => void;
  reinstateDriver: (driverId: string) => void;
  resolveFatigueAlert: (driverId: string, alertId: string, note: string) => void;
  submitAlcoholTest: (driverId: string, result: 'passed' | 'warning') => void;
  // Automation actions
  toggleAutomationRule: (ruleId: string) => void;
  simulateTriggerRule: (ruleId: string) => void;
  // Forms action
  submitForm: (formCode: string, data: Record<string, any>, staffName?: string, vehiclePlate?: string) => SopTask;
  // Selected SOP / Task / Form for modals
  selectedSop: SopDefinition | null;
  setSelectedSop: (sop: SopDefinition | null) => void;
  selectedTask: SopTask | null;
  setSelectedTask: (task: SopTask | null) => void;
  selectedFormCode: string | null;
  setSelectedFormCode: (code: string | null) => void;
  // Stats
  urgentCount: number;
  breachedCount: number;
  approvalRequiredCount: number;
  driverAlertCount: number;
}

const SopContext = createContext<SopContextType | undefined>(undefined);

const LOCAL_STORAGE_TASKS_KEY = 'hr_sop_tasks_v1';
const LOCAL_STORAGE_DRIVERS_KEY = 'hr_sop_drivers_v1';
const LOCAL_STORAGE_RULES_KEY = 'hr_sop_rules_v1';

export const SopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<SopTask[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TASKS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TASKS;
  });

  const [drivers, setDrivers] = useState<DriverTelemetry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_DRIVERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DRIVERS;
  });

  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_RULES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_AUTOMATION_RULES;
  });

  const [currentRole, setCurrentRole] = useState<RoleKey | 'ALL'>('ALL');
  const [activeTab, setActiveTab] = useState<'tasks' | 'sops' | 'safety' | 'forms' | 'automation' | 'kpis' | 'raci'>('tasks');
  const [selectedSop, setSelectedSop] = useState<SopDefinition | null>(null);
  const [selectedTask, setSelectedTask] = useState<SopTask | null>(null);
  const [selectedFormCode, setSelectedFormCode] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_TASKS_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_DRIVERS_KEY, JSON.stringify(drivers));
    } catch (e) {
      console.error(e);
    }
  }, [drivers]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_RULES_KEY, JSON.stringify(automationRules));
    } catch (e) {
      console.error(e);
    }
  }, [automationRules]);

  // Real-time SLA simulation ticker every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks =>
        prevTasks.map(task => {
          if (task.status === 'completed') return task;
          const dueTime = new Date(task.dueAt).getTime();
          const now = Date.now();
          const remainingMinutes = Math.round((dueTime - now) / (1000 * 60));
          const isBreached = remainingMinutes <= 0;
          return {
            ...task,
            slaRemainingMinutes: remainingMinutes,
            isBreached: isBreached,
            status: isBreached && task.status !== 'approval_required' ? 'breached' : task.status
          };
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const createTask = (taskData: Partial<SopTask>): SopTask => {
    const newId = `TSK-${Date.now().toString().slice(-4)}`;
    const taskCode = `TSK-2026-${(tasks.length + 1).toString().padStart(3, '0')}`;
    const now = new Date();
    const dueAt = taskData.dueAt || new Date(now.getTime() + (taskData.slaRemainingMinutes || 60) * 60000).toISOString();

    const createdTask: SopTask = {
      id: newId,
      taskCode,
      sopCode: taskData.sopCode || 'HR-SOP-01',
      sopTitle: taskData.sopTitle || 'Quy trình nhân sự',
      stepNumber: taskData.stepNumber || 1,
      stepTitle: taskData.stepTitle || 'Bước thực hiện',
      title: taskData.title || 'Nhiệm vụ mới',
      description: taskData.description || '',
      assignedRole: taskData.assignedRole || 'HR',
      assigneeName: taskData.assigneeName || 'Cán bộ phụ trách',
      relatedStaffName: taskData.relatedStaffName,
      staffType: taskData.staffType || 'driver',
      vehiclePlate: taskData.vehiclePlate,
      status: taskData.status || 'in_progress',
      priority: taskData.priority || 'normal',
      createdAt: now.toISOString(),
      dueAt,
      slaRemainingMinutes: taskData.slaRemainingMinutes || 120,
      relatedFormCode: taskData.relatedFormCode,
      formData: taskData.formData,
      history: [
        {
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          action: 'Khởi tạo nhiệm vụ',
          actor: currentRole === 'ALL' ? 'Hệ thống tự động hóa' : `Cán bộ ${currentRole}`,
          comment: taskData.notes || 'Khởi tạo từ luồng quy trình SOP'
        }
      ]
    };

    setTasks(prev => [createdTask, ...prev]);
    return createdTask;
  };

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus, note?: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== taskId) return task;
        const now = new Date();
        const actionMap: Record<TaskStatus, string> = {
          pending: 'Chuyển sang Chờ xử lý',
          in_progress: 'Bắt đầu thực hiện',
          approval_required: 'Gửi phê duyệt cấp trên',
          completed: 'Hoàn thành nhiệm vụ',
          breached: 'Đánh dấu Quá hạn SLA'
        };

        const updated = {
          ...task,
          status: newStatus,
          completedAt: newStatus === 'completed' ? now.toISOString() : task.completedAt,
          history: [
            ...task.history,
            {
              timestamp: now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
              action: actionMap[newStatus],
              actor: currentRole === 'ALL' ? 'Người quản trị' : `Cán bộ ${currentRole}`,
              comment: note || `Đã chuyển trạng thái sang ${newStatus}`
            }
          ]
        };
        return updated;
      })
    );
  };

  const assignTask = (taskId: string, role: RoleKey, assigneeName: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== taskId) return task;
        return {
          ...task,
          assignedRole: role,
          assigneeName,
          history: [
            ...task.history,
            {
              timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
              action: 'Phân công lại nhiệm vụ',
              actor: currentRole === 'ALL' ? 'Người quản trị' : `Cán bộ ${currentRole}`,
              comment: `Phân công cho ${assigneeName} (${role})`
            }
          ]
        };
      })
    );
  };

  const addTaskComment = (taskId: string, comment: string, actor?: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== taskId) return task;
        return {
          ...task,
          history: [
            ...task.history,
            {
              timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
              action: 'Ghi chú thảo luận',
              actor: actor || (currentRole === 'ALL' ? 'Hệ thống SOP' : `Cán bộ ${currentRole}`),
              comment
            }
          ]
        };
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const recordDriverRest = (driverId: string) => {
    setDrivers(prev =>
      prev.map(d => {
        if (d.driverId !== driverId) return d;
        return {
          ...d,
          continuousDrivingHours: 0,
          status: 'resting'
        };
      })
    );
  };

  const suspendDriverDocs = (driverId: string, reason: string) => {
    setDrivers(prev =>
      prev.map(d => {
        if (d.driverId !== driverId) return d;
        return {
          ...d,
          status: 'suspended_docs'
        };
      })
    );
    createTask({
      sopCode: 'HR-SOP-04',
      sopTitle: 'Hợp đồng lao động và quản lý hồ sơ nhân sự',
      stepNumber: 4,
      stepTitle: 'Tạm dừng lái xe do giấy tờ hết hạn',
      title: `Khóa điều xe và xử lý gia hạn cho tài xế ${driverId}`,
      description: `Lý do đình chỉ: ${reason}. Yêu cầu Phòng HR liên hệ tài xế nộp hồ sơ gia hạn trước khi cho phép kích hoạt trở lại.`,
      assignedRole: 'HR',
      assigneeName: 'Lê Thị Thu Thảo',
      staffType: 'driver',
      priority: 'high',
      slaRemainingMinutes: 720
    });
  };

  const reinstateDriver = (driverId: string) => {
    setDrivers(prev =>
      prev.map(d => {
        if (d.driverId !== driverId) return d;
        return {
          ...d,
          status: 'resting',
          licenseExpiry: '2028-12-31',
          healthCertExpiry: '2027-12-31'
        };
      })
    );
  };

  const resolveFatigueAlert = (driverId: string, alertId: string, note: string) => {
    setDrivers(prev =>
      prev.map(d => {
        if (d.driverId !== driverId) return d;
        return {
          ...d,
          recentFatigueAlerts: d.recentFatigueAlerts.map(a =>
            a.id === alertId ? { ...a, resolved: true, resolutionNote: note } : a
          )
        };
      })
    );
  };

  const submitAlcoholTest = (driverId: string, result: 'passed' | 'warning') => {
    setDrivers(prev =>
      prev.map(d => {
        if (d.driverId !== driverId) return d;
        return {
          ...d,
          alcoholDrugCheck: result
        };
      })
    );
    if (result === 'warning') {
      createTask({
        sopCode: 'HR-SOP-11',
        sopTitle: 'An toàn, sức khỏe lao động và quản lý mệt mỏi của tài xế',
        stepNumber: 2,
        stepTitle: 'Xử lý vi phạm cồn / chất kích thích',
        title: `Cảnh báo vi phạm nồng độ cồn / ma túy tài xế ${driverId}`,
        description: 'Tài xế có kết quả test nhanh dương tính. Đình chỉ ca chạy ngay lập tức, đưa về cơ sở y tế giám định lại theo quy trình và chuẩn bị biên bản vi phạm HR-F11.',
        assignedRole: 'AT',
        assigneeName: 'Hoàng Minh Tuấn (An toàn)',
        staffType: 'driver',
        priority: 'urgent',
        slaRemainingMinutes: 60,
        relatedFormCode: 'HR-F11'
      });
    }
  };

  const toggleAutomationRule = (ruleId: string) => {
    setAutomationRules(prev =>
      prev.map(r => (r.id === ruleId ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const simulateTriggerRule = (ruleId: string) => {
    const rule = automationRules.find(r => r.id === ruleId);
    if (!rule) return;

    setAutomationRules(prev =>
      prev.map(r =>
        r.id === ruleId
          ? {
              ...r,
              lastTriggered: 'Vừa kích hoạt xong',
              executionCount: r.executionCount + 1
            }
          : r
      )
    );

    // Create a real task corresponding to rule
    const taskTitles: Record<string, string> = {
      'AUTO-01': 'Kích hoạt tiếp nhận sự cố tai nạn khẩn cấp xe 51C-892.41',
      'AUTO-02': 'Cảnh báo tự động: Tài xế chạm trần lái liên tục 3.8 giờ',
      'AUTO-03': 'Tự động đình chỉ điều xe do giấy tờ hết hạn',
      'AUTO-04': 'Xử lý cảnh báo camera AI: Phát hiện dấu hiệu ngủ gật cabin',
      'AUTO-05': 'Kích hoạt Checklist Onboarding tài xế mới HR-F06',
      'AUTO-06': 'Kích hoạt bàn giao xe HR-F16 và đếm ngược quyết toán 14 ngày',
      'AUTO-07': 'Cảnh báo vượt trần giờ làm thêm 40h/tháng'
    };

    createTask({
      sopCode: rule.targetSop,
      sopTitle: SOP_LIST.find(s => s.code === rule.targetSop)?.title || 'Quy trình SOP',
      stepNumber: rule.targetStep,
      stepTitle: `Quy trình tự động hóa ${rule.name}`,
      title: taskTitles[rule.id] || `Kích hoạt tự động: ${rule.name}`,
      description: rule.autoAction,
      assignedRole: rule.assignedRole,
      assigneeName: `Trực ban ${rule.assignedRole}`,
      staffType: 'driver',
      priority: rule.id === 'AUTO-01' ? 'urgent' : 'high',
      slaRemainingMinutes: rule.id === 'AUTO-01' ? 15 : 120
    });
  };

  const submitForm = (formCode: string, data: Record<string, any>, staffName?: string, vehiclePlate?: string): SopTask => {
    const template = FORM_TEMPLATES.find(f => f.code === formCode);
    const relatedSop = SOP_LIST.find(s => s.code === template?.sopCode);

    let priority: TaskPriority = 'normal';
    if (formCode === 'HR-F13') priority = 'urgent';
    if (formCode === 'HR-F11' || formCode === 'HR-F14') priority = 'high';

    const newTask = createTask({
      sopCode: template?.sopCode || 'HR-SOP-01',
      sopTitle: relatedSop?.title || 'Quy trình nhân sự',
      stepNumber: 1,
      stepTitle: `Xử lý biểu mẫu điện tử ${formCode}`,
      title: `${template?.title || 'Biểu mẫu'}: ${staffName || 'Dữ liệu phát sinh'}`,
      description: `Tiếp nhận biểu mẫu ${formCode} (${template?.title}). Dữ liệu đã được kiểm tra tính hợp lệ và sẵn sàng xử lý theo quy định SOP.`,
      assignedRole: (relatedSop?.steps[0]?.assignedRole as RoleKey) || 'HR',
      assigneeName: `Cán bộ phụ trách ${formCode}`,
      relatedStaffName: staffName,
      staffType: vehiclePlate ? 'driver' : 'office',
      vehiclePlate,
      status: 'in_progress',
      priority,
      slaRemainingMinutes: formCode === 'HR-F13' ? 15 : 1440,
      relatedFormCode: formCode,
      formData: data
    });

    return newTask;
  };

  const urgentCount = tasks.filter(t => t.priority === 'urgent' && t.status !== 'completed').length;
  const breachedCount = tasks.filter(t => t.status === 'breached').length;
  const approvalRequiredCount = tasks.filter(t => t.status === 'approval_required').length;
  const driverAlertCount = drivers.filter(d => d.continuousDrivingHours >= 3.5 || d.status === 'suspended_docs' || d.recentFatigueAlerts.some(a => !a.resolved)).length;

  return (
    <SopContext.Provider
      value={{
        tasks,
        drivers,
        sops: SOP_LIST,
        forms: FORM_TEMPLATES,
        automationRules,
        currentRole,
        setCurrentRole,
        activeTab,
        setActiveTab,
        createTask,
        updateTaskStatus,
        assignTask,
        addTaskComment,
        deleteTask,
        recordDriverRest,
        suspendDriverDocs,
        reinstateDriver,
        resolveFatigueAlert,
        submitAlcoholTest,
        toggleAutomationRule,
        simulateTriggerRule,
        submitForm,
        selectedSop,
        setSelectedSop,
        selectedTask,
        setSelectedTask,
        selectedFormCode,
        setSelectedFormCode,
        urgentCount,
        breachedCount,
        approvalRequiredCount,
        driverAlertCount
      }}
    >
      {children}
    </SopContext.Provider>
  );
};

export const useSop = () => {
  const context = useContext(SopContext);
  if (!context) {
    throw new Error('useSop must be used within a SopProvider');
  }
  return context;
};
