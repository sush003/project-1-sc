import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ExplainerProps {
  /** Short summary shown by default (1-2 lines) */
  summary: string;
  /** Detailed explanation shown on expand */
  details: string;
  /** Optional: What factors were considered */
  factors?: string[];
  /** Optional: What assumptions exist */
  assumptions?: string[];
  /** Optional: What the system does not know */
  unknowns?: string[];
  /** Optional: When this might change */
  changeConditions?: string;
  /** Style variant */
  variant?: 'inline' | 'card' | 'tooltip';
  /** Icon type */
  icon?: 'help' | 'info';
  /** Custom class */
  className?: string;
}

export function Explainer({
  summary,
  details,
  factors,
  assumptions,
  unknowns,
  changeConditions,
  variant = 'inline',
  icon = 'help',
  className
}: ExplainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const IconComponent = icon === 'help' ? HelpCircle : Info;

  // Tooltip variant - for very compact spaces
  if (variant === 'tooltip') {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <IconComponent className="w-3.5 h-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-sm">{summary}</p>
          <p className="text-xs text-muted-foreground mt-1">{details}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  // Inline variant - expand in place
  if (variant === 'inline') {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
        <div className="flex items-start gap-2">
          <p className="text-sm text-muted-foreground flex-1">{summary}</p>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground">
              {isOpen ? (
                <>Less <ChevronUp className="w-3 h-3 ml-1" /></>
              ) : (
                <>Explain <ChevronDown className="w-3 h-3 ml-1" /></>
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="pt-3">
          <div className="space-y-3 text-sm pl-3 border-l-2 border-muted">
            <p className="text-foreground">{details}</p>
            
            {factors && factors.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Factors considered</p>
                <ul className="space-y-1 text-muted-foreground">
                  {factors.map((factor, i) => (
                    <li key={i} className="text-sm">• {factor}</li>
                  ))}
                </ul>
              </div>
            )}

            {assumptions && assumptions.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Assumptions</p>
                <ul className="space-y-1 text-muted-foreground">
                  {assumptions.map((assumption, i) => (
                    <li key={i} className="text-sm">• {assumption}</li>
                  ))}
                </ul>
              </div>
            )}

            {unknowns && unknowns.length > 0 && (
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">What the system doesn't know</p>
                <ul className="space-y-1 text-muted-foreground">
                  {unknowns.map((unknown, i) => (
                    <li key={i} className="text-sm">• {unknown}</li>
                  ))}
                </ul>
              </div>
            )}

            {changeConditions && (
              <p className="text-xs text-muted-foreground italic">
                This may change if: {changeConditions}
              </p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  // Card variant - for more prominent explanations
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <div className={cn(
        'rounded-xl border p-4 transition-all',
        isOpen ? 'bg-muted/30 border-primary/20' : 'bg-card border-border'
      )}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
              <IconComponent className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground">{summary}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {isOpen ? 'Less' : 'Why?'}
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground leading-relaxed">{details}</p>
            
            {factors && factors.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">How this was derived</p>
                <ul className="space-y-1.5">
                  {factors.map((factor, i) => (
                    <li key={i} className="text-sm text-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {unknowns && unknowns.length > 0 && (
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                <p className="text-xs text-warning uppercase tracking-wide mb-2">Limitations</p>
                <ul className="space-y-1.5 text-muted-foreground">
                  {unknowns.map((unknown, i) => (
                    <li key={i} className="text-sm">• {unknown}</li>
                  ))}
                </ul>
              </div>
            )}

            {changeConditions && (
              <p className="text-xs text-muted-foreground border-t border-border pt-3 mt-3">
                <span className="font-medium">When this could change:</span> {changeConditions}
              </p>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
