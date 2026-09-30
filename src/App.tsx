/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SopProvider, useSop } from './context/SopContext';
import { Header } from './components/Header';
import { TaskHubView } from './components/TaskHub/TaskHubView';
import { CreateTaskModal } from './components/TaskHub/CreateTaskModal';
import { SopLibraryView } from './components/SopLibrary/SopLibraryView';
import { SafetyMonitorView } from './components/SafetyMonitor/SafetyMonitorView';
import { FormsCenterView } from './components/FormsCenter/FormsCenterView';
import { FormModalRenderer } from './components/FormsCenter/FormModalRenderer';
import { AutomationView } from './components/AutomationEngine/AutomationView';
import { KpiDashboardView } from './components/Dashboard/KpiDashboardView';
import { RaciMatrixView } from './components/RaciMatrix/RaciMatrixView';
import { SopDefinition, SopStep, FormTemplate } from './types/sop';
import { FORM_TEMPLATES } from './data/sopMasterData';

function AppContent() {
  const { activeTab, setActiveTab, createTask } = useSop();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [activeFormTemplate, setActiveFormTemplate] = useState<FormTemplate | null>(null);

  const handleOpenForm = (formCode: string) => {
    const template = FORM_TEMPLATES.find(f => f.code === formCode);
    if (template) {
      setActiveFormTemplate(template);
    }
  };

  const handleTriggerStep = (sop: SopDefinition, step: SopStep) => {
    createTask({
      sopCode: sop.code,
      sopTitle: sop.title,
      stepNumber: step.stepNumber,
      stepTitle: step.title,
      title: `${sop.code} B.${step.stepNumber}: ${step.title}`,
      description: step.description,
      assignedRole: step.assignedRole,
      assigneeName: `Cán bộ ${step.assignedRole}`,
      staffType: sop.targetAudience === 'Khối văn phòng' ? 'office' : 'driver',
      priority: sop.code === 'HR-SOP-12' ? 'urgent' : 'normal',
      slaRemainingMinutes: step.slaMinutes || (step.slaHours ? step.slaHours * 60 : 1440),
      relatedFormCode: step.outputFormCode
    });
    setActiveTab('tasks');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 3-Zone Sticky Header */}
      <Header onOpenCreateTask={() => setIsCreateTaskOpen(true)} />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'tasks' && (
          <TaskHubView
            onOpenCreateTask={() => setIsCreateTaskOpen(true)}
            onOpenForm={handleOpenForm}
          />
        )}

        {activeTab === 'sops' && (
          <SopLibraryView
            onOpenForm={handleOpenForm}
            onTriggerStep={handleTriggerStep}
          />
        )}

        {activeTab === 'safety' && <SafetyMonitorView />}

        {activeTab === 'forms' && (
          <FormsCenterView
            onSuccessTaskCreated={() => {
              setActiveTab('tasks');
            }}
          />
        )}

        {activeTab === 'automation' && (
          <AutomationView onGoToTasks={() => setActiveTab('tasks')} />
        )}

        {activeTab === 'kpis' && <KpiDashboardView />}

        {activeTab === 'raci' && (
          <RaciMatrixView
            onOpenForm={handleOpenForm}
            onTriggerStep={handleTriggerStep}
          />
        )}
      </main>

      {/* Quiet Enterprise Footer (Zero telemetry tickers, compliant with Anti-Slop constitution) */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">HR-SOP MASTER v3.0</span>
            <span aria-hidden="true">·</span>
            <span>Doanh nghiệp vận tải quy mô 500 nhân sự (100 VP / 400 Tài xế)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Bộ luật Lao động 2019</span>
            <span>·</span>
            <span>Luật Trật tự ATGT đường bộ 2024</span>
            <span>·</span>
            <span>Nghị định 168/2024 & 283/2026</span>
          </div>
        </div>
      </footer>

      {/* Global Task Creation Modal */}
      {isCreateTaskOpen && (
        <CreateTaskModal onClose={() => setIsCreateTaskOpen(false)} />
      )}

      {/* Global Form Modal */}
      {activeFormTemplate && (
        <FormModalRenderer
          formTemplate={activeFormTemplate}
          onClose={() => setActiveFormTemplate(null)}
          onSuccessTaskCreated={() => {
            setActiveTab('tasks');
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <SopProvider>
      <AppContent />
    </SopProvider>
  );
}
