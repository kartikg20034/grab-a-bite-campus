import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Coffee, ArrowRight, Building2 } from "lucide-react";

export default function Onboarding() {
  const [collegeId, setCollegeId] = useState("");
  const [cafeteriaId, setCafeteriaId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collegeId || !cafeteriaId) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store in localStorage for demo
    localStorage.setItem('collegeId', collegeId);
    localStorage.setItem('cafeteriaId', cafeteriaId);
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  const sampleColleges = [
    { id: "MIT-001", name: "MIT Chennai" },
    { id: "IIT-002", name: "IIT Delhi" },
    { id: "NIT-003", name: "NIT Trichy" },
    { id: "VIT-004", name: "VIT Vellore" }
  ];

  const sampleCafeterias = [
    { id: "CAFE-A1", name: "Main Campus Café", location: "Building A" },
    { id: "CAFE-B2", name: "Food Court", location: "Student Center" },
    { id: "CAFE-C3", name: "Quick Bites", location: "Library Block" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-elegant border-primary/20">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-2">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to Grab A Bite! 🍽️</CardTitle>
          <p className="text-muted-foreground text-sm">
            Let's set up your college cafeteria preferences
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* College ID */}
            <div className="space-y-2">
              <Label htmlFor="collegeId" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                College Unique ID
              </Label>
              <Input
                id="collegeId"
                value={collegeId}
                onChange={(e) => setCollegeId(e.target.value)}
                placeholder="Enter your college ID (e.g., MIT-001)"
                className="h-12"
                required
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {sampleColleges.map((college) => (
                  <Badge
                    key={college.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 text-xs"
                    onClick={() => setCollegeId(college.id)}
                  >
                    {college.id}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Cafeteria ID */}
            <div className="space-y-2">
              <Label htmlFor="cafeteriaId" className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                Cafeteria ID
              </Label>
              <Input
                id="cafeteriaId"
                value={cafeteriaId}
                onChange={(e) => setCafeteriaId(e.target.value)}
                placeholder="Enter cafeteria ID (e.g., CAFE-A1)"
                className="h-12"
                required
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {sampleCafeterias.map((cafe) => (
                  <Badge
                    key={cafe.id}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 text-xs"
                    onClick={() => setCafeteriaId(cafe.id)}
                  >
                    {cafe.id}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 mt-6"
              disabled={!collegeId || !cafeteriaId || isLoading}
              variant="food"
            >
              {isLoading ? (
                "Setting up your account..."
              ) : (
                <>
                  Continue to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Don't know your IDs? Contact your college administration
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}