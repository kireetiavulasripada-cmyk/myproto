import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetailPage from "./pages/ProjectDetailPage";

const AgricultureProject = lazy(() => import("./pages/AgricultureProject"));
const PowerBIProject = lazy(() => import("./pages/PowerBIProject"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/projects/agriculture" element={<AgricultureProject />} />
        <Route path="/projects/retail-customer-retention" element={<PowerBIProject />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={150}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center text-lg">
              Loading...
            </div>
          }
        >
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
