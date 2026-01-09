import { useState } from 'react';
import { cn } from '@/lib/utils';
import { RiskLevel } from '@/types/decision';
import { ShieldCheck, Shield, ShieldAlert, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

interface RiskIndicatorProps {
  risk: RiskLevel;
  showDescription?: boolean;
  expandable?: boolean;
  className?: string;
}

const config = {
  low: {
    label: 'Low Risk',
    shortDescription: 'Minimal potential for negative impact',
    detailedDescription: 'This action has been evaluated and carries minimal risk based on historical data and current conditions.',
    factors: [
      'Similar actions have succeeded 85%+ of the time',
      'Rollback options are available',
      'Impact is contained to a limited scope'
    ],
    whatCouldChange: 'Risk level may increase if market conditions shift significantly or if combined with other active interventions.',
    icon: ShieldCheck,
    styles: 'bg-success/15 text-success border-success/30'
  },
  medium: {
    label: 'Medium Risk',
    shortDescription: 'Some potential for impact. Monitor closely.',
    detailedDescription: 'This action carries moderate risk. While likely to succeed, there are factors that could affect the outcome.',
    factors: [
      'Historical success rate between 65-85%',
      'Some uncertainty in current conditions',
      'Monitoring recommended after execution'
    ],
    whatCouldChange: 'Risk could decrease with more data, or increase if conditions deteriorate.',
    icon: Shield,
    styles: 'bg-warning/15 text-warning border-warning/30'
  },
  high: {
    label: 'High Risk',
    shortDescription: 'Significant potential impact. Consider carefully.',
    detailedDescription: 'This action carries higher risk and should be carefully considered. The system still recommends it because potential benefits outweigh risks.',
    factors: [
      'Higher uncertainty in predictions',
      'Larger potential impact if unsuccessful',
      'May require closer monitoring and faster response'
    ],
    whatCouldChange: 'Risk level reflects current uncertainty. More data or changed conditions could affect this assessment.',
    icon: ShieldAlert,
    styles: 'bg-critical/15 text-critical border-critical/30'
  }
};

export function RiskIndicator({ risk, showDescription = false, expandable = false, className }: RiskIndicatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { label, shortDescription, detailedDescription, factors, whatCouldChange, icon: Icon, styles } = config[risk];

  // Simple badge view
  if (!showDescription && !expandable) {
    return (
      <span className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border',
        styles,
        className
      )}>
        <Icon className="w-3.5 h-3.5" />
        {label}
      </span>
    );
  }

  // Expandable view with progressive disclosure
  if (expandable) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
        <div className={cn(
          'rounded-xl border p-4 transition-all',
          isOpen ? styles.replace('/15', '/10') : styles.replace('/15', '/5'),
          styles.split(' ').find(s => s.startsWith('border-'))
        )}>
          <CollapsibleTrigger asChild>
            <button className="w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <span className="text-sm font-medium block">{label}</span>
                  <span className="text-xs text-muted-foreground">{shortDescription}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <HelpCircle className="w-3.5 h-3.5" />
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 mt-4 border-t border-border/50">
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">{detailedDescription}</p>
              
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Why this risk level?</p>
                <ul className="space-y-1.5">
                  {factors.map((factor, i) => (
                    <li key={i} className="text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0 opacity-50" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-background/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">When this could change:</span> {whatCouldChange}
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    );
  }

  // Simple description view (non-expandable)
  return (
    <div className={cn('rounded-lg border p-3', styles.replace('bg-', 'bg-').replace('/15', '/5'), className)}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <p className="text-xs text-muted-foreground pl-6">{shortDescription}</p>
    </div>
  );
}