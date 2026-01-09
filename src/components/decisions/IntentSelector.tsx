import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Target, ChevronDown, ChevronUp, Info, Check } from 'lucide-react';
import { useIntent } from '@/context/IntentContext';
import { IntentConfig, IntentType } from '@/types/intent';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface IntentSelectorProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export function IntentSelector({ variant = 'compact', className }: IntentSelectorProps) {
  const { currentIntent, setIntent, allIntents, intentJustChanged, clearIntentChange } = useIntent();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingIntent, setPendingIntent] = useState<IntentConfig | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleIntentSelect = (intent: IntentConfig) => {
    if (intent.id !== currentIntent.id) {
      setPendingIntent(intent);
    }
  };

  const confirmIntentChange = () => {
    if (pendingIntent) {
      setIntent(pendingIntent.id);
      setPendingIntent(null);
      setDialogOpen(false);
    }
  };

  const getRiskToleranceColor = (tolerance: string) => {
    switch (tolerance) {
      case 'conservative': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'aggressive': return 'text-critical';
      default: return 'text-muted-foreground';
    }
  };

  if (variant === 'compact') {
    return (
      <>
        <Button
          variant="ghost"
          className={cn(
            'h-auto py-2 px-3 justify-start gap-2',
            intentJustChanged && 'ring-2 ring-primary/50',
            className
          )}
          onClick={() => setDialogOpen(true)}
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Target className="w-4 h-4 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Current Intent</p>
            <p className="text-sm font-medium text-foreground">{currentIntent.label}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground ml-1" />
        </Button>

        {/* Intent Change Notification */}
        {intentJustChanged && createPortal(
          <div className="fixed top-4 left-[60%] -translate-x-1/2 z-[100]">
            <div className="animate-fade-in-down">
              <div className="bg-card border border-primary/30 rounded-lg px-4 py-3 shadow-lg flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Intent updated to {currentIntent.label}</p>
                  <p className="text-xs text-muted-foreground">Risk tolerance and warnings adjusted accordingly</p>
                </div>
                <Button variant="ghost" size="sm" onClick={clearIntentChange} className="ml-2">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* Intent Selection Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Select Operating Intent</DialogTitle>
              <DialogDescription className="flex items-start gap-2 pt-2">
                <Info className="w-4 h-4 text-info flex-shrink-0 mt-0.5" />
                <span>Intent defines what the system prioritizes and how risks are evaluated. Changing intent will update warning thresholds and recommendations.</span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2 py-4 max-h-[60vh] overflow-y-auto pr-2">
              {allIntents.map((intent) => (
                <button
                  key={intent.id}
                  onClick={() => handleIntentSelect(intent)}
                  className={cn(
                    'w-full p-4 rounded-xl border text-left transition-all',
                    intent.id === currentIntent.id
                      ? 'border-primary bg-primary/10'
                      : pendingIntent?.id === intent.id
                        ? 'border-warning bg-warning/10'
                        : 'border-border bg-card hover:border-muted-foreground/50'
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{intent.label}</span>
                    {intent.id === currentIntent.id && (
                      <span className="text-xs text-primary bg-primary/20 px-2 py-0.5 rounded">Current</span>
                    )}
                    {pendingIntent?.id === intent.id && (
                      <span className="text-xs text-warning bg-warning/20 px-2 py-0.5 rounded">Selected</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{intent.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-muted-foreground">
                      Risk tolerance: <span className={getRiskToleranceColor(intent.riskTolerance)}>{intent.riskTolerance}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {pendingIntent && (
              <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Changing to {pendingIntent.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">This will affect how risks and warnings are evaluated:</p>
                  </div>
                </div>
                <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
                      View tradeoffs
                      {detailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <ul className="space-y-1.5 text-xs text-muted-foreground pl-2">
                      {pendingIntent.tradeoffs.map((tradeoff, i) => (
                        <li key={i}>• {tradeoff}</li>
                      ))}
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => { setPendingIntent(null); setDialogOpen(false); }}>
                Cancel
              </Button>
              <Button onClick={confirmIntentChange} disabled={!pendingIntent}>
                Confirm Change
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // Full variant for settings page etc
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" />
        <h3 className="font-medium text-foreground">Operating Intent</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Intent defines what the system prioritizes and how risks are evaluated.
      </p>
      <div className="grid gap-3">
        {allIntents.map((intent) => (
          <button
            key={intent.id}
            onClick={() => setIntent(intent.id)}
            className={cn(
              'w-full p-4 rounded-xl border text-left transition-all',
              intent.id === currentIntent.id
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card hover:border-muted-foreground/50'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">{intent.label}</span>
              {intent.id === currentIntent.id && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{intent.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
