import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Decision, Momentum, Confidence } from '@/types/decision';
import { PriorityIndicator } from './PriorityIndicator';
import { ConfidenceMeter } from './ConfidenceMeter';
import { LifecycleIndicator } from './LifecycleIndicator';
import { cn } from '@/lib/utils';

interface DecisionCardProps {
  decision: Decision;
  index?: number;
  variant?: 'card' | 'editorial';
}

const momentumConfig: Record<Momentum, { label: string; icon: typeof TrendingUp; color: string }> = {
  accelerating: { label: 'Accelerating', icon: TrendingUp, color: 'text-critical' },
  degrading: { label: 'Degrading', icon: TrendingDown, color: 'text-warning' },
  stable: { label: 'Stable', icon: Minus, color: 'text-muted-foreground' },
  improving: { label: 'Improving', icon: TrendingDown, color: 'text-success' }
};

export function DecisionCard({ decision, index = 0, variant = 'card' }: DecisionCardProps) {
  const navigate = useNavigate();
  const { insight, impact, stage } = decision;
  
  const momentum = insight.momentum || 'stable';
  const MomentumIcon = momentumConfig[momentum].icon;
  
  // Get confidence value
  const confidenceValue = typeof insight.confidence === 'object' 
    ? insight.confidence.overall 
    : insight.confidence;

  if (variant === 'editorial') {
    return (
       <div 
         className={cn(
            "group py-6 border-b border-border/40 cursor-pointer transition-colors hover:bg-muted/30",
            "animate-fade-in-up flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
         )}
         style={{ animationDelay: `${index * 80}ms` }}
         onClick={() => navigate(`/decision/${decision.id}`)}
       >
          {/* Left Content */}
          <div className="flex-1 space-y-2">
             <div className="flex items-center gap-3">
               <PriorityIndicator priority={insight.priority} />
               <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{insight.detectedAt}</span>
               {insight.urgencyWindow && (
                 <span className="text-xs bg-warning/10 text-warning px-1.5 py-0.5 rounded flex items-center gap-1">
                   <Clock className="w-3 h-3" />
                   {insight.urgencyWindow}
                 </span>
               )}
             </div>
             
             <h3 className="text-2xl font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
               {insight.title}
               <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
             </h3>
             
             <p className="text-muted-foreground text-sm max-w-2xl">
               {insight.state}
             </p>
          </div>

          {/* Right/Bottom Metadata */}
          <div className="flex items-center gap-8 text-sm md:text-right">
             <div className="flex items-center gap-2 text-muted-foreground">
                <MomentumIcon className={cn("w-4 h-4", momentumConfig[momentum].color)} />
                <span className="hidden md:inline">{momentumConfig[momentum].label}</span>
             </div>
             
             <div className="min-w-[100px] text-right">
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Impact</div>
                <div className="font-mono text-foreground">{impact.value}</div>
             </div>

             <div className="flex flex-col items-center gap-1">
               <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Confidence</span>
               <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center bg-card group-hover:bg-primary/5 transition-colors">
                 <span className="text-sm font-bold text-primary">{Math.round(confidenceValue)}%</span>
               </div>
             </div>
          </div>
       </div>
    );
  }

  return (
    <Card 
      className={cn(
        'group cursor-pointer transition-all duration-300',
        'bg-card border-border hover:border-primary/30',
        'hover:shadow-[0_0_40px_hsl(38_92%_50%_/_0.08)]',
        'animate-fade-in-up',
        insight.priority === 'critical' && 'border-l-4 border-l-critical'
      )}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => navigate(`/decision/${decision.id}`)}
    >
      <CardContent className="p-6">
        {/* Header Row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <PriorityIndicator priority={insight.priority} />
              <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Detected {insight.detectedAt}
              </span>
              {/* Momentum indicator */}
              <span className={cn(
                'text-xs flex items-center gap-1',
                momentumConfig[momentum].color
              )}>
                <MomentumIcon className="w-3.5 h-3.5" />
                {momentumConfig[momentum].label}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
              {insight.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{insight.state}</p>
          </div>
          <LifecycleIndicator currentStage={stage} compact />
        </div>

        {/* Urgency Window */}
        {insight.urgencyWindow && (
          <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-warning/10 rounded-lg border border-warning/20">
            <AlertCircle className="w-4 h-4 text-warning flex-shrink-0" />
            <span className="text-sm text-warning font-medium">{insight.urgencyWindow}</span>
          </div>
        )}

        {/* Confidence & Impact */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-muted/30 rounded-xl p-4">
            <ConfidenceMeter value={confidenceValue} size="sm" />
          </div>
          <div className="bg-gradient-to-br from-critical/5 to-critical/10 border border-critical/20 rounded-xl p-4">
            <span className="text-[10px] text-critical font-medium uppercase tracking-wide block mb-1">
              Impact if ignored
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-lg font-semibold text-foreground">{impact.value}</span>
              <span className="text-xs text-muted-foreground">{impact.timeframe}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button 
          variant="ghost" 
          className="w-full justify-between text-primary hover:bg-primary/10 group/btn"
        >
          <span>Review this decision</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}
