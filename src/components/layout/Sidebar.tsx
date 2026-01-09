import { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Lightbulb, 
  Activity, 
  History, 
  Settings,
  Hexagon,
  ChevronRight,
  BookOpen,
  Clock,
  ChevronLeft,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  Palette,
  LogOut,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDecisions } from '@/context/DecisionContext';
import { useTheme } from '@/context/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";

const navItems = [
  { 
    label: 'Insights', 
    icon: Lightbulb, 
    path: '/',
    countKey: 'pending' as const
  },
  { 
    label: 'Monitoring', 
    icon: Activity, 
    path: '/monitoring',
    countKey: 'executing' as const
  },
  { 
    label: 'Deferred', 
    icon: Clock, 
    path: '/deferred',
    countKey: 'deferred' as const
  },
  { 
    label: 'History', 
    icon: History, 
    path: '/history',
  },
  { 
    label: 'Learning', 
    icon: BookOpen, 
    path: '/learning',
  },
];

export function Sidebar() {
  const location = useLocation();
  const { pendingCount, executingCount, deferredCount } = useDecisions();
  const { theme, setTheme } = useTheme();
  // Start expanded for a better "Pro" feel, let user collapse if needed
  const [collapsed, setCollapsed] = useState(false);
  const [isThemeExpanded, setIsThemeExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const getCounts = (key?: 'pending' | 'executing' | 'deferred') => {
    if (key === 'pending') return pendingCount;
    if (key === 'executing') return executingCount;
    if (key === 'deferred') return deferredCount;
    return null;
  };

  return (
    <aside 
      className={cn(
        "relative flex flex-col border-r border-border/40 bg-sidebar/50 backdrop-blur-xl transition-all duration-300 ease-in-out z-20 h-full",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header / Logo */}
      <div className={cn(
        "h-16 flex items-center justify-between transition-all duration-300",
        collapsed ? "justify-center px-0" : "px-3"
      )}>
        {/* Expanded: Logo on left, Toggle on right */}
        {!collapsed && (
          <>
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-colors group-hover:bg-primary/20 flex-shrink-0">
                <Hexagon className="w-5 h-5" strokeWidth={2.5} />
              </div>
              
              <div className="transition-all duration-300 overflow-hidden flex flex-col w-auto opacity-100">
                <span className="font-serif font-bold text-foreground tracking-tight text-lg">KORAVO</span>
              </div>
            </Link>

            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
              title="Collapse Sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Collapsed: Only Toggle Button (Centered) */}
        {collapsed && (
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
            title="Expand Sidebar"
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-none">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          const count = getCounts(item.countKey);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'group flex items-center relative transition-all duration-200',
                collapsed 
                  ? 'justify-center w-10 h-10 p-0 mx-auto rounded-xl' 
                  : 'gap-3 px-3 py-2.5 w-full rounded-md',
                isActive 
                  ? 'bg-[#26272B] text-white shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn(
                "flex-shrink-0 transition-colors",
                collapsed ? "w-5 h-5" : "w-5 h-5",
                isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
              )} strokeWidth={isActive ? 2.5 : 2} />
              
              <span className={cn(
                "transition-all duration-300 overflow-hidden whitespace-nowrap text-sm",
                collapsed ? "w-0 opacity-0" : "flex-1 opacity-100"
              )}>
                {item.label}
              </span>

              {/* Count Badge */}
              {count !== null && count > 0 && (
                <div className={cn(
                  "flex items-center justify-center transition-all duration-300",
                  collapsed ? "absolute -top-1 -right-1" : ""
                )}>
                   <span className={cn(
                    "flex items-center justify-center text-[10px] font-bold rounded-full",
                    collapsed 
                      ? "w-4 h-4 bg-primary text-primary-foreground border border-sidebar" 
                      : "min-w-[18px] px-1 h-5 bg-background border border-border text-foreground"
                   )}>
                    {count}
                   </span>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Actions: Theme & Settings */}
      <div className="px-3 py-2 space-y-1">
        {/* Theme Accordion */}
        <div className="space-y-1">
          <button
            onClick={() => {
              if (collapsed) {
                setCollapsed(false);
                setIsThemeExpanded(true);
              } else {
                setIsThemeExpanded(!isThemeExpanded);
              }
            }}
            className={cn(
              'w-full group flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 relative',
              'text-muted-foreground hover:text-foreground hover:bg-muted/30 cursor-pointer',
              collapsed && 'justify-center px-0'
            )}
            title={collapsed ? "Theme" : undefined}
          >
            <Palette className={cn(
              "w-5 h-5 flex-shrink-0 transition-colors text-muted-foreground group-hover:text-foreground"
            )} strokeWidth={2} />
            
            <div className={cn(
              "transition-all duration-300 overflow-hidden whitespace-nowrap text-sm flex items-center justify-between",
              collapsed ? "w-0 opacity-0" : "flex-1 opacity-100"
            )}>
              <span>Theme</span>
              <ChevronRight className={cn(
                "w-4 h-4 transition-transform duration-200",
                isThemeExpanded && "rotate-90"
              )} />
            </div>
          </button>

          {/* Expanded Options */}
          <div className={cn(
            "overflow-hidden transition-all duration-300 space-y-1",
            !isThemeExpanded || collapsed ? "max-h-0 opacity-0" : "max-h-24 opacity-100 pl-11"
          )}>
            <button
              onClick={() => setTheme('light')}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                theme === 'light' 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              <span>Light</span>
              {theme === 'light' && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                theme === 'dark' 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              <span>Dark</span>
              {theme === 'dark' && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>
          </div>
        </div>

        {/* Settings Link */}
        <Link
          to="/settings"
          className={cn(
            'group flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 relative',
            location.pathname === '/settings'
              ? 'bg-primary/10 text-primary font-medium' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/30',
            collapsed && 'justify-center px-0'
          )}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings className={cn(
            "w-5 h-5 flex-shrink-0 transition-colors",
            location.pathname === '/settings' ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
          )} strokeWidth={2} />
          
          <span className={cn(
            "transition-all duration-300 overflow-hidden whitespace-nowrap text-sm",
            collapsed ? "w-0 opacity-0" : "flex-1 opacity-100"
          )}>
            Settings
          </span>
        </Link>
      </div>

      {/* User Footer (Divider is implicit via border-t) */}
      <div className="p-3 border-t border-border/40 mt-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn(
              "flex items-center gap-3 px-1 transition-all duration-300 w-full rounded-md hover:bg-muted/50 p-2 outline-none group",
               collapsed && "justify-center"
            )}>
               <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0 border border-border group-hover:border-primary/30 transition-colors">
                  <User className="w-4 h-4" />
               </div>
               
               <div className={cn(
                "overflow-hidden transition-all duration-300 text-left",
                collapsed ? "w-0 h-0 opacity-0" : "w-auto opacity-100"
               )}>
                 <div className="text-sm font-medium text-foreground leading-none font-serif">Sush</div>
                 <div className="text-[10px] text-muted-foreground mt-1">Systems Active</div>
               </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side={collapsed ? "right" : "top"} sideOffset={10} className="w-60 mb-2 p-2">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none font-serif">Sush</p>
                <p className="text-xs leading-none text-muted-foreground">sush@koravo.sys</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <User className="w-4 h-4 mr-2 text-muted-foreground" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Sparkles className="w-4 h-4 mr-2 text-muted-foreground" />
                Plan & Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => window.location.href = '/settings'}>
                 <Settings className="w-4 h-4 mr-2 text-muted-foreground" />
                 Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:text-destructive cursor-pointer bg-destructive/5 hover:bg-destructive/10"
              onClick={() => {
                localStorage.removeItem('koravo_auth');
                window.location.href = '/login';
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
