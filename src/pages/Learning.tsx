import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Learning() {
  return (
    <>
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">System Learning</h1>
            <p className="text-sm text-muted-foreground">How the system adapts based on your decisions</p>
          </div>
        </div>
      </header>

      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-base">What the system has learned (Past 60 Days)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-foreground mb-1">You prefer conservative parameter adjustments</p>
            <p className="text-xs text-muted-foreground">Default recommendations adjusted accordingly</p>
          </div>
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm text-foreground mb-1">You rarely act on low-confidence insights</p>
            <p className="text-xs text-muted-foreground">Confidence threshold raised to 75%</p>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        Learning is controlled and transparent. You can reset preferences in Settings.
      </p>
    </>
  );
}
