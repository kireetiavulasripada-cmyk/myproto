import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetailPage from "./pages/ProjectDetailPage";

const queryClient = new QueryClient();

const App = () => ( <QueryClientProvider client={queryClient}> <TooltipProvider delayDuration={150}> <Toaster /> <Sonner />

```
  <BrowserRouter>
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-lg">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Index />} />

        {/* Dynamic project page (ALL projects open here) */}
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
</TooltipProvider>
```

  </QueryClientProvider>
);

export default App;
