import { Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getDeferredDecisions } from '@/data/decisions';

export default function Deferred() {
  const navigate = useNavigate();
  const deferredDecisions = getDeferredDecisions();

  return (
    <>
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-warning/20 to-warning/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-warning" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Deferred Insights</h1>
            <p className="text-sm text-muted-foreground">Decisions postponed for later review</p>
          </div>
        </div>
      </header>

      <div className="space-y-4">
        {deferredDecisions.map((decision) => (
          <Card key={decision.id} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-foreground mb-1">{decision.insight.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{decision.deferredReason}</p>
                  <span className="text-xs text-warning">Reappears: {decision.deferredUntil}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate(`/decision/${decision.id}`)}>
                  Review Now <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {deferredDecisions.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No deferred decisions.
          </div>
        )}
      </div>
    </>
  );
}
