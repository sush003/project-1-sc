import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { DecisionProvider } from '@/context/DecisionContext';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Determine if we need to scroll. New page = scroll to top.
    if (mainRef.current) {
      // Use requestAnimationFrame to ensure the DOM has updated
      requestAnimationFrame(() => {
        if (mainRef.current) {
          mainRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
          });
        }
      });
    }
  }, [pathname]);

  return (
    <DecisionProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden text-foreground selection:bg-primary/20">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
          <TopBar />
          <main ref={mainRef} className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth focus:outline-none">
            <div className="w-full max-w-[1600px] mx-auto p-6 md:p-8 lg:p-10 animate-fade-in-up">
              {children}
            </div>
          </main>
        </div>
      </div>
    </DecisionProvider>
  );
}
