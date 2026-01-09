import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AppShell } from "./components/layout/AppShell";
import { DecisionProvider } from "./context/DecisionContext";
import { IntentProvider } from "./context/IntentContext";
import InsightFeed from "./pages/InsightFeed";
import DecisionDetail from "./pages/DecisionDetail";
import RecommendedAction from "./pages/RecommendedAction";
import ActionConfirmation from "./pages/ActionConfirmation";
import MonitoringList from "./pages/MonitoringList";
import MonitoringDetail from "./pages/MonitoringDetail";
import Deferred from "./pages/Deferred";
import History from "./pages/History";
import Learning from "./pages/Learning";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Priming from "./pages/Priming";

const queryClient = new QueryClient();

// Auth Guard Component (No Layout)
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('koravo_auth') === 'true';
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

// Layout Wrapper
const AppLayout = () => {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
};

// Public Route (prevents logged-in users from seeing login page)
const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem('koravo_auth') === 'true';
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

import { AuthProvider } from "./context/AuthContext";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="koravo-theme">
      <IntentProvider>
        <DecisionProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                {/* Public Routes */}
                <Route element={<PublicRoute />}>
                   <Route path="/login" element={<Login />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/priming" element={<Priming />} />
                  
                  {/* Dashboard with Shell */}
                  <Route element={<AppLayout />}>
                    <Route path="/" element={<InsightFeed />} />
                    <Route path="/decision/:id" element={<DecisionDetail />} />
                    <Route path="/decision/:id/action" element={<RecommendedAction />} />
                    <Route path="/decision/:id/confirm" element={<ActionConfirmation />} />
                    
                    {/* Monitoring */}
                    <Route path="/monitoring" element={<MonitoringList />} />
                    <Route path="/monitoring/:id" element={<MonitoringDetail />} />
                    
                    {/* Other */}
                    <Route path="/deferred" element={<Deferred />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/learning" element={<Learning />} />
                    <Route path="/settings" element={<Settings />} />
                    
                    {/* Catch-all */}
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Route>
              </Routes>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </DecisionProvider>
      </IntentProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
