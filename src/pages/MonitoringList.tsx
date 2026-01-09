import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LifecycleIndicator } from '@/components/decisions/LifecycleIndicator';
import { getActiveExecutions } from '@/data/decisions';
import { cn } from '@/lib/utils';

const trajectoryConfig = {
  // ... (keeping config same)
  on_track: { label: 'On Track', color: 'text-success', bg: 'bg-success/15' },
  at_risk: { label: 'At Risk', color: 'text-warning', bg: 'bg-warning/15' },
  off_track: { label: 'Off Track', color: 'text-critical', bg: 'bg-critical/15' }
};

export default function MonitoringList() {
  const navigate = useNavigate();
  const activeExecutions = getActiveExecutions();

  const onTrackCount = activeExecutions.filter(d => d.execution?.trajectory === 'on_track').length;

  return (
    <>
      {/* Page Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-info/20 to-info/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-info" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Monitoring</h1>
            <p className="text-sm text-muted-foreground">Track active executions and outcomes</p>
          </div>
        </div>
      </header>

      {/* Summary */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <span className="text-3xl font-mono font-semibold text-foreground">{activeExecutions.length}</span>
              <p className="text-xs text-muted-foreground mt-0.5">Active executions</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <span className="text-3xl font-mono font-semibold text-success">{onTrackCount}</span>
              <p className="text-xs text-muted-foreground mt-0.5">On track</p>
            </div>
          </div>
          <div className="max-w-sm text-right">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Monitor approved actions. The system tracks outcomes so you can intervene if needed.
            </p>
          </div>
        </div>
      </div>

      {/* Execution Cards */}
      <div className="space-y-4">
        {activeExecutions.map((decision, index) => {
          const { insight, recommendation, execution, approvedBy, approvedAt } = decision;
          const trajectory = execution?.trajectory || 'on_track';
          const trajectoryStyle = trajectoryConfig[trajectory];

          return (
            <Card 
              key={decision.id}
              className={cn(
                'group cursor-pointer transition-all duration-300',
                'bg-card border-border hover:border-info/30',
                'hover:shadow-[0_0_40px_hsl(217_91%_60%_/_0.08)]',
                'animate-fade-in-up'
              )}
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => navigate(`/monitoring/${decision.id}`)}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={cn('px-2.5 py-1 rounded-md text-xs font-medium', trajectoryStyle.bg, trajectoryStyle.color)}>
                        {trajectoryStyle.label}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {execution?.stage === 'in_progress' ? 'In Progress' : 'Pending'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground leading-tight group-hover:text-info transition-colors">
                      {insight.title}
                    </h3>
                  </div>
                  <LifecycleIndicator currentStage="executing" compact />
                </div>

                {/* Action Summary */}
                <div className="bg-muted/30 rounded-xl p-4 mb-4">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide block mb-1">
                    Action Taken
                  </span>
                  <p className="text-sm text-foreground">{recommendation.summary}</p>
                </div>

                {/* Progress */}
                {execution?.observedImpact && (
                  <div className="bg-success/5 border border-success/20 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span className="text-xs font-medium text-success">Early Results</span>
                    </div>
                    <p className="text-sm text-foreground">{execution.observedImpact}</p>
                  </div>
                )}

                {/* Metadata */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Started {execution?.startedAt}
                    </div>
                    {approvedBy && (
                      <span>Approved by {approvedBy}</span>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-info hover:bg-info/10 group/btn"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {activeExecutions.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-6">
            <Activity className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No active executions</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Approve a recommendation to see it tracked here. All executions are monitored for outcome verification.
          </p>
        </div>
      )}
    </>
  );
}
