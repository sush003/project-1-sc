import { useState } from 'react';
import { Eye, EyeOff, ChevronDown, ChevronUp, Activity, ShieldCheck, Filter, Clock } from 'lucide-react';
import { DecisionCard } from '@/components/decisions/DecisionCard';
import { Button } from '@/components/ui/button';
import { getPendingDecisions, getCriticalDecisions } from '@/data/decisions';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function InsightFeed() {
  const [focusMode, setFocusMode] = useState(true);
  const [showCollapsed, setShowCollapsed] = useState(false);
  
  const allPendingDecisions = getPendingDecisions();
  const criticalDecisions = getCriticalDecisions();
  
  // Focus mode: only critical (max 3), otherwise all pending
  const visibleDecisions = focusMode 
    ? criticalDecisions.slice(0, 3) 
    : allPendingDecisions;
  
  const collapsedCount = focusMode 
    ? allPendingDecisions.length - visibleDecisions.length 
    : 0;

  const today = new Date();

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 animate-fade-in">
      {/* Editorial Header */}
      <header className="mb-12 border-b-2 border-primary/10 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-destructive uppercase animate-pulse">
               <span className="w-2 h-2 rounded-full bg-destructive" />
               Live Briefing
             </div>
             <h1 className="text-5xl font-heading font-bold tracking-tight text-foreground">
               {format(today, 'EEEE, MMMM do')}
             </h1>
             <p className="text-xl text-muted-foreground font-light max-w-2xl leading-relaxed">
               Good afternoon. System integrity is <span className="text-success font-medium">optimal</span>. 
               {criticalDecisions.length > 0 
                 ? ` There are ${criticalDecisions.length} critical items requiring your judgment.`
                 : " No critical anomalies detected."}
             </p>
          </div>
          
          <div className="flex flex-col items-end gap-3">
             <div className="text-right">
                <div className="text-sm font-medium text-foreground">Sush</div>
                <div className="text-xs text-muted-foreground">Chief Operator</div>
             </div>
          </div>
        </div>
      </header>

      {/* System Status Ticker (Minimal) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 border border-border/40 rounded-lg overflow-hidden mb-12">
        <div className="bg-card p-4 flex flex-col justify-between h-24">
           <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
             <Activity className="w-3 h-3" /> System Load
           </span>
           <span className="text-2xl text-foreground">24%</span>
        </div>
        <div className="bg-card p-4 flex flex-col justify-between h-24">
           <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
             <ShieldCheck className="w-3 h-3" /> Security
           </span>
           <span className="text-2xl text-success">Secure</span>
        </div>
        <div className="bg-card p-4 flex flex-col justify-between h-24">
           <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
             <Clock className="w-3 h-3" /> Uptime
           </span>
           <span className="text-2xl text-foreground">99.9%</span>
        </div>
        <div className="bg-card p-4 flex flex-col justify-between h-24">
           <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-2">
             <Filter className="w-3 h-3" /> Pending
           </span>
           <span className="text-2xl text-foreground">{allPendingDecisions.length}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-foreground">
          {focusMode ? "Priority Decisions" : "All Decisions"}
        </h2>
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setFocusMode(!focusMode)}
            className="text-xs text-muted-foreground hover:text-foreground font-medium"
        >
            {focusMode ? (
              <span className="flex items-center gap-2"><Eye className="w-3 h-3" /> Show All</span>
            ) : (
              <span className="flex items-center gap-2"><EyeOff className="w-3 h-3" /> Focus Critical</span>
            )}
        </Button>
      </div>

      {/* Decision List */}
      <div className="space-y-0 border-t border-border/40">
        {visibleDecisions.map((decision, index) => (
          <DecisionCard key={decision.id} decision={decision} index={index} variant="editorial" />
        ))}
      </div>

      {/* Collapsed Insights */}
      {focusMode && collapsedCount > 0 && (
        <div className="mt-8 pt-6 border-t border-border/40 text-center">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setShowCollapsed(!showCollapsed)}
          >
            <span>{collapsedCount} additional items in background</span>
            {showCollapsed ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </Button>
          
          {showCollapsed && (
            <div className="space-y-0 mt-6 border-t border-border/40">
              {allPendingDecisions
                .filter(d => !criticalDecisions.find(c => c.id === d.id))
                .map((decision, index) => (
                  <DecisionCard key={decision.id} decision={decision} index={index} variant="editorial" />
                ))}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {allPendingDecisions.length === 0 && (
        <div className="text-center py-20 border-t border-border/40">
          <p className="text-lg text-muted-foreground">All clear. No pending items.</p>
        </div>
      )}
    </div>
  );
}
