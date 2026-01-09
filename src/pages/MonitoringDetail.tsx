import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, Clock, CheckCircle2, RotateCcw, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LifecycleIndicator } from '@/components/decisions/LifecycleIndicator';
import { getDecisionById } from '@/data/decisions';
import { cn } from '@/lib/utils';

const trajectoryConfig = {
  // ... (keeping config same)
  on_track: { 
    label: 'On Track', 
    description: 'The action is progressing as expected.',
    color: 'text-success', 
    bg: 'bg-success/15',
    icon: TrendingUp
  },
  at_risk: { 
    label: 'At Risk', 
    description: 'Some metrics are deviating. Consider monitoring closely.',
    color: 'text-warning', 
    bg: 'bg-warning/15',
    icon: AlertTriangle
  },
  off_track: { 
    label: 'Off Track', 
    description: 'Action is not producing expected results.',
    color: 'text-critical', 
    bg: 'bg-critical/15',
    icon: AlertTriangle
  }
};

export default function MonitoringDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const decision = getDecisionById(id || '');

  if (!decision) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Execution not found</p>
      </div>
    );
  }

  const { insight, recommendation, execution, approvedBy, approvedAt } = decision;
  const trajectory = execution?.trajectory || 'on_track';
  const trajectoryStyle = trajectoryConfig[trajectory];
  const TrajectoryIcon = trajectoryStyle.icon;

  return (
    <>
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground group"
        onClick={() => navigate('/monitoring')}
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Monitoring
      </Button>

      {/* Lifecycle Progress */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="py-5 px-6">
          <LifecycleIndicator currentStage="executing" />
        </CardContent>
      </Card>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-info/20 flex items-center justify-center">
            <Activity className="w-6 h-6 text-info" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Execution Monitoring</h1>
            <p className="text-sm text-muted-foreground">{insight.title}</p>
          </div>
        </div>
      </header>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <span className="text-xs text-muted-foreground block mb-2">Execution Status</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-info">
                <div className="w-full h-full rounded-full bg-info animate-ping opacity-75" />
              </div>
              <span className="font-medium text-info">In Progress</span>
            </div>
          </CardContent>
        </Card>
        <Card className={cn('border', trajectoryStyle.bg.replace('/15', '/10'), `border-${trajectory === 'on_track' ? 'success' : trajectory === 'at_risk' ? 'warning' : 'critical'}/20`)}>
          <CardContent className="p-5">
            <span className="text-xs text-muted-foreground block mb-2">Trajectory</span>
            <div className="flex items-center gap-2">
              <TrajectoryIcon className={cn('w-5 h-5', trajectoryStyle.color)} />
              <span className={cn('font-medium', trajectoryStyle.color)}>{trajectoryStyle.label}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What's Happening */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            Action in Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="bg-muted/30 rounded-xl p-4">
            <p className="text-foreground">{recommendation.summary}</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Started {execution?.startedAt}
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Duration: {recommendation.duration}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress & Outcomes */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-base font-medium">Current Progress</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <p className="text-foreground">{execution?.progressDescription}</p>
          
          {execution?.observedImpact && (
            <div className="bg-success/5 border border-success/20 rounded-xl p-4">
              <h4 className="text-sm font-medium text-success mb-1">Observed Impact</h4>
              <p className="text-foreground">{execution.observedImpact}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="bg-card border-border mb-8">
        <CardHeader>
          <CardTitle className="text-base font-medium">Execution Timeline</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Action Approved</p>
                <p className="text-xs text-muted-foreground">{approvedAt} by {approvedBy}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-info/20 flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 text-info" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Execution Started</p>
                <p className="text-xs text-muted-foreground">{execution?.startedAt} • Changes applied</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Expected</p>
                <p className="text-xs text-muted-foreground">In {recommendation.duration}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          className="border-border text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Rollback Action
        </Button>
        <Button 
          variant="outline"
          className="border-border"
          onClick={() => navigate('/')}
        >
          Return to Insights
        </Button>
      </div>
    </>
  );
}
