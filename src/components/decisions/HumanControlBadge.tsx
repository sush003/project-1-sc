import { cn } from '@/lib/utils';
import { User, Shield } from 'lucide-react';

interface HumanControlBadgeProps {
  variant?: 'default' | 'prominent';
  className?: string;
}

export function HumanControlBadge({ variant = 'default', className }: HumanControlBadgeProps) {
  if (variant === 'prominent') {
    return (
      <div className={cn(
        'flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-xl p-4',
        className
      )}>
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
          <User className="w-5 h-5 text-accent" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Human Approval Required</p>
          <p className="text-xs text-muted-foreground">
            You are in control. The system recommends, you decide.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20',
      className
    )}>
      <Shield className="w-3.5 h-3.5 text-accent" />
      <span className="text-xs font-medium text-accent">Human Controlled</span>
    </div>
  );
}
