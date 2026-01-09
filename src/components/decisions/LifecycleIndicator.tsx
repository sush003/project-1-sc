import { cn } from '@/lib/utils';
import { DecisionStage, DECISION_STAGES } from '@/types/decision';
import { Check } from 'lucide-react';

interface LifecycleIndicatorProps {
  currentStage: DecisionStage;
  compact?: boolean;
  className?: string;
}

// Main lifecycle stages for display (excluding deferred, dismissed, failed)
const stages: DecisionStage[] = ['pending', 'in_review', 'approved', 'executing', 'completed'];

export function LifecycleIndicator({ currentStage, compact = false, className }: LifecycleIndicatorProps) {
  const currentOrder = DECISION_STAGES[currentStage]?.order ?? 0;

  if (compact) {
    return (
      <div className={cn('flex items-center gap-1.5', className)}>
        {stages.map((stage) => {
          const stageOrder = DECISION_STAGES[stage].order;
          const isCompleted = stageOrder < currentOrder;
          const isCurrent = stage === currentStage;
          
          return (
            <div
              key={stage}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                isCompleted && 'bg-success',
                isCurrent && 'bg-primary ring-2 ring-primary/30',
                !isCompleted && !isCurrent && 'bg-muted'
              )}
              title={DECISION_STAGES[stage].label}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-between', className)}>
      {stages.map((stage, index) => {
        const stageInfo = DECISION_STAGES[stage];
        const stageOrder = stageInfo.order;
        const isCompleted = stageOrder < currentOrder;
        const isCurrent = stage === currentStage;
        const isLast = index === stages.length - 1;

        return (
          <div key={stage} className="flex items-center flex-1 last:flex-none">
            {/* Stage dot */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                  isCompleted && 'bg-success text-success-foreground',
                  isCurrent && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                  !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-medium">{stageOrder}</span>
                )}
              </div>
              <span className={cn(
                'text-xs mt-2 text-center max-w-[80px]',
                isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'
              )}>
                {stageInfo.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className={cn(
                'flex-1 h-0.5 mx-2 transition-all duration-300',
                isCompleted ? 'bg-success' : 'bg-muted'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
