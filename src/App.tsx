
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import Team from "./pages/Team";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import ScheduleConsultation from "./pages/ScheduleConsultation";
import EducationSolution from "./pages/EducationSolution";
import EnterpriseSolution from "./pages/EnterpriseSolution";
import GovernmentSolution from "./pages/GovernmentSolution";
import GovernmentDemo from "./pages/GovernmentDemo";
import IVR from "./pages/IVR";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="bakame-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/schedule-consultation" element={<ScheduleConsultation />} />
              <Route path="/solutions/education" element={<EducationSolution />} />
              <Route path="/solutions/enterprise" element={<EnterpriseSolution />} />
              <Route path="/solutions/government" element={<GovernmentSolution />} />
              <Route path="/government-demo" element={<GovernmentDemo />} />
              <Route path="/ivr" element={<IVR />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnalyticsProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
