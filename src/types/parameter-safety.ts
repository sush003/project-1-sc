// KORAVO Parameter Safety Types
// Defines safety ranges and warning levels for adjustable parameters

export type SafetyLevel = 'safe' | 'caution' | 'unsafe';

export interface ParameterRange {
  // Recommended (safe) range
  safeMin: number;
  safeMax: number;
  // Caution range (higher risk)
  cautionMin?: number;
  cautionMax?: number;
  // Absolute limits
  absoluteMin: number;
  absoluteMax: number;
}

export interface ParameterWarning {
  level: SafetyLevel;
  title: string;
  message: string;
  details?: string;
  requiresAcknowledgement?: boolean;
}

// Get safety level for a given value within a parameter range
export function getParameterSafetyLevel(
  value: number,
  range: ParameterRange
): SafetyLevel {
  if (value >= range.safeMin && value <= range.safeMax) {
    return 'safe';
  }
  
  const cautionMin = range.cautionMin ?? range.safeMin - (range.safeMax - range.safeMin) * 0.3;
  const cautionMax = range.cautionMax ?? range.safeMax + (range.safeMax - range.safeMin) * 0.3;
  
  if (value >= cautionMin && value <= cautionMax) {
    return 'caution';
  }
  
  return 'unsafe';
}

// Generate warning message based on safety level and context
export function getParameterWarning(
  level: SafetyLevel,
  parameterName: string,
  value: number,
  unit: string
): ParameterWarning | null {
  if (level === 'safe') {
    return null;
  }
  
  if (level === 'caution') {
    return {
      level: 'caution',
      title: 'Outside recommended range',
      message: `Setting ${parameterName.toLowerCase()} to ${value}${unit} is higher than the system's recommended range.`,
      details: 'This adjustment may affect expected outcomes. The system has less historical data at this level, which means predictions carry more uncertainty.'
    };
  }
  
  return {
    level: 'unsafe',
    title: 'Exceeds confidence range',
    message: `This adjustment exceeds the system's confidence range and may increase service disruption risk.`,
    details: 'At this level, the system cannot reliably predict outcomes. Historical data shows higher variance in results. Consider the potential consequences carefully before proceeding.',
    requiresAcknowledgement: true
  };
}

// Get color classes for safety level
export function getSafetyLevelColors(level: SafetyLevel): {
  bg: string;
  border: string;
  text: string;
  sliderTrack?: string;
} {
  switch (level) {
    case 'safe':
      return {
        bg: 'bg-success/10',
        border: 'border-success/30',
        text: 'text-success',
        sliderTrack: 'bg-success'
      };
    case 'caution':
      return {
        bg: 'bg-warning/10',
        border: 'border-warning/30',
        text: 'text-warning',
        sliderTrack: 'bg-warning'
      };
    case 'unsafe':
      return {
        bg: 'bg-critical/10',
        border: 'border-critical/30',
        text: 'text-critical',
        sliderTrack: 'bg-critical'
      };
  }
}
