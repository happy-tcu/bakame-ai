import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Index from "./pages/Index";

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="bakame-theme">
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Index />
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
