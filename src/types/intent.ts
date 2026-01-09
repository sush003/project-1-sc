// KORAVO Intent Types - Defines system operating modes
// Intent controls risk tolerance, warning thresholds, and system behavior

export type IntentType = 
  | 'margin_protection'
  | 'cost_containment'
  | 'service_quality'
  | 'stability_mode';

export interface IntentConfig {
  id: IntentType;
  label: string;
  description: string;
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  warningThreshold: {
    // Percentage deviation that triggers caution
    caution: number;
    // Percentage deviation that triggers unsafe warning
    unsafe: number;
  };
  priorityFocus: string;
  tradeoffs: string[];
}

export const INTENTS: Record<IntentType, IntentConfig> = {
  margin_protection: {
    id: 'margin_protection',
    label: 'Margin Protection',
    description: 'Prioritizes profitability and cost control. System will recommend conservative actions that protect margins even at the cost of short-term growth.',
    riskTolerance: 'conservative',
    warningThreshold: {
      caution: 15,
      unsafe: 25
    },
    priorityFocus: 'Profitability over volume',
    tradeoffs: [
      'May recommend lower inventory levels',
      'Conservative on promotions',
      'Prefers cost reduction over revenue growth'
    ]
  },
  cost_containment: {
    id: 'cost_containment',
    label: 'Cost Containment',
    description: 'Focuses on reducing operational costs. System will prioritize efficiency and waste reduction, potentially at the cost of service speed.',
    riskTolerance: 'moderate',
    warningThreshold: {
      caution: 20,
      unsafe: 35
    },
    priorityFocus: 'Efficiency over speed',
    tradeoffs: [
      'May accept longer service times',
      'Aggressive on waste reduction',
      'Prefers lean operations'
    ]
  },
  service_quality: {
    id: 'service_quality',
    label: 'Service Quality Protection',
    description: 'Prioritizes customer experience and service reliability. System will maintain higher buffers and recommend actions that protect service levels.',
    riskTolerance: 'conservative',
    warningThreshold: {
      caution: 10,
      unsafe: 20
    },
    priorityFocus: 'Customer experience over cost',
    tradeoffs: [
      'Higher safety stock levels',
      'More conservative staffing',
      'May accept higher operational costs'
    ]
  },
  stability_mode: {
    id: 'stability_mode',
    label: 'Stability Mode',
    description: 'Minimal intervention mode. System will only surface critical issues and recommend cautious, easily reversible actions.',
    riskTolerance: 'conservative',
    warningThreshold: {
      caution: 8,
      unsafe: 15
    },
    priorityFocus: 'Predictability over optimization',
    tradeoffs: [
      'Fewer recommendations',
      'Only critical issues surfaced',
      'Very conservative parameters'
    ]
  }
};

export const getIntent = (intentId: IntentType): IntentConfig => {
  return INTENTS[intentId] || INTENTS.margin_protection;
};
