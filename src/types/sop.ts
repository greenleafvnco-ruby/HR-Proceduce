export type RoleKey = 'HR' | 'QL' | 'ĐĐ' | 'AT' | 'KT' | 'BGĐ' | 'Tài xế';

export type TaskStatus = 'pending' | 'in_progress' | 'approval_required' | 'completed' | 'breached';

export type TaskPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface SopStep {
  stepNumber: number;
  title: string;
  description: string;
  assignedRole: RoleKey;
  sla: string;
  slaMinutes?: number;
  slaHours?: number;
  slaDays?: number;
  outputName: string;
  outputFormCode?: string;
  isDecision?: boolean;
  decisionCondition?: string;
  legalNote?: string;
}

export interface SopDefinition {
  code: string; // e.g. HR-SOP-01
  title: string;
  version: string;
  effectiveDate: string;
  department: string;
  approvedBy: string;
  purpose: string;
  scope: string;
  targetAudience: 'Tất cả' | 'Khối văn phòng' | 'Khối tài xế' | 'Cả hai khối';
  raci: {
    hr: 'R' | 'A' | 'C' | 'I';
    ql: 'R' | 'A' | 'C' | 'I';
    dd: 'R' | 'A' | 'C' | 'I';
    at: 'R' | 'A' | 'C' | 'I';
    kt: 'R' | 'A' | 'C' | 'I';
    bgd: 'R' | 'A' | 'C' | 'I';
  };
  steps: SopStep[];
  legalFramework: string[];
  relatedForms: string[];
  kpis: {
    indicator: string;
    target: string;
  }[];
}

export interface SopTask {
  id: string;
  taskCode: string; // e.g. TSK-2026-001
  sopCode: string;
  sopTitle: string;
  stepNumber: number;
  stepTitle: string;
  title: string;
  description: string;
  assignedRole: RoleKey;
  assigneeName: string;
  relatedStaffName?: string;
  staffType: 'driver' | 'office';
  vehiclePlate?: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string; // ISO string
  dueAt: string; // ISO string
  completedAt?: string;
  slaRemainingMinutes?: number;
  isBreached?: boolean;
  relatedFormCode?: string;
  formData?: Record<string, any>;
  notes?: string;
  history: {
    timestamp: string;
    action: string;
    actor: string;
    comment?: string;
  }[];
}

export interface FormTemplate {
  code: string; // HR-F01
  title: string;
  sopCode: string;
  description: string;
  category: 'Tuyển dụng' | 'Onboarding' | 'Chấm công & Phép' | 'An toàn & Kỷ luật' | 'Đánh giá & Thôi việc';
}

export interface DriverTelemetry {
  driverId: string;
  driverName: string;
  driverCode: string;
  phone: string;
  vehiclePlate: string;
  vehicleType: string;
  route: string;
  licenseClass: string;
  licenseNumber: string;
  licenseExpiry: string; // YYYY-MM-DD
  healthCertExpiry: string; // YYYY-MM-DD
  continuousDrivingHours: number; // e.g. 3.2
  dailyDrivingHours: number; // e.g. 8.1
  weeklyDrivingHours: number; // e.g. 41.5
  status: 'driving' | 'resting' | 'precheck' | 'suspended_docs';
  alcoholDrugCheck: 'passed' | 'pending' | 'warning';
  recentFatigueAlerts: {
    id: string;
    time: string;
    type: 'ngu_gat' | 'dien_thoai' | 'lech_lan' | 'phanh_gap' | 'qua_toc_do';
    resolved: boolean;
    resolutionNote?: string;
  }[];
}

export interface AutomationRule {
  id: string;
  name: string;
  triggerEvent: string;
  condition: string;
  targetSop: string;
  targetStep: number;
  autoAction: string;
  assignedRole: RoleKey;
  isActive: boolean;
  lastTriggered?: string;
  executionCount: number;
}

export interface AnnualEvent {
  period: string;
  activity: string;
  sopCodes: string[];
  quarter: string;
}

export interface RoadmapMilestone {
  stage: string;
  days: string;
  tasks: string[];
  deliverable: string;
  completed: boolean;
}
