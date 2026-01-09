import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HumanControlBadge } from '@/components/decisions/HumanControlBadge';
import { IntentSelector } from '@/components/decisions/IntentSelector';

export function TopBar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 md:px-8 lg:px-10 sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300">
      {/* Left: Context / Search / Breadcrumbs */}
      <div className="flex items-center gap-6 flex-1">
        <div className="flex items-center gap-4">
          <IntentSelector variant="compact" />
          <HumanControlBadge />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Search Trigger (Mock) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md text-muted-foreground bg-muted/30 border border-transparent hover:border-border transition-all cursor-text w-48">
          <Search className="w-3.5 h-3.5" />
          <span className="text-xs">Search...</span>
          <kbd className="ml-auto pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        <div className="h-6 w-px bg-border/40 mx-2" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-muted/50 rounded-full w-9 h-9">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Notifications</TooltipContent>
        </Tooltip>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 border border-success/20">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] font-medium text-success uppercase tracking-wider font-serif">Systems Optimized</span>
        </div>
      </div>
    </header>
  );
}
