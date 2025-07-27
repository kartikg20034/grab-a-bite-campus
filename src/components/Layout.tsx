import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  userType?: "student" | "admin";
}

export const Layout = ({ userType = "student" }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Navigation */}
      <Navbar 
        userType={isAdminRoute ? "admin" : "student"}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex">
        {/* Sidebar for admin */}
        {isAdminRoute && (
          <Sidebar 
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
          />
        )}

        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300",
          isAdminRoute && sidebarOpen ? "ml-64" : "",
          isAdminRoute && !sidebarOpen ? "ml-16" : "",
          "pt-16" // Account for navbar height
        )}>
          <div className="container mx-auto px-4 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};