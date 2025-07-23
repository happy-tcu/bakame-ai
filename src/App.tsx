
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import Index from "./pages/Index";
import IVR from "./pages/IVR";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import Team from "./pages/Team";
import About from "./pages/About";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import EducationSolution from "./pages/EducationSolution";
import EnterpriseSolution from "./pages/EnterpriseSolution";
import GovernmentSolution from "./pages/GovernmentSolution";
import GovernmentDemo from "./pages/GovernmentDemo";
import EarlyAccess from "./pages/EarlyAccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AnalyticsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ivr" element={<IVR />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/team" element={<Team />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/solutions/education" element={<EducationSolution />} />
            <Route path="/solutions/enterprise" element={<EnterpriseSolution />} />
            <Route path="/solutions/government" element={<GovernmentSolution />} />
            <Route path="/government-demo" element={<GovernmentDemo />} />
            <Route path="/early-access" element={<EarlyAccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AnalyticsProvider>
  </QueryClientProvider>
);

export default App;
