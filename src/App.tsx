
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import Team from "./pages/Team";
import Signup from "./pages/Signup";
import EducationSolution from "./pages/EducationSolution";
import EnterpriseSolution from "./pages/EnterpriseSolution";
import GovernmentSolution from "./pages/GovernmentSolution";
import GovernmentDemo from "./pages/GovernmentDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
            <Route path="/solutions/education" element={<EducationSolution />} />
            <Route path="/solutions/enterprise" element={<EnterpriseSolution />} />
            <Route path="/solutions/government" element={<GovernmentSolution />} />
            <Route path="/government-demo" element={<GovernmentDemo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnalyticsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
