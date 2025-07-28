import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FoodCard } from "@/components/FoodCard";
import { Camera, Upload, Sparkles, TrendingUp } from "lucide-react";

export default function Recommendations() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const recommendations = [
    {
      id: 1,
      name: "Masala Dosa",
      description: "Crispy fermented crepe with spiced potato filling",
      price: 60,
      image: "/src/assets/food-sandwich.jpg",
      category: "South Indian",
      rating: 4.5,
      isAvailable: true,
      isVeg: true,
      prepTime: 15,
      reason: "Based on your love for South Indian food"
    },
    {
      id: 2,
      name: "Paneer Butter Masala",
      description: "Rich and creamy paneer curry with aromatic spices",
      price: 140,
      image: "/src/assets/food-pasta.jpg",
      category: "North Indian",
      rating: 4.7,
      isAvailable: true,
      isVeg: true,
      prepTime: 20,
      reason: "Popular among users with similar taste"
    }
  ];

  const trendingItems = [
    { name: "Chole Bhature", orders: 45, change: "+12%" },
    { name: "Rajma Rice", orders: 38, change: "+8%" },
    { name: "Samosa", orders: 35, change: "+15%" }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">AI Recommendations</h1>
        <p className="text-muted-foreground">Personalized suggestions just for you</p>
      </div>

      {/* Image Upload Section */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Food Image Recognition
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
            {uploadedImage ? (
              <div className="space-y-3">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded food" 
                  className="w-32 h-32 object-cover rounded-lg mx-auto"
                />
                <p className="text-sm text-muted-foreground">
                  Analyzing image... This looks like Biryani!
                </p>
                <Button variant="food" size="sm">
                  Find Similar Items
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">
                  Upload a food image to find similar items in our menu
                </p>
                <label htmlFor="image-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Upload Image
                  </Button>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trending This Week */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Trending This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trendingItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.orders} orders today</p>
                </div>
                <Badge variant="secondary" className="text-green-600">
                  {item.change}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Just For You
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((item) => (
              <div key={item.id} className="space-y-2">
                <FoodCard item={item} />
                <p className="text-xs text-muted-foreground px-2">
                  💡 {item.reason}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}