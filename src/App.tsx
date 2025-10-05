
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { AnalyticsProvider } from "./components/analytics/AnalyticsProvider";
import { AuthProvider } from "./components/auth/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import GovernmentSolution from "./pages/GovernmentSolution";
import EnterpriseSolution from "./pages/EnterpriseSolution";
import EducationSolution from "./pages/EducationSolution";
import GovernmentDemo from "./pages/GovernmentDemo";
import Blog from "./pages/Blog";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import EarlyAccess from "./pages/EarlyAccess";
import Pricing from "./pages/Pricing";
import DemoScheduling from "./pages/DemoScheduling";
import TryDemo from "./pages/TryDemo";
import Features from "./pages/Features";
import Roadmap from "./pages/Roadmap";
import Press from "./pages/Press";
import ForStudents from "./pages/ForStudents";
import ForTeachers from "./pages/ForTeachers";
import ForSchools from "./pages/ForSchools";
import StudentDashboard from "./pages/StudentDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <AuthProvider>
          <AnalyticsProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/government-solution" element={<GovernmentSolution />} />
              <Route path="/enterprise-solution" element={<EnterpriseSolution />} />
              <Route path="/education-solution" element={<EducationSolution />} />
              <Route path="/government-demo" element={<GovernmentDemo />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/support" element={<Support />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/early-access" element={<EarlyAccess />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/demo-scheduling" element={<DemoScheduling />} />
              <Route path="/try" element={<TryDemo />} />
              <Route path="/features" element={<Features />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/press" element={<Press />} />
              <Route path="/for-students" element={<ForStudents />} />
              <Route path="/for-teachers" element={<ForTeachers />} />
              <Route path="/for-schools" element={<ForSchools />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AnalyticsProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
