import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page - No Layout */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Student Routes with Layout */}
          <Route path="/" element={<Layout userType="student" />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<div className="p-8 text-center">Orders page coming soon...</div>} />
            <Route path="cart" element={<div className="p-8 text-center">Cart page coming soon...</div>} />
            <Route path="recommendations" element={<div className="p-8 text-center">AI Recommendations coming soon...</div>} />
          </Route>
          
          {/* Admin Routes with Layout */}
          <Route path="/admin" element={<Layout userType="admin" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<div className="p-8 text-center">Admin Orders Management coming soon...</div>} />
            <Route path="menu" element={<div className="p-8 text-center">Menu Management coming soon...</div>} />
            <Route path="students" element={<div className="p-8 text-center">Student Management coming soon...</div>} />
            <Route path="analytics" element={<div className="p-8 text-center">Analytics coming soon...</div>} />
            <Route path="inventory" element={<div className="p-8 text-center">Inventory Management coming soon...</div>} />
            <Route path="media" element={<div className="p-8 text-center">Media Management coming soon...</div>} />
            <Route path="settings" element={<div className="p-8 text-center">Settings coming soon...</div>} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
