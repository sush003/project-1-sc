// KORAVO Mock Decision Data
// Structured to mirror future API responses
// All business logic lives in the backend - UI only renders

import { Decision, DataTrustState } from '@/types/decision';

// Global system state
export const systemState = {
  dataTrust: 'reliable' as DataTrustState,
  focusMode: false,
  userRole: 'Operations Manager',
  organizationalScope: 'Region A'
};

export const mockDecisions: Decision[] = [
  {
    id: 'decision-001',
    type: 'wastage',
    stage: 'pending',
    
    insight: {
      title: 'Ingredient wastage above safe range',
      state: 'Wastage deviation detected in Outlet Cluster A',
      priority: 'critical',
      confidence: {
        overall: 87,
        dataQuality: 92,
        modelPerformance: 84,
        contextualFactors: 78,
        explanation: 'Confidence reflects data quality, historical accuracy, and context completeness.'
      },
      detectedAt: '2 hours ago',
      momentum: 'accelerating',
      urgencyWindow: 'Action recommended within 18 hours'
    },
    
    context: {
      whatHappened: 'Over the past 7 days, ingredient wastage has increased significantly while customer demand has decreased. The system detected that preparation quantities were not adjusted to match the demand dip, leading to excess inventory that spoils before use.',
      whyItMatters: 'This pattern is causing direct margin erosion. The wastage is structural, not random, which means it will continue until corrected.',
      evidence: [
        { id: 'ev-1', statement: 'Wastage increased 12% over 7 days', metric: '+12%', trend: 'up' },
        { id: 'ev-2', statement: 'Demand dipped 9% in same period', metric: '-9%', trend: 'down' },
        { id: 'ev-3', statement: 'No vendor quality issues detected', trend: 'neutral' },
        { id: 'ev-4', statement: 'Pattern consistent across 3 outlets', trend: 'neutral' }
      ],
      inactionConsequence: 'If no action is taken, the margin loss will continue at approximately ₹42,000 per month. Over 90 days, this compounds to ₹1.26 lakh in preventable losses.',
      inactionProjection: {
        week1: 'Excess inventory: 2,600 units',
        week4: 'Excess inventory: 3,100 units',
        week8: 'Storage capacity: 92% (constraint warning)',
        week12: 'Emergency liquidation likely (projected 40% loss)',
        totalCost: '₹1.26 lakh over 12 weeks',
        comparisonWithAction: 'Cost if action taken: ₹10,500 (savings: ₹1.15 lakh)'
      },
      whatSystemCannotSee: 'Upcoming bulk orders or special events unless explicitly entered into the system.'
    },
    
    impact: {
      value: '₹42,000',
      description: 'margin loss',
      timeframe: 'per month'
    },
    
    recommendation: {
      id: 'rec-001',
      summary: 'Reduce prep quantity by 12% for the next 7 days',
      duration: '7 days',
      expectedOutcome: 'Margin stabilization and wastage reduction. Expected recovery of approximately ₹10,500 in the first week.',
      riskLevel: 'low',
      rollbackAvailable: true,
      rollbackWindow: '48 hours',
      rollbackImpact: {
        exposure: '₹8,000',
        recoveryRate: '85%',
        description: 'Maximum financial risk during the rollback window if demand unexpectedly spikes.'
      },
      willChange: [
        'Prep quantity: reduced by 12%',
        'Procurement orders: adjusted accordingly',
        'Duration: 7 days'
      ],
      willNotChange: [
        'Base price',
        'Other outlets',
        'Vendor contracts',
        'Menu items'
      ],
      riskExplanation: {
        sources: [
          'Demand variability: actual demand may differ from forecast',
          'Operational lag: changes apply with 4-6 hour delay'
        ],
        whatCouldGoWrong: [
          'Stockout if demand unexpectedly spikes',
          'Slight service delays during peak hours'
        ],
        worstCase: 'Maximum downside capped at ₹8,000 due to rollback window.',
        whyAcceptable: 'In 14 of 17 similar cases, recovered value exceeded loss.'
      },
      parameters: [
        {
          id: 'param-reduction',
          label: 'Reduction percentage',
          value: 12,
          unit: '%',
          min: 5,
          max: 25,
          description: 'How much to reduce prep quantities'
        },
        {
          id: 'param-duration',
          label: 'Duration',
          value: 7,
          unit: 'days',
          min: 3,
          max: 14,
          description: 'How long to apply this adjustment'
        }
      ]
    },
    
    similarCases: {
      count: 17,
      successRate: 82,
      mostSimilar: {
        id: 'case-2024-oct',
        description: 'SKU #1892 (Oct 2024) - Excess perishables, 520 units',
        outcome: 'Recovered ₹51,000 of ₹72,000 (71% recovery)'
      }
    }
  },
  {
    id: 'decision-002',
    type: 'labor',
    stage: 'pending',
    
    insight: {
      title: 'Staff overtime trending above threshold',
      state: 'Labor cost deviation in Region B',
      priority: 'high',
      confidence: {
        overall: 79,
        dataQuality: 85,
        modelPerformance: 76,
        contextualFactors: 72
      },
      detectedAt: '1 day ago',
      momentum: 'stable',
      urgencyWindow: 'Action recommended within 7 days'
    },
    
    context: {
      whatHappened: 'Peak customer traffic times have shifted, but staff scheduling has not been updated to match. This is causing overtime during actual peaks while regular hours are underutilized.',
      whyItMatters: 'Excess labor cost without improvement in service quality. The misalignment will persist until schedules are adjusted.',
      evidence: [
        { id: 'ev-5', statement: 'Overtime hours up 18% this month', metric: '+18%', trend: 'up' },
        { id: 'ev-6', statement: 'Peak traffic shifted by 2 hours', trend: 'neutral' },
        { id: 'ev-7', statement: 'Total customer volume unchanged', trend: 'neutral' }
      ],
      inactionConsequence: 'Continued excess labor spend of ₹28,000 per month with no improvement in service levels.',
      whatSystemCannotSee: 'Staff preferences, upcoming PTO requests, or informal scheduling arrangements.'
    },
    
    impact: {
      value: '₹28,000',
      description: 'excess labor cost',
      timeframe: 'per month'
    },
    
    recommendation: {
      id: 'rec-002',
      summary: 'Adjust shift schedules to align with new traffic patterns',
      duration: '14 days',
      expectedOutcome: 'Reduce overtime by 15%, saving approximately ₹4,200 per week while maintaining service quality.',
      riskLevel: 'low',
      rollbackAvailable: true,
      rollbackWindow: '24 hours',
      willChange: [
        'Shift start times: adjusted by 2 hours',
        'Peak hour staffing: redistributed'
      ],
      willNotChange: [
        'Total staff hours',
        'Pay rates',
        'Break policies'
      ],
      parameters: [
        {
          id: 'param-shift',
          label: 'Shift adjustment',
          value: 2,
          unit: 'hours',
          min: 1,
          max: 4,
          description: 'Hours to shift peak staffing'
        }
      ]
    }
  },
  {
    id: 'decision-003',
    type: 'inventory',
    stage: 'pending',
    
    insight: {
      title: 'Perishable stock at Outlet 12 will expire soon',
      state: 'Current sales velocity cannot clear inventory before expiry',
      priority: 'critical',
      confidence: {
        overall: 92,
        dataQuality: 95,
        modelPerformance: 90,
        contextualFactors: 88
      },
      detectedAt: '4 hours ago',
      momentum: 'accelerating',
      urgencyWindow: 'Action recommended within 18 hours'
    },
    
    context: {
      whatHappened: 'Inventory rose from 1,200 → 2,400 units over 9 days. Sales velocity dropped after festival demand normalized, while procurement remained unchanged.',
      whyItMatters: 'Current sales velocity cannot clear inventory before expiry. This will result in direct write-off unless action is taken.',
      evidence: [
        { id: 'ev-20', statement: 'Excess inventory of SKU #4821', metric: '2,400 units', trend: 'up' },
        { id: 'ev-21', statement: 'Sales velocity dropped 32% vs baseline', metric: '-32%', trend: 'down' },
        { id: 'ev-22', statement: 'Expiry date: 5 days', metric: '5 days', trend: 'down' }
      ],
      inactionConsequence: 'Estimated loss if ignored: ₹6.8L. Full inventory write-off likely within 5 days.',
      inactionProjection: {
        week1: 'Write-off of 1,800 units',
        totalCost: '₹6.8L immediate loss',
        comparisonWithAction: 'With markdown + donation: recover ₹5.2L (76% recovery)'
      },
      whatSystemCannotSee: 'Pending corporate promotions or regional events that could spike demand.'
    },
    
    impact: {
      value: '₹6.8L',
      description: 'potential write-off',
      timeframe: 'within 5 days'
    },
    
    recommendation: {
      id: 'rec-003a',
      summary: 'Emergency markdown 30% + partner donation for excess units',
      duration: '5 days',
      expectedOutcome: 'Recover ₹5.2L of ₹6.8L potential loss (76% recovery rate).',
      riskLevel: 'medium',
      rollbackAvailable: true,
      rollbackWindow: '24 hours',
      willChange: [
        'Price: ₹320 → ₹224 (30% off)',
        'Duration: 5 days',
        'Scope: Outlet 12 only',
        'Donation: 400 units to FoodBank Partner'
      ],
      willNotChange: [
        'Base price post-promotion',
        'Other outlets',
        'Vendor contracts'
      ],
      riskExplanation: {
        sources: [
          'Demand variability: uplift ranged from +18% to +41% in similar cases',
          'Brand perception: prolonged discounting may affect perception'
        ],
        whatCouldGoWrong: [
          'Discount fails to lift sales sufficiently',
          'Competitor pricing neutralizes impact'
        ],
        worstCase: 'Maximum downside capped at ₹1.6L due to donation fallback.',
        whyAcceptable: 'In 11 of 14 similar cases, recovered value exceeded projected loss.'
      },
      parameters: [
        {
          id: 'param-markdown',
          label: 'Markdown percentage',
          value: 30,
          unit: '%',
          min: 15,
          max: 45,
          description: 'Discount to apply'
        },
        {
          id: 'param-donation',
          label: 'Units to donate',
          value: 400,
          unit: 'units',
          min: 100,
          max: 800,
          description: 'Units to donate to partner'
        }
      ]
    },
    
    similarCases: {
      count: 14,
      successRate: 78,
      mostSimilar: {
        id: 'case-2024-aug',
        description: 'SKU #3921 (Aug 2024) - Dairy surplus, 680 units',
        outcome: 'Recovered ₹4.1L of ₹5.8L (71% recovery)'
      }
    }
  },
  {
    id: 'decision-004',
    type: 'inventory',
    stage: 'executing',
    
    insight: {
      title: 'Vendor delivery delays impacting stock',
      state: 'Supply reliability deviation',
      priority: 'medium',
      confidence: {
        overall: 72,
        dataQuality: 80,
        modelPerformance: 68,
        contextualFactors: 65
      },
      detectedAt: '3 days ago',
      momentum: 'stable'
    },
    
    context: {
      whatHappened: 'Primary dairy vendor showing consistent 1-2 day delays. No communication about supply chain issues from vendor side.',
      whyItMatters: 'Risk of stockout is increasing. May require emergency procurement at premium prices.',
      evidence: [
        { id: 'ev-8', statement: 'Average delivery delay: 1.4 days', metric: '+1.4d', trend: 'up' },
        { id: 'ev-9', statement: '3 near-stockout events this month', trend: 'up' },
        { id: 'ev-10', statement: 'Backup vendor available and vetted', trend: 'neutral' }
      ],
      inactionConsequence: 'Stockout probability increases to 40% within 2 weeks, potentially impacting customer experience and forcing premium procurement.',
      whatSystemCannotSee: 'Internal vendor logistics issues or regional supply disruptions.'
    },
    
    impact: {
      value: '₹15,000',
      description: 'potential stockout risk',
      timeframe: 'this month'
    },
    
    recommendation: {
      id: 'rec-004',
      summary: 'Increase safety stock by 20% and initiate backup vendor',
      duration: '14 days',
      expectedOutcome: 'Eliminate stockout risk while vendor reliability is assessed.',
      riskLevel: 'low',
      rollbackAvailable: true,
      rollbackWindow: '72 hours',
      willChange: [
        'Safety stock level: +20%',
        'Backup vendor: activated'
      ],
      willNotChange: [
        'Primary vendor relationship',
        'Product quality standards',
        'Pricing agreements'
      ],
      parameters: [
        {
          id: 'param-stock',
          label: 'Safety stock increase',
          value: 20,
          unit: '%',
          min: 10,
          max: 40,
          description: 'Additional buffer inventory'
        }
      ]
    },
    
    execution: {
      stage: 'in_progress',
      trajectory: 'on_track',
      startedAt: '1 day ago',
      progressDescription: 'Safety stock adjustment applied. Backup vendor contacted and confirmed availability.',
      observedImpact: 'Early indicators positive: No near-stockout events in last 24 hours.',
      predictedVsActual: {
        predicted: '0 stockouts by Day 7',
        actual: '0 stockouts so far (Day 1)',
        variance: 'On track'
      },
      earlyWarnings: []
    },
    
    approvedBy: 'Operations Manager',
    approvedAt: '1 day ago'
  },
  {
    id: 'decision-005',
    type: 'pricing',
    stage: 'executing',
    
    insight: {
      title: 'Promotional discount clearing excess inventory',
      state: 'Active clearance in progress',
      priority: 'high',
      confidence: {
        overall: 88,
        dataQuality: 92,
        modelPerformance: 86,
        contextualFactors: 82
      },
      detectedAt: '2 days ago',
      momentum: 'improving'
    },
    
    context: {
      whatHappened: 'Excess inventory of seasonal items requiring clearance before end of season.',
      whyItMatters: 'Time-sensitive opportunity to recover value before items become obsolete.',
      evidence: [
        { id: 'ev-11', statement: 'Inventory clearance rate: 12% per day', metric: '12%/day', trend: 'up' },
        { id: 'ev-12', statement: 'Target: 80% clearance in 7 days', trend: 'neutral' }
      ],
      inactionConsequence: 'Full write-off of remaining inventory if not cleared by season end.'
    },
    
    impact: {
      value: '₹32,000',
      description: 'potential recovery',
      timeframe: 'this week'
    },
    
    recommendation: {
      id: 'rec-005',
      summary: 'Apply 25% markdown to seasonal items for 5 days',
      duration: '5 days',
      expectedOutcome: 'Clear 80% of seasonal inventory, recovering ₹32,000.',
      riskLevel: 'low',
      rollbackAvailable: true,
      rollbackWindow: '24 hours',
      willChange: ['Price: 25% discount', 'Duration: 5 days'],
      willNotChange: ['Non-seasonal items', 'Regular pricing strategy'],
      parameters: []
    },
    
    execution: {
      stage: 'in_progress',
      trajectory: 'on_track',
      startedAt: '2 days ago',
      progressDescription: 'Markdown applied successfully. Sales tracking 6% above expected.',
      observedImpact: '42% of target inventory cleared in first 2 days.',
      predictedVsActual: {
        predicted: '40% cleared by Day 2',
        actual: '42% cleared by Day 2',
        variance: '+5% ahead of forecast'
      },
      earlyWarnings: []
    },
    
    approvedBy: 'Regional Manager',
    approvedAt: '2 days ago'
  },
  {
    id: 'decision-006',
    type: 'operations',
    stage: 'deferred',
    
    insight: {
      title: 'Equipment maintenance scheduling optimization',
      state: 'Preventive maintenance window available',
      priority: 'medium',
      confidence: {
        overall: 75,
        dataQuality: 82,
        modelPerformance: 70,
        contextualFactors: 68
      },
      detectedAt: '5 days ago',
      momentum: 'stable'
    },
    
    context: {
      whatHappened: 'Preventive maintenance for kitchen equipment is due. Optimal window identified based on traffic patterns.',
      whyItMatters: 'Scheduling maintenance during low-traffic periods minimizes operational disruption.',
      evidence: [
        { id: 'ev-13', statement: 'Equipment due for service in 10 days', trend: 'neutral' },
        { id: 'ev-14', statement: 'Tuesday 2-5 PM is lowest traffic window', trend: 'neutral' }
      ],
      inactionConsequence: 'If maintenance is not scheduled proactively, emergency repairs may be needed during peak hours.'
    },
    
    impact: {
      value: '₹5,000',
      description: 'maintenance cost',
      timeframe: 'one-time'
    },
    
    recommendation: {
      id: 'rec-006',
      summary: 'Schedule preventive maintenance for Tuesday 2-5 PM',
      duration: '3 hours',
      expectedOutcome: 'Complete maintenance with zero operational disruption.',
      riskLevel: 'low',
      rollbackAvailable: true,
      rollbackWindow: '24 hours',
      willChange: ['Maintenance scheduled'],
      willNotChange: ['Regular operations', 'Menu availability'],
      parameters: []
    },
    
    deferredUntil: 'Tomorrow',
    deferredReason: 'Need to confirm with maintenance team availability'
  }
];

// Helper functions - will map to API calls later
export function getDecisionById(id: string): Decision | undefined {
  return mockDecisions.find(d => d.id === id);
}

export function getPendingDecisions(): Decision[] {
  return mockDecisions.filter(d => d.stage === 'pending');
}

export function getActiveExecutions(): Decision[] {
  return mockDecisions.filter(d => d.stage === 'executing');
}

export function getCompletedDecisions(): Decision[] {
  return mockDecisions.filter(d => d.stage === 'completed');
}

export function getDeferredDecisions(): Decision[] {
  return mockDecisions.filter(d => d.stage === 'deferred');
}

export function getDismissedDecisions(): Decision[] {
  return mockDecisions.filter(d => d.stage === 'dismissed');
}

export function getCriticalDecisions(): Decision[] {
  return mockDecisions.filter(d => d.stage === 'pending' && d.insight.priority === 'critical');
}
