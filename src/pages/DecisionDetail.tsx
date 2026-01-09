import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertTriangle, ChevronRight, ChevronUp, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { PriorityIndicator } from '@/components/decisions/PriorityIndicator';
import { ConfidenceMeter } from '@/components/decisions/ConfidenceMeter';
import { ImpactCard } from '@/components/decisions/ImpactCard';
import { EvidenceList } from '@/components/decisions/EvidenceList';
import { LifecycleIndicator } from '@/components/decisions/LifecycleIndicator';
import { HumanControlBadge } from '@/components/decisions/HumanControlBadge';
import { getDecisionById } from '@/data/decisions';
import { cn } from '@/lib/utils';

export default function DecisionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [explanationOpen, setExplanationOpen] = useState(false);
  
  const decision = getDecisionById(id || '');

  if (!decision) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Decision not found</p>
      </div>
    );
  }

  const { insight, context, impact, stage, similarCases } = decision;
  
  // Get confidence value for display
  const confidenceValue = typeof insight.confidence === 'object' 
    ? insight.confidence 
    : { overall: insight.confidence };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        className="mb-8 -ml-2 text-muted-foreground hover:text-foreground group"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Briefing
      </Button>

      {/* Header Section */}
      <header className="mb-12 border-b border-border/40 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <PriorityIndicator priority={insight.priority} size="lg" />
          {insight.momentum && (
             <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground px-2 py-1 bg-muted/50 rounded">
               Momentum: {insight.momentum}
             </span>
          )}
          <span className="text-xs font-mono text-muted-foreground ml-auto">
             ID: {decision.id.toUpperCase()}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-medium text-foreground mb-4 leading-tight max-w-4xl">
          {insight.title}
        </h1>
        <div className="flex items-center gap-6">
           <HumanControlBadge />
           <span className="text-lg text-muted-foreground font-light border-l border-border pl-6">
             {insight.state}
           </span>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Narrative Analysis (Span 8) */}
        <div className="lg:col-span-8 space-y-16">
           
           {/* Section 1: Understanding */}
           <section className="space-y-6">
              <h2 className="text-2xl font-serif text-foreground border-b border-border/40 pb-2">Situation Analysis</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <h3 className="font-medium text-muted-foreground uppercase tracking-widest text-xs">Observation</h3>
                   <p className="text-lg leading-relaxed text-foreground/90">{context.whatHappened}</p>
                </div>
                <div className="space-y-3">
                   <h3 className="font-medium text-muted-foreground uppercase tracking-widest text-xs">Implication</h3>
                   <p className="text-lg leading-relaxed text-foreground/90">{context.whyItMatters}</p>
                </div>
              </div>
           </section>

           {/* Section 2: Evidence */}
           <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                 <h2 className="text-2xl font-serif text-foreground">Evidence Record</h2>
                 <span className="text-xs text-muted-foreground uppercase tracking-wider">{context.evidence.length} Signals Captured</span>
              </div>
              
              <div className="bg-muted/10 rounded-xl p-1">
                 <EvidenceList evidence={context.evidence} />
              </div>

              {context.whatSystemCannotSee && (
                <div className="flex gap-4 p-4 bg-warning/5 border border-warning/10 rounded-lg">
                   <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
                   <div className="space-y-1">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-warning">System Blind Spot</h4>
                      <p className="text-sm text-foreground/80 italic">{context.whatSystemCannotSee}</p>
                   </div>
                </div>
              )}
           </section>

           {/* Section 3: Consequences */}
           <section className="space-y-6">
              <h2 className="text-2xl font-serif text-destructive border-b border-destructive/20 pb-2">Projected Impact</h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-start">
                 <div className="flex-1 space-y-4">
                    <p className="text-lg text-foreground/90 leading-relaxed">
                       {context.inactionConsequence}
                    </p>
                    <div className="bg-gradient-to-br from-destructive/5 to-transparent border border-destructive/10 p-6 rounded-xl">
                       <span className="block text-xs uppercase tracking-wider text-destructive mb-2">Total Potential Loss</span>
                       <span className="text-4xl font-mono font-medium text-destructive">
                          {context.inactionProjection?.totalCost}
                       </span>
                    </div>
                 </div>

                 {/* Minimal Projection Table */}
                 <div className="w-full md:w-64 space-y-3 pt-2">
                    {context.inactionProjection && Object.entries(context.inactionProjection).map(([key, value]) => {
                       if (key === 'totalCost' || key === 'comparisonWithAction') return null;
                       return (
                        <div key={key} className="flex justify-between items-baseline border-b border-border/40 pb-1.5">
                          <span className="text-xs text-muted-foreground capitalize">{key.replace('week', 'Wk ')}</span>
                          <span className="text-sm font-medium text-foreground text-right">{String(value).split(':')[1] || value}</span>
                        </div>
                       );
                    })}
                 </div>
              </div>
           </section>

        </div>

        {/* RIGHT COLUMN: Sticky Sidebar (Span 4) */}
        <div className="lg:col-span-4 space-y-8">
           <div className="sticky top-8 space-y-8">
              
              {/* Lifecycle Card */}
              <div className="bg-card border border-border shadow-sm rounded-xl p-5 space-y-4">
                 <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Decision State</h3>
                 <LifecycleIndicator currentStage={stage} />
                 <div className="pt-2">
                    <Button 
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group shadow-glow"
                      onClick={() => navigate(`/decision/${id}/action`)}
                    >
                      Review Actions
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                 </div>
              </div>

              {/* Confidence & Impact Block */}
              <div className="space-y-4">
                 <ImpactCard 
                   value={impact.value} 
                   description={impact.description} 
                   timeframe={impact.timeframe} 
                 />
                 <div className="bg-card border border-border rounded-xl p-5">
                    <ConfidenceMeter 
                      value={confidenceValue} 
                      size="md" 
                      showExplanation 
                      showBreakdown={true}
                    />
                 </div>
              </div>

              {/* Historical Context */}
              {similarCases && (
                 <div className="bg-muted/10 rounded-xl p-5 border border-border/50">
                    <div className="flex items-center gap-2 mb-4">
                       <History className="w-4 h-4 text-muted-foreground" />
                       <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Context</h3>
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <span className="text-2xl font-serif text-foreground">{similarCases.count}</span>
                          <span className="text-xs text-muted-foreground mb-1">similar scenarios</span>
                       </div>
                       <div className="w-full bg-muted/50 h-px" />
                       <p className="text-sm text-foreground/80 italic">
                         "Most similar case saw <span className="text-success">{similarCases.mostSimilar?.outcome}</span>."
                       </p>
                    </div>
                 </div>
              )}

           </div>
        </div>

      </div>
    </div>
  );
}
