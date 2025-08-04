import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  UtensilsCrossed, 
  Clock, 
  Star, 
  Users, 
  Smartphone,
  Shield,
  Zap,
  ArrowRight,
  UserCog,
  ShoppingBag
} from "lucide-react";

export default function LandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const navigate = useNavigate();

  const handleAuth = () => {
    // Mock authentication - in real app, this would handle Google OAuth
    if (isLogin) {
      navigate("/dashboard");
    } else {
      setShowRoleSelection(true);
    }
  };

  const handleRoleSelection = (role: 'admin' | 'student') => {
    // Store role and navigate to onboarding
    localStorage.setItem('userRole', role);
    navigate("/onboarding");
  };

  const features = [
    {
      icon: Clock,
      title: "Skip the Queue",
      description: "Pre-order your meals and pick them up without waiting"
    },
    {
      icon: Smartphone,
      title: "Easy Ordering",
      description: "Browse menu, customize orders, and pay seamlessly"
    },
    {
      icon: Star,
      title: "AI Recommendations",
      description: "Get personalized food suggestions based on your preferences"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Safe and secure UPI payments with order tracking"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center shadow-xl">
              <UtensilsCrossed className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Grab A Bite
              </h1>
              <p className="text-muted-foreground text-lg">
                Smart Cafeteria Pre-ordering System
              </p>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Skip the queues, save time, and enjoy fresh meals at your college cafeteria. 
              Order ahead, pay online, and grab your food when it's ready!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              500+ Students Already Using
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              Average 5 mins Saved Per Order
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
              4.8/5 Student Rating
            </Badge>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Features Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose Grab A Bite?
              </h2>
              <p className="text-muted-foreground text-lg">
                Experience the future of campus dining with our smart pre-ordering system designed specifically for college life.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-primary-glow/5 rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  Quick Demo
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Want to see how it works? Try our demo with sample data and explore all features.
              </p>
              <Button 
                variant="outline" 
                onClick={() => navigate("/dashboard")}
                className="gap-2"
              >
                View Demo Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Auth Section */}
          <div className="flex justify-center">
            {!showRoleSelection ? (
              <Card className="w-full max-w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <UtensilsCrossed className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      {isLogin ? "Welcome Back!" : "Join Grab A Bite"}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {isLogin 
                        ? "Sign in to your account to start ordering" 
                        : "Create your account to get started"
                      }
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        College Email Address
                      </Label>
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="john.doe@college.edu"
                        className="h-11"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Input 
                        id="password"
                        type="password" 
                        placeholder="Enter your password"
                        className="h-11"
                      />
                    </div>

                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                          Confirm Password
                        </Label>
                        <Input 
                          id="confirmPassword"
                          type="password" 
                          placeholder="Confirm your password"
                          className="h-11"
                        />
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={handleAuth}
                    className="w-full h-11 text-base font-semibold"
                    variant="food"
                  >
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full h-11 gap-3"
                    onClick={handleAuth}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </Button>

                  <div className="text-center">
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      {isLogin 
                        ? "Don't have an account? Sign up" 
                        : "Already have an account? Sign in"
                      }
                    </button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="w-full max-w-md shadow-xl border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <UtensilsCrossed className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">
                      Choose Your Role
                    </CardTitle>
                    <CardDescription className="text-base">
                      Are you a cafeteria admin or want to place an order?
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => handleRoleSelection('student')}
                    className="w-full h-16 text-left justify-start gap-4"
                    variant="outline"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Want to Place Order</div>
                      <div className="text-sm text-muted-foreground">Browse menu and order food</div>
                    </div>
                  </Button>

                  <Button 
                    onClick={() => handleRoleSelection('admin')}
                    className="w-full h-16 text-left justify-start gap-4"
                    variant="outline"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <UserCog className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Cafeteria Admin</div>
                      <div className="text-sm text-muted-foreground">Manage menu and orders</div>
                    </div>
                  </Button>

                  <div className="text-center pt-4">
                    <button
                      onClick={() => setShowRoleSelection(false)}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      Back to sign up
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}