
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnalyticsProvider } from "./components/analytics/AnalyticsProvider";
import { AuthProvider } from "./components/auth/AuthContext";
import { RoleGuard } from "./components/auth/RoleGuard";
import { queryClient } from "@/lib/queryClient";
import Index from "./pages/Index";
import GovernmentSolution from "./pages/GovernmentSolution";
import EnterpriseSolution from "./pages/EnterpriseSolution";
import EducationSolution from "./pages/EducationSolution";
import GovernmentDemo from "./pages/GovernmentDemo";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import EarlyAccess from "./pages/EarlyAccess";
import DemoScheduling from "./pages/DemoScheduling";
import Press from "./pages/Press";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AnalyticsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/government-solution" element={<GovernmentSolution />} />
              <Route path="/enterprise-solution" element={<EnterpriseSolution />} />
              <Route path="/education-solution" element={<EducationSolution />} />
              <Route path="/government-demo" element={<GovernmentDemo />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/early-access" element={<EarlyAccess />} />
              <Route path="/demo-scheduling" element={<DemoScheduling />} />
              <Route path="/press" element={<Press />} />
              <Route
                path="/admin"
                element={
                  <RoleGuard allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </RoleGuard>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AnalyticsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
