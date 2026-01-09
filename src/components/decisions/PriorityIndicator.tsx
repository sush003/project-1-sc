import { cn } from '@/lib/utils';
import { Priority } from '@/types/decision';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

interface PriorityIndicatorProps {
  priority: Priority;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const config = {
  critical: {
    label: 'Critical',
    icon: AlertCircle,
    styles: 'bg-critical/15 text-critical border-critical/30',
    pulse: true,
    description: 'Immediate action required. Significant impact on business KPIs expected if ignored.',
    action: 'Review and decide within 1 hour'
  },
  high: {
    label: 'High Priority',
    icon: AlertTriangle,
    styles: 'bg-high/15 text-high border-high/30',
    pulse: false,
    description: 'Urgent attention needed. Potential risks to stability or performance.',
    action: 'Review within 4 hours'
  },
  medium: {
    label: 'Medium',
    icon: Info,
    styles: 'bg-medium/15 text-medium border-medium/30',
    pulse: false,
    description: 'Monitoring recommended. Optimize when resources permit.',
    action: 'Review within 24 hours'
  }
};

const sizes = {
  sm: 'px-2 py-0.5 text-[10px] gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
  lg: 'px-3 py-1.5 text-sm gap-2'
};

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4'
};

export function PriorityIndicator({ 
  priority, 
  size = 'md', 
  showLabel = true,
  className 
}: PriorityIndicatorProps) {
  const { label, icon: Icon, styles, pulse, description, action } = config[priority];

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className={cn(
          'inline-flex items-center rounded-md font-medium border uppercase tracking-wide cursor-help transition-colors hover:bg-opacity-20',
          styles,
          sizes[size],
          pulse && 'animate-pulse-subtle',
          className
        )}>
          <Icon className={iconSizes[size]} />
          {showLabel && label}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon className={cn("w-4 h-4", styles.split(' ')[1])} />
            <h4 className="text-sm font-semibold">{label} Priority</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
          <div className="pt-2 border-t border-border mt-2">
            <span className="text-[10px] uppercase font-semibold text-muted-foreground">Suggested Action</span>
            <p className="text-xs font-medium text-foreground mt-0.5">{action}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
