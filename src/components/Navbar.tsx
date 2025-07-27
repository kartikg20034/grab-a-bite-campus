import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  ShoppingCart, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  UtensilsCrossed 
} from "lucide-react";

interface NavbarProps {
  userType: "student" | "admin";
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

export const Navbar = ({ userType, sidebarOpen, setSidebarOpen }: NavbarProps) => {
  const [cartItems] = useState(3); // Mock cart count
  const navigate = useNavigate();

  const handleLogout = () => {
    // Mock logout
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {userType === "admin" && setSidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <Link to={userType === "admin" ? "/admin" : "/dashboard"} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center shadow-lg">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Grab A Bite
              </h1>
              <p className="text-xs text-muted-foreground">
                {userType === "admin" ? "Admin Portal" : "Cafeteria Pre-ordering"}
              </p>
            </div>
          </Link>
        </div>

        {/* Center Navigation - Student Only */}
        {userType === "student" && (
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-sm font-medium">
                Menu
              </Button>
            </Link>
            <Link to="/orders">
              <Button variant="ghost" className="text-sm font-medium">
                My Orders
              </Button>
            </Link>
            <Link to="/recommendations">
              <Button variant="ghost" className="text-sm font-medium">
                Recommendations
              </Button>
            </Link>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-primary">
              2
            </Badge>
          </Button>

          {/* Cart - Student Only */}
          {userType === "student" && (
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-primary">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </Link>
          )}

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    JD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john.doe@college.edu
                </p>
                <Badge variant="secondary" className="w-fit mt-2">
                  {userType === "admin" ? "Admin" : "Student"}
                </Badge>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};