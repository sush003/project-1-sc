// KORAVO Decision Object - Single source of truth
// This structure is designed to be API-ready for future backend integration
// Based on the Decision Object Contract from UI specifications

export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type DecisionStage = 'detected' | 'pending' | 'in_review' | 'approved' | 'executing' | 'completed' | 'deferred' | 'dismissed' | 'failed';
export type ExecutionTrajectory = 'on_track' | 'at_risk' | 'off_track';
export type RiskLevel = 'low' | 'medium' | 'high';
export type Momentum = 'accelerating' | 'degrading' | 'stable' | 'improving';
export type DataTrustState = 'reliable' | 'degraded' | 'monitoring_only';

export interface Evidence {
  id: string;
  statement: string;
  metric?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export interface ActionParameter {
  id: string;
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  description?: string;
}

export interface RecommendedAction {
  id: string;
  summary: string;
  duration: string;
  expectedOutcome: string;
  riskLevel: RiskLevel;
  rollbackAvailable: boolean;
  rollbackWindow?: string;
  rollbackImpact?: {
    exposure: string;
    recoveryRate: string;
    description: string;
  };
  parameters: ActionParameter[];
  // What will change / What will NOT change
  willChange: string[];
  willNotChange: string[];
  // Risk explanation
  riskExplanation?: {
    sources: string[];
    whatCouldGoWrong: string[];
    worstCase?: string;
    whyAcceptable?: string;
  };
}

export interface ExecutionStatus {
  stage: 'pending' | 'in_progress' | 'completed' | 'failed' | 'rolled_back';
  trajectory: ExecutionTrajectory;
  startedAt?: string;
  completedAt?: string;
  progressDescription: string;
  observedImpact?: string;
  predictedVsActual?: {
    predicted: string;
    actual: string;
    variance?: string;
  };
  earlyWarnings?: string[];
}

export interface InactionProjection {
  week1: string;
  week4?: string;
  week8?: string;
  week12?: string;
  totalCost: string;
  comparisonWithAction: string;
}

export interface Confidence {
  overall: number;
  dataQuality?: number;
  modelPerformance?: number;
  contextualFactors?: number;
  explanation?: string;
}

// The core Decision object - everything in KORAVO maps to this
export interface Decision {
  id: string;
  type?: 'inventory' | 'pricing' | 'operations' | 'risk' | 'finance' | 'wastage' | 'labor';
  
  // What stage is this decision in?
  stage: DecisionStage;
  
  // The insight that triggered this decision
  insight: {
    title: string;
    state: string;
    priority: Priority;
    confidence: number | Confidence;
    detectedAt: string;
    momentum: Momentum;
    urgencyWindow?: string; // e.g., "Action recommended within 18 hours"
  };
  
  // Why does this matter?
  context: {
    whatHappened: string;
    whyItMatters: string;
    evidence: Evidence[];
    inactionConsequence: string;
    inactionProjection?: InactionProjection;
    whatSystemCannotSee?: string; // Uncertainty must be explicit
  };
  
  // Financial/operational impact
  impact: {
    value: string;
    description: string;
    timeframe: string;
  };
  
  // System recommendation (can be overridden by human)
  recommendation: RecommendedAction;
  
  // Execution tracking (populated after approval)
  execution?: ExecutionStatus;
  
  // Deferral/Dismissal info
  deferredUntil?: string;
  deferredReason?: string;
  dismissedReason?: string;
  
  // Audit trail
  approvedBy?: string;
  approvedAt?: string;
  
  // Similar past cases
  similarCases?: {
    count: number;
    successRate: number;
    mostSimilar?: {
      id: string;
      description: string;
      outcome: string;
    };
  };
}

// Lifecycle stage metadata for UI
export const DECISION_STAGES: Record<DecisionStage, {
  label: string;
  description: string;
  order: number;
}> = {
  detected: {
    label: 'Detected',
    description: 'System identified pattern',
    order: 0
  },
  pending: {
    label: 'Pending Review',
    description: 'Awaiting human attention',
    order: 1
  },
  in_review: {
    label: 'Under Review',
    description: 'Being evaluated',
    order: 2
  },
  approved: {
    label: 'Approved',
    description: 'Ready for execution',
    order: 3
  },
  executing: {
    label: 'Executing',
    description: 'Action in progress',
    order: 4
  },
  completed: {
    label: 'Completed',
    description: 'Action finished',
    order: 5
  },
  deferred: {
    label: 'Deferred',
    description: 'Postponed for later',
    order: -1
  },
  dismissed: {
    label: 'Dismissed',
    description: 'Rejected by user',
    order: -2
  },
  failed: {
    label: 'Failed',
    description: 'Execution error',
    order: -3
  }
};

// Data trust state for UI
export const DATA_TRUST_STATES: Record<DataTrustState, {
  label: string;
  color: string;
  tooltip: string;
}> = {
  reliable: {
    label: 'Data Reliable',
    color: 'success',
    tooltip: 'All data sources operating normally. Recommendations are at full confidence.'
  },
  degraded: {
    label: 'Data Degraded',
    color: 'warning',
    tooltip: 'Some data sources are delayed. Recommendations may be limited.'
  },
  monitoring_only: {
    label: 'Monitoring Only',
    color: 'critical',
    tooltip: 'Data reliability is low. The system is in monitoring mode only. No actions recommended.'
  }
};
