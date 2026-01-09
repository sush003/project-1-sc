import { cn } from '@/lib/utils';
import { Evidence } from '@/types/decision';
import { TrendingUp, TrendingDown, Minus, CheckCircle2 } from 'lucide-react';

interface EvidenceListProps {
  evidence: Evidence[];
  className?: string;
}

export function EvidenceList({ evidence, className }: EvidenceListProps) {
  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-critical" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-warning" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <ul className={cn('space-y-3', className)}>
      {evidence.map((item) => (
        <li key={item.id} className="flex items-start gap-3 group">
          <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-success/20 transition-colors">
            <CheckCircle2 className="w-3.5 h-3.5 text-success" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground leading-relaxed">{item.statement}</p>
            {item.metric && (
              <div className="flex items-center gap-2 mt-1">
                {getTrendIcon(item.trend)}
                <span className="font-mono text-xs text-muted-foreground">{item.metric}</span>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
