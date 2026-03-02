import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import FindMentors from "./pages/FindMentors";
import MentorProfile from "./pages/MentorProfile";
import HowItWorks from "./pages/HowItWorks";
import MentorDashboard from "./pages/MentorDashboard";
import AspirantDashboard from "./pages/AspirantDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/find-mentors" element={<FindMentors />} />
            <Route path="/mentor/:id" element={<MentorProfile />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/mentor-dashboard" element={<MentorDashboard />} />
            <Route path="/aspirant-dashboard" element={<AspirantDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
