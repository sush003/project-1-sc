import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Confidence } from '@/types/decision';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface ConfidenceMeterProps {
  value: number | Confidence;
  size?: 'sm' | 'md' | 'lg';
  showExplanation?: boolean;
  showBreakdown?: boolean;
  className?: string;
}

export function ConfidenceMeter({ 
  value, 
  size = 'md', 
  showExplanation = false,
  showBreakdown = false,
  className 
}: ConfidenceMeterProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const isDetailed = typeof value === 'object';
  const overallValue = isDetailed ? value.overall : value;

  const getConfidenceLevel = (val: number) => {
    if (val >= 85) return { label: 'High confidence', color: 'bg-success', textColor: 'text-success' };
    if (val >= 70) return { label: 'Moderate confidence', color: 'bg-warning', textColor: 'text-warning' };
    return { label: 'Lower confidence', color: 'bg-critical', textColor: 'text-critical' };
  };

  const { label, color, textColor } = getConfidenceLevel(overallValue);

  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={cn('space-y-2', className)}>
      {/* Default collapsed view */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">System Confidence</span>
        <span className={cn('font-mono text-sm font-medium', textColor)}>
          {overallValue}%
        </span>
      </div>
      
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', heights[size])}>
        <div 
          className={cn('h-full rounded-full transition-all duration-700 ease-out', color)}
          style={{ width: `${overallValue}%` }}
        />
      </div>
      
      {showExplanation && (
        <p className="text-xs text-muted-foreground">{label}</p>
      )}

      {/* Expandable explanation */}
      {(showBreakdown || isDetailed) && (
        <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between h-8 text-xs px-2 mt-1">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <HelpCircle className="w-3.5 h-3.5" />
                Why this confidence level?
              </span>
              {detailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <div className="space-y-4 p-3 bg-muted/30 rounded-lg border border-border">
              {/* Explanation */}
              {isDetailed && value.explanation && (
                <p className="text-sm text-muted-foreground">{value.explanation}</p>
              )}
              
              {/* Breakdown */}
              {showBreakdown && isDetailed && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Component breakdown</p>
                  <div className="space-y-2">
                    {value.dataQuality !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Data Quality</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-info rounded-full" 
                              style={{ width: `${value.dataQuality}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-foreground w-8">{value.dataQuality}%</span>
                        </div>
                      </div>
                    )}
                    {value.modelPerformance !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Model Performance</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-info rounded-full" 
                              style={{ width: `${value.modelPerformance}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-foreground w-8">{value.modelPerformance}%</span>
                        </div>
                      </div>
                    )}
                    {value.contextualFactors !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Context Completeness</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-info rounded-full" 
                              style={{ width: `${value.contextualFactors}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-foreground w-8">{value.contextualFactors}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* What could change this */}
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium">This could change if:</span> new data arrives, patterns shift, or context is updated.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}