import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, RotateCcw, AlertCircle, CheckCircle2, Lock, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RiskIndicator } from '@/components/decisions/RiskIndicator';
import { LifecycleIndicator } from '@/components/decisions/LifecycleIndicator';
import { getDecisionById } from '@/data/decisions';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function ActionConfirmation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const decision = getDecisionById(id || '');

  const [confirmed, setConfirmed] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  if (!decision) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Decision not found</p>
      </div>
    );
  }

  const { insight, recommendation, impact } = decision;

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      toast.success('Action approved and executing', {
        description: 'You can track progress in the Monitoring section.'
      });
      navigate('/monitoring');
    }, 1500);
  };

  return (
    <>
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-6 -ml-2 text-muted-foreground hover:text-foreground group"
        onClick={() => navigate(`/decision/${id}/action`)}
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Recommendation
      </Button>

      {/* Lifecycle Progress */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="py-5 px-6">
          <LifecycleIndicator currentStage="approved" />
        </CardContent>
      </Card>

      {/* Header */}
      <header className="mb-8 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-5">
          <Lock className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Final Confirmation</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          You are about to authorize an action. Please review the details carefully before proceeding.
        </p>
      </header>

      {/* Summary Card */}
      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Execution Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* What Will Change */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-info/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-info" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-foreground mb-2">What will change</h4>
              <p className="text-sm text-muted-foreground mb-2">{recommendation.summary}</p>
              <ul className="space-y-1">
                {recommendation.willChange.slice(0, 3).map((item, i) => (
                  <li key={i} className="text-xs text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Duration</h4>
              <p className="text-sm text-muted-foreground">{recommendation.duration}</p>
            </div>
          </div>

          {/* Expected Outcome */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Expected outcome</h4>
              <p className="text-sm text-muted-foreground">{recommendation.expectedOutcome}</p>
            </div>
          </div>

          {/* Impact */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Potential impact being addressed</h4>
              <p className="text-sm text-muted-foreground">{impact.value} {impact.description} {impact.timeframe}</p>
            </div>
          </div>

          {/* Risk Level */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Risk assessment</h4>
              <RiskIndicator risk={recommendation.riskLevel} showDescription />
            </div>
          </div>

          {/* Rollback */}
          {recommendation.rollbackAvailable && (
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-5 h-5 text-success" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-1">Rollback available</h4>
                <p className="text-sm text-muted-foreground">
                  This action can be reversed within <span className="text-foreground font-medium">{recommendation.rollbackWindow}</span> if needed. 
                  You remain in control even after execution.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Checkbox - MANDATORY */}
      <Card className={cn(
        'mb-8 transition-colors',
        confirmed 
          ? 'bg-primary/10 border-primary/30' 
          : 'bg-warning/5 border-warning/30'
      )}>
        <CardContent className="p-5">
          <label className="flex items-start gap-4 cursor-pointer">
            <Checkbox 
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
              className={cn(
                'mt-0.5',
                confirmed 
                  ? 'border-primary data-[state=checked]:bg-primary' 
                  : 'border-warning'
              )}
            />
            <div>
              <span className="text-sm font-medium text-foreground block">
                I understand the risks and approve this action
              </span>
              <span className="text-xs text-muted-foreground">
                I have reviewed the parameters, risks, and expected outcomes. I accept responsibility for this decision.
              </span>
            </div>
          </label>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          className="border-border text-muted-foreground hover:text-foreground"
          onClick={() => navigate(`/decision/${id}/action`)}
        >
          Cancel
        </Button>
        <Button 
          size="lg"
          className={cn(
            'min-w-[180px] transition-all',
            confirmed 
              ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
              : 'bg-muted text-muted-foreground cursor-not-allowed'
          )}
          disabled={!confirmed || isExecuting}
          onClick={handleExecute}
        >
          {isExecuting ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Executing...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Execute Action
            </>
          )}
        </Button>
      </div>

      {/* Footer note */}
      <p className="text-xs text-muted-foreground text-center mt-6">
        KORAVO assists decisions. It never acts without your approval.
      </p>
    </>
  );
}
