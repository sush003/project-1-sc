import { History as HistoryIcon, CheckCircle2, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function History() {
  return (
    <>
      {/* Page Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <HistoryIcon className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Decision History</h1>
            <p className="text-sm text-muted-foreground">Past decisions and their outcomes</p>
          </div>
        </div>
      </header>

      {/* Info Card */}
      <Card className="bg-card border-border mb-8">
        <CardContent className="py-6 px-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-info/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-info" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">Complete Audit Trail</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every decision, approval, and outcome is recorded here. This history enables the system to learn and improve its recommendations over time, while providing full transparency for compliance and review.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      <div className="text-center py-20">
        <div className="w-20 h-20 rounded-3xl bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-success" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No completed decisions yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Completed executions and their outcomes will appear here for audit, learning, and compliance purposes.
        </p>
      </div>
    </>
  );
}
