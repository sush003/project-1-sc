import { useState, useEffect, useMemo } from 'react';
import { AlertTriangle, Info, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useIntent } from '@/context/IntentContext';
import { ActionParameter } from '@/types/decision';
import { 
  ParameterRange, 
  getParameterSafetyLevel, 
  getParameterWarning, 
  getSafetyLevelColors 
} from '@/types/parameter-safety';
import { cn } from '@/lib/utils';

interface ParameterSliderProps {
  parameter: ActionParameter;
  value: number;
  onChange: (value: number) => void;
  onAcknowledgeUnsafe?: (acknowledged: boolean) => void;
  className?: string;
}

export function ParameterSlider({
  parameter,
  value,
  onChange,
  onAcknowledgeUnsafe,
  className
}: ParameterSliderProps) {
  const { currentIntent } = useIntent();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [unsafeAcknowledged, setUnsafeAcknowledged] = useState(false);

  // Calculate parameter ranges based on intent and recommended value
  const range: ParameterRange = useMemo(() => {
    const recommendedValue = parameter.value;
    const { caution, unsafe } = currentIntent.warningThreshold;
    
    // Safe range is ± intent's caution threshold from recommended
    const safeDeviation = (recommendedValue * caution) / 100;
    // Caution extends to unsafe threshold
    const cautionDeviation = (recommendedValue * unsafe) / 100;
    
    return {
      safeMin: Math.max(parameter.min, recommendedValue - safeDeviation),
      safeMax: Math.min(parameter.max, recommendedValue + safeDeviation),
      cautionMin: Math.max(parameter.min, recommendedValue - cautionDeviation),
      cautionMax: Math.min(parameter.max, recommendedValue + cautionDeviation),
      absoluteMin: parameter.min,
      absoluteMax: parameter.max
    };
  }, [parameter, currentIntent]);

  const safetyLevel = getParameterSafetyLevel(value, range);
  const warning = getParameterWarning(safetyLevel, parameter.label, value, parameter.unit);
  const colors = getSafetyLevelColors(safetyLevel);

  // Reset acknowledgement when value changes back to safe
  useEffect(() => {
    if (safetyLevel === 'safe') {
      setUnsafeAcknowledged(false);
      onAcknowledgeUnsafe?.(true);
    } else if (safetyLevel === 'unsafe' && !unsafeAcknowledged) {
      onAcknowledgeUnsafe?.(false);
    }
  }, [safetyLevel, unsafeAcknowledged, onAcknowledgeUnsafe]);

  const handleAcknowledge = (checked: boolean) => {
    setUnsafeAcknowledged(checked);
    onAcknowledgeUnsafe?.(checked);
  };

  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  // Calculate visual markers for the slider track
  const safeMinPercent = ((range.safeMin - parameter.min) / (parameter.max - parameter.min)) * 100;
  const safeMaxPercent = ((range.safeMax - parameter.min) / (parameter.max - parameter.min)) * 100;

  return (
    <div className={cn('space-y-3', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-foreground">{parameter.label}</span>
          {parameter.description && (
            <p className="text-xs text-muted-foreground mt-0.5">{parameter.description}</p>
          )}
        </div>
        <span className={cn(
          'font-mono text-xl font-semibold transition-colors',
          safetyLevel === 'safe' ? 'text-foreground' : colors.text
        )}>
          {value}{parameter.unit}
        </span>
      </div>

      {/* Slider with visual range indicators */}
      <div className="relative pt-2">
        {/* Range indicator background */}
        <div className="absolute h-3 top-2 left-0 right-0 rounded-full overflow-hidden bg-muted">
          {/* Safe zone indicator */}
          <div 
            className="absolute h-full bg-success/30"
            style={{ 
              left: `${safeMinPercent}%`, 
              width: `${safeMaxPercent - safeMinPercent}%` 
            }}
          />
        </div>
        
        <Slider
          value={[value]}
          min={parameter.min}
          max={parameter.max}
          step={1}
          onValueChange={handleSliderChange}
          className={cn(
            'w-full relative z-10',
            safetyLevel !== 'safe' && '[&_[data-slot=thumb]]:ring-2',
            safetyLevel === 'caution' && '[&_[data-slot=thumb]]:ring-warning',
            safetyLevel === 'unsafe' && '[&_[data-slot=thumb]]:ring-critical'
          )}
        />
      </div>

      {/* Range labels */}
      <div className="flex justify-between items-center text-xs">
        <span className="text-muted-foreground">{parameter.min}{parameter.unit}</span>
        <div className="flex items-center gap-1 text-success">
          <span className="w-2 h-2 rounded-full bg-success/50" />
          <span>Recommended: {range.safeMin.toFixed(0)}–{range.safeMax.toFixed(0)}{parameter.unit}</span>
        </div>
        <span className="text-muted-foreground">{parameter.max}{parameter.unit}</span>
      </div>

      {/* Warning display */}
      {warning && (
        <div className={cn(
          'rounded-xl border p-4 space-y-3 transition-all',
          colors.bg,
          colors.border
        )}>
          <div className="flex items-start gap-3">
            <AlertTriangle className={cn('w-5 h-5 flex-shrink-0', colors.text)} />
            <div className="flex-1">
              <p className={cn('text-sm font-medium', colors.text)}>{warning.title}</p>
              <p className="text-sm text-foreground mt-1">{warning.message}</p>
            </div>
          </div>

          {/* Expandable details */}
          {warning.details && (
            <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-between text-xs h-8">
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    Why is this risky?
                  </span>
                  {detailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <p className="text-xs text-muted-foreground leading-relaxed pl-2 border-l-2 border-muted">
                  {warning.details}
                </p>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Unsafe acknowledgement */}
          {warning.requiresAcknowledgement && (
            <div className={cn(
              'flex items-center gap-3 p-3 rounded-lg border mt-2',
              unsafeAcknowledged ? 'bg-card border-border' : 'bg-critical/5 border-critical/30'
            )}>
              <Checkbox
                id={`ack-${parameter.id}`}
                checked={unsafeAcknowledged}
                onCheckedChange={handleAcknowledge}
                className={cn(
                  unsafeAcknowledged ? 'border-success data-[state=checked]:bg-success' : 'border-critical'
                )}
              />
              <label 
                htmlFor={`ack-${parameter.id}`} 
                className="text-sm text-foreground cursor-pointer select-none"
              >
                I understand the risks of this adjustment
              </label>
              {unsafeAcknowledged && <Check className="w-4 h-4 text-success ml-auto" />}
            </div>
          )}
        </div>
      )}

      {/* Intent context */}
      {safetyLevel !== 'safe' && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          Warning thresholds based on "{currentIntent.label}" intent
        </p>
      )}
    </div>
  );
}
