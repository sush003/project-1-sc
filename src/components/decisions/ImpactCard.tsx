import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

interface ImpactCardProps {
  value: string;
  description: string;
  timeframe: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function ImpactCard({ value, description, timeframe, trend = 'down', className }: ImpactCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-critical' : 'text-muted-foreground';

  return (
    <div className={cn(
      'bg-gradient-to-br from-critical/5 to-critical/10 border border-critical/20 rounded-xl p-4',
      className
    )}>
      {/* Default collapsed view */}
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-critical font-medium uppercase tracking-wide">
          Estimated Impact
        </span>
        <TrendIcon className={cn('w-4 h-4', trendColor)} />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </div>
      <span className="text-xs text-muted-foreground">{timeframe}</span>

      {/* Expandable explanation */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full justify-between h-8 text-xs px-2">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <HelpCircle className="w-3.5 h-3.5" />
              How was this calculated?
            </span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <div className="space-y-3 p-3 bg-background/50 rounded-lg border border-border text-sm">
            <p className="text-muted-foreground">
              This impact estimate is derived from historical patterns and current operational data.
            </p>
            
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Factors considered</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Current wastage rates and trends</li>
                <li>• Historical cost data for similar situations</li>
                <li>• Seasonal and demand adjustments</li>
              </ul>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Assumptions</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Current operational conditions persist</li>
                <li>• No external market disruptions</li>
                <li>• Standard vendor reliability</li>
              </ul>
            </div>

            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Accuracy range:</span> Actual impact may vary by ±20% based on conditions.
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
