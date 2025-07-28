import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Coffee, ArrowRight, Building2, MapPin } from "lucide-react";

export default function Onboarding() {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'student'; // student or admin
  
  const [step, setStep] = useState(1);
  const [collegeId, setCollegeId] = useState("");
  const [cafeteriaId, setCafeteriaId] = useState("");
  const [selectedCafe, setSelectedCafe] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCollegeSubmit = () => {
    if (!collegeId) return;
    setStep(2);
  };

  const handleCafeSelect = (cafe: any) => {
    setSelectedCafe(cafe);
    setCafeteriaId(cafe.id);
  };

  const handleFinalSubmit = async () => {
    if (userType === 'admin' && (!collegeId || !cafeteriaId)) return;
    if (userType === 'student' && (!collegeId || !selectedCafe)) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store in localStorage for demo
    localStorage.setItem('collegeId', collegeId);
    localStorage.setItem('cafeteriaId', selectedCafe?.id || cafeteriaId);
    localStorage.setItem('userType', userType);
    
    setIsLoading(false);
    navigate(userType === 'admin' ? '/admin' : '/dashboard');
  };

  const sampleColleges = [
    { id: "MIT-001", name: "MIT Chennai", cafeterias: 4 },
    { id: "IIT-002", name: "IIT Delhi", cafeterias: 6 },
    { id: "NIT-003", name: "NIT Trichy", cafeterias: 3 },
    { id: "VIT-004", name: "VIT Vellore", cafeterias: 5 }
  ];

  // Mock cafeterias based on selected college
  const getCafeteriasForCollege = (collegeId: string) => {
    const cafeterias = {
      "MIT-001": [
        { id: "CAFE-MIT-A1", name: "Main Campus Café", location: "Academic Block A", timings: "7:00 AM - 9:00 PM", specialty: "South Indian" },
        { id: "CAFE-MIT-B2", name: "Food Court", location: "Student Center", timings: "8:00 AM - 10:00 PM", specialty: "Multi-cuisine" },
        { id: "CAFE-MIT-C3", name: "Quick Bites", location: "Library Block", timings: "9:00 AM - 8:00 PM", specialty: "Snacks & Beverages" },
        { id: "CAFE-MIT-D4", name: "Hostel Mess", location: "Hostel Complex", timings: "6:30 AM - 9:30 PM", specialty: "Home-style meals" }
      ],
      "IIT-002": [
        { id: "CAFE-IIT-A1", name: "Central Cafeteria", location: "Main Building", timings: "7:00 AM - 10:00 PM", specialty: "North Indian" },
        { id: "CAFE-IIT-B2", name: "Tech Hub Café", location: "Engineering Block", timings: "8:00 AM - 9:00 PM", specialty: "Continental" },
        { id: "CAFE-IIT-C3", name: "24/7 Canteen", location: "Hostel Area", timings: "24 Hours", specialty: "All-day dining" }
      ]
    };
    return cafeterias[collegeId as keyof typeof cafeterias] || [];
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto shadow-elegant border-primary/20">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-2">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Welcome to Grab A Bite! 🍽️
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              {userType === 'admin' ? 'Admin Setup - Enter your college details' : 'Let\'s find your college first'}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
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
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {sampleColleges.map((college) => (
                    <Badge
                      key={college.id}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10 text-xs"
                      onClick={() => setCollegeId(college.id)}
                    >
                      {college.id} ({college.cafeterias} cafés)
                    </Badge>
                  ))}
                </div>
              </div>

              {userType === 'admin' && (
                <div className="space-y-2">
                  <Label htmlFor="adminCafeId" className="flex items-center gap-2">
                    <Coffee className="h-4 w-4" />
                    Your Cafeteria ID (provided by platform)
                  </Label>
                  <Input
                    id="adminCafeId"
                    value={cafeteriaId}
                    onChange={(e) => setCafeteriaId(e.target.value)}
                    placeholder="Enter your assigned cafe ID"
                    className="h-12"
                  />
                </div>
              )}

              <Button
                onClick={userType === 'admin' ? handleFinalSubmit : handleCollegeSubmit}
                className="w-full h-12 mt-6"
                disabled={!collegeId || (userType === 'admin' && !cafeteriaId) || isLoading}
                variant="food"
              >
                {isLoading ? (
                  "Setting up your account..."
                ) : userType === 'admin' ? (
                  <>
                    Setup Admin Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

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

  // Step 2: Cafeteria Selection (Student only)
  const availableCafeterias = getCafeteriasForCollege(collegeId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-elegant border-primary/20">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-2">
            <Coffee className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">Choose Your Cafeteria</CardTitle>
          <p className="text-muted-foreground text-sm">
            Select a cafeteria from {sampleColleges.find(c => c.id === collegeId)?.name}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {availableCafeterias.map((cafe) => (
              <Card 
                key={cafe.id} 
                className={`cursor-pointer transition-all hover:shadow-md border-2 ${
                  selectedCafe?.id === cafe.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleCafeSelect(cafe)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">{cafe.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {cafe.location}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {cafe.timings}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {cafe.specialty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleFinalSubmit}
              disabled={!selectedCafe || isLoading}
              variant="food"
              className="flex-1"
            >
              {isLoading ? (
                "Setting up..."
              ) : (
                <>
                  Start Ordering
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}