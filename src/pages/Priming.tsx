import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ShieldCheck, Activity, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function Priming() {
  const navigate = useNavigate();
  const today = new Date();
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="max-w-xl w-full space-y-12">
        
        {/* Header / Identity */}
        <div className="space-y-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <ShieldCheck className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            
            <div className="space-y-2">
                <h1 className="text-4xl font-heading font-medium tracking-tight text-foreground">
                    Authority Confirmed
                </h1>
                <p className="text-lg text-muted-foreground font-light">
                    {format(today, 'EEEE, MMMM do, yyyy')} • {format(today, 'HH:mm')}
                </p>
            </div>
        </div>

        {/* Responsibility Card */}
        <div className="bg-card border border-border/50 p-8 rounded-lg shadow-elevated space-y-8 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-8 pb-8 border-b border-border/50">
                    <div className="space-y-1">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Role</span>
                        <div className="text-xl text-foreground">Operations Manager</div>
                    </div>
                     <div className="space-y-1 text-right">
                        <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Scope</span>
                        <div className="text-xl text-foreground">Region West</div>
                    </div>
                </div>

                <div className="space-y-4">
                     <div className="flex items-start gap-4">
                        <div className="mt-1">
                            <Activity className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-0.5">Active Intent</span>
                            <div className="text-base font-medium text-foreground">Cost Optimization vs Service Levels</div>
                        </div>
                     </div>

                     <div className="flex items-start gap-4">
                        <div className="mt-1">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium block mb-0.5">Last Action</span>
                            <div className="text-base text-muted-foreground">Approved Maintenance Schedule (2h ago)</div>
                        </div>
                     </div>
                </div>
            </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
                <Checkbox 
                    id="acknowledge" 
                    checked={acknowledged}
                    onCheckedChange={(checked) => setAcknowledged(Boolean(checked))}
                    className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <label 
                    htmlFor="acknowledge" 
                    className="text-sm text-muted-foreground italic cursor-pointer hover:text-foreground transition-colors"
                >
                    "I acknowledge my accountability for the decisions made in this session."
                </label>
            </div>
            <Button 
                size="lg" 
                className="w-full h-14 text-base font-medium tracking-wide bg-primary hover:bg-primary-dark text-primary-foreground transition-all duration-300 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => navigate('/')}
                disabled={!acknowledged}
            >
                I Accept
                <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
        </div>

      </div>
    </div>
  );
}
