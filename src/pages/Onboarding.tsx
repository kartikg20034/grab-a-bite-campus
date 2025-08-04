import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Coffee, ArrowRight, Building2, MapPin, Clock, Users, Phone, Mail, CreditCard } from "lucide-react";

export default function Onboarding() {
  const userType = (localStorage.getItem('userRole') as 'student' | 'admin') || 'student';
  
  const [step, setStep] = useState(1);
  const [collegeId, setCollegeId] = useState("");
  const [cafeteriaId, setCafeteriaId] = useState("");
  const [selectedCafe, setSelectedCafe] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Admin-specific form data
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
    cafeName: "",
    location: "",
    contactPhone: "",
    contactEmail: "",
    operatingHours: {
      openTime: "07:00",
      closeTime: "21:00",
      isOpen24x7: false
    },
    capacity: "",
    cuisine: "",
    description: "",
    acceptsOnlinePayments: true,
    preparationTime: "15"
  });

  const handleCollegeSubmit = () => {
    if (!collegeId) return;
    if (userType === 'admin') {
      setStep(2);
    } else {
      setStep(2);
    }
  };

  const handleAdminStep2Submit = () => {
    if (!cafeteriaId) return;
    setStep(3);
  };

  const handleAdminStep3Submit = () => {
    if (!adminData.cafeName || !adminData.location) return;
    setStep(4);
  };

  const handleCafeSelect = (cafe: any) => {
    setSelectedCafe(cafe);
    setCafeteriaId(cafe.id);
  };

  const updateAdminData = (field: string, value: any) => {
    setAdminData(prev => ({ ...prev, [field]: value }));
  };

  const updateOperatingHours = (field: string, value: any) => {
    setAdminData(prev => ({
      ...prev,
      operatingHours: { ...prev.operatingHours, [field]: value }
    }));
  };

  const handleFinalSubmit = async () => {
    if (userType === 'admin' && (!collegeId || !cafeteriaId || !adminData.cafeName)) return;
    if (userType === 'student' && (!collegeId || !selectedCafe)) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store in localStorage for demo
    localStorage.setItem('collegeId', collegeId);
    localStorage.setItem('cafeteriaId', selectedCafe?.id || cafeteriaId);
    localStorage.setItem('userType', userType);
    if (userType === 'admin') {
      localStorage.setItem('adminData', JSON.stringify(adminData));
    }
    
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


              <Button
                onClick={handleCollegeSubmit}
                className="w-full h-12 mt-6"
                disabled={!collegeId}
                variant="food"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
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

  // Admin Step 2: Cafeteria Login
  if (userType === 'admin' && step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto shadow-elegant border-primary/20">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-2">
              <Coffee className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Cafeteria Login</CardTitle>
            <p className="text-muted-foreground text-sm">
              Enter your cafeteria credentials provided by the platform
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cafeId" className="flex items-center gap-2">
                  <Coffee className="h-4 w-4" />
                  Cafeteria ID
                </Label>
                <Input
                  id="cafeId"
                  value={cafeteriaId}
                  onChange={(e) => setCafeteriaId(e.target.value)}
                  placeholder="CAFE-MIT-001"
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  value={adminData.username || ""}
                  onChange={(e) => updateAdminData('username', e.target.value)}
                  placeholder="Your cafeteria username"
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={adminData.password || ""}
                  onChange={(e) => updateAdminData('password', e.target.value)}
                  placeholder="Your cafeteria password"
                  className="h-12"
                />
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              These credentials were provided when you registered your cafeteria
            </p>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleAdminStep2Submit}
                disabled={!cafeteriaId || !adminData.username || !adminData.password}
                variant="food" 
                className="flex-1"
              >
                Login <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin Step 3: Cafeteria Details
  if (userType === 'admin' && step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg mx-auto shadow-elegant border-primary/20">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-2">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Cafeteria Details</CardTitle>
            <p className="text-muted-foreground text-sm">
              Tell us about your cafeteria
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="cafeName">Cafeteria Name</Label>
                <Input
                  id="cafeName"
                  value={adminData.cafeName}
                  onChange={(e) => updateAdminData('cafeName', e.target.value)}
                  placeholder="Main Campus Cafe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={adminData.location}
                  onChange={(e) => updateAdminData('location', e.target.value)}
                  placeholder="Academic Block A, Ground Floor"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input
                    id="phone"
                    value={adminData.contactPhone}
                    onChange={(e) => updateAdminData('contactPhone', e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Seating Capacity</Label>
                  <Input
                    id="capacity"
                    value={adminData.capacity}
                    onChange={(e) => updateAdminData('capacity', e.target.value)}
                    placeholder="50"
                    type="number"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  value={adminData.contactEmail}
                  onChange={(e) => updateAdminData('contactEmail', e.target.value)}
                  placeholder="cafe@college.edu"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={adminData.description}
                  onChange={(e) => updateAdminData('description', e.target.value)}
                  placeholder="Brief description of your cafeteria..."
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleAdminStep3Submit}
                disabled={!adminData.cafeName || !adminData.location}
                variant="food" 
                className="flex-1"
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin Step 4: Operating Hours & Final Setup
  if (userType === 'admin' && step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary-glow/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg mx-auto shadow-elegant border-primary/20">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-2">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Operating Hours & Settings</CardTitle>
            <p className="text-muted-foreground text-sm">
              Configure your cafeteria operations
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">24/7 Operations</Label>
                  <p className="text-xs text-muted-foreground">Open all day, every day</p>
                </div>
                <Switch
                  checked={adminData.operatingHours.isOpen24x7}
                  onCheckedChange={(checked) => updateOperatingHours('isOpen24x7', checked)}
                />
              </div>

              {!adminData.operatingHours.isOpen24x7 && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openTime">Opening Time</Label>
                    <Input
                      id="openTime"
                      type="time"
                      value={adminData.operatingHours.openTime}
                      onChange={(e) => updateOperatingHours('openTime', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closeTime">Closing Time</Label>
                    <Input
                      id="closeTime"
                      type="time"
                      value={adminData.operatingHours.closeTime}
                      onChange={(e) => updateOperatingHours('closeTime', e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="cuisine">Cuisine Type</Label>
                <Select value={adminData.cuisine} onValueChange={(value) => updateAdminData('cuisine', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cuisine type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="south-indian">South Indian</SelectItem>
                    <SelectItem value="north-indian">North Indian</SelectItem>
                    <SelectItem value="multi-cuisine">Multi-cuisine</SelectItem>
                    <SelectItem value="continental">Continental</SelectItem>
                    <SelectItem value="fast-food">Fast Food</SelectItem>
                    <SelectItem value="snacks">Snacks & Beverages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prepTime">Average Preparation Time (minutes)</Label>
                <Input
                  id="prepTime"
                  type="number"
                  value={adminData.preparationTime}
                  onChange={(e) => updateAdminData('preparationTime', e.target.value)}
                  placeholder="15"
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Accept Online Payments</Label>
                  <p className="text-xs text-muted-foreground">Enable Razorpay integration</p>
                </div>
                <Switch
                  checked={adminData.acceptsOnlinePayments}
                  onCheckedChange={(checked) => updateAdminData('acceptsOnlinePayments', checked)}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleFinalSubmit}
                disabled={isLoading}
                variant="food" 
                className="flex-1"
              >
                {isLoading ? (
                  "Creating Dashboard..."
                ) : (
                  <>
                    Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Step 2: Student Cafeteria Selection
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