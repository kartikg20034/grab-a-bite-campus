import { useState } from "react";
import { FoodCard } from "@/components/FoodCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Upload, Sparkles, Clock, TrendingUp } from "lucide-react";

// Import food images
import burgerImg from "@/assets/food-burger.jpg";
import saladImg from "@/assets/food-salad.jpg";
import pastaImg from "@/assets/food-pasta.jpg";
import sandwichImg from "@/assets/food-sandwich.jpg";

const mockFoodItems = [
  {
    id: "1",
    name: "Butter Chicken",
    description: "Tender chicken in rich tomato-based curry with butter and cream",
    price: 180,
    image: burgerImg,
    category: "Main Course",
    rating: 4.8,
    isVeg: false,
    isAvailable: true,
    prepTime: 25,
    mealTime: ["lunch", "dinner"]
  },
  {
    id: "2", 
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes in creamy tomato-based gravy with aromatic spices",
    price: 160,
    image: saladImg,
    category: "Main Course",
    rating: 4.6,
    isVeg: true,
    isAvailable: true,
    prepTime: 20,
    mealTime: ["lunch", "dinner"]
  },
  {
    id: "3",
    name: "Masala Dosa",
    description: "Crispy rice crepe with spiced potato filling, served with chutney and sambar",
    price: 80,
    image: pastaImg,
    category: "South Indian",
    rating: 4.7,
    isVeg: true,
    isAvailable: true,
    prepTime: 15,
    mealTime: ["breakfast", "lunch"]
  },
  {
    id: "4",
    name: "Chole Bhature",
    description: "Spicy chickpea curry with fluffy deep-fried bread",
    price: 120,
    image: sandwichImg,
    category: "North Indian",
    rating: 4.5,
    isVeg: true,
    isAvailable: true,
    prepTime: 18,
    mealTime: ["breakfast", "lunch"]
  },
  {
    id: "5",
    name: "Biryani (Veg)",
    description: "Aromatic basmati rice with mixed vegetables and traditional spices",
    price: 150,
    image: burgerImg,
    category: "Rice",
    rating: 4.4,
    isVeg: true,
    isAvailable: true,
    prepTime: 30,
    mealTime: ["lunch", "dinner"]
  },
  {
    id: "6",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice with tender chicken pieces and aromatic spices",
    price: 200,
    image: saladImg,
    category: "Rice",
    rating: 4.9,
    isVeg: false,
    isAvailable: true,
    prepTime: 35,
    mealTime: ["lunch", "dinner"]
  },
  {
    id: "7",
    name: "Idli Sambar",
    description: "Steamed rice cakes served with lentil curry and coconut chutney",
    price: 60,
    image: pastaImg,
    category: "South Indian",
    rating: 4.3,
    isVeg: true,
    isAvailable: true,
    prepTime: 10,
    mealTime: ["breakfast"]
  },
  {
    id: "8",
    name: "Rajma Rice",
    description: "Red kidney beans curry served with steamed basmati rice",
    price: 130,
    image: sandwichImg,
    category: "North Indian",
    rating: 4.2,
    isVeg: true,
    isAvailable: true,
    prepTime: 20,
    mealTime: ["lunch", "dinner"]
  },
  {
    id: "9",
    name: "Samosa (2 pcs)",
    description: "Crispy triangular pastries filled with spiced potatoes and peas",
    price: 40,
    image: burgerImg,
    category: "Snacks",
    rating: 4.1,
    isVeg: true,
    isAvailable: true,
    prepTime: 5,
    mealTime: ["breakfast", "evening"]
  },
  {
    id: "10",
    name: "Pav Bhaji",
    description: "Spicy mixed vegetable curry served with buttered bread rolls",
    price: 100,
    image: saladImg,
    category: "Street Food",
    rating: 4.6,
    isVeg: true,
    isAvailable: true,
    prepTime: 15,
    mealTime: ["lunch", "evening"]
  },
  {
    id: "11",
    name: "Aloo Paratha",
    description: "Stuffed flatbread with spiced potato filling, served with curd and pickle",
    price: 90,
    image: pastaImg,
    category: "North Indian",
    rating: 4.4,
    isVeg: true,
    isAvailable: true,
    prepTime: 12,
    mealTime: ["breakfast", "lunch"]
  },
  {
    id: "12",
    name: "Masala Chai",
    description: "Traditional Indian spiced tea with milk and aromatic spices",
    price: 25,
    image: sandwichImg,
    category: "Beverages",
    rating: 4.5,
    isVeg: true,
    isAvailable: true,
    prepTime: 5,
    mealTime: ["breakfast", "evening"]
  }
];

const categories = ["All", "Main Course", "South Indian", "North Indian", "Rice", "Snacks", "Street Food", "Beverages"];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Get user info from localStorage (would come from auth in real app)
  const collegeId = localStorage.getItem('collegeId') || 'MIT-001';
  const cafeteriaId = localStorage.getItem('cafeteriaId') || 'CAFE-A1';

  const filteredItems = mockFoodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: any, quantity: number) => {
    console.log(`Added ${quantity} ${item.name} to cart`);
    // Here you would typically update a cart state or call an API
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto px-4 py-2">
      {/* Mobile-Optimized Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-xl p-4 border border-primary/20">
        <div className="space-y-3">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1">
              Welcome back, John! 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Ready to grab a bite?
            </p>
            <div className="flex flex-col gap-2 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Open until 9:00 PM</span>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success text-xs w-fit">
                {cafeteriaId} • {collegeId}
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 flex-1 text-xs">
              <Upload className="h-3 w-3" />
              Scan Food
            </Button>
            <Button variant="food" size="sm" className="gap-2 flex-1 text-xs">
              <Sparkles className="h-3 w-3" />
              AI Picks
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Stats Cards */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">Orders</p>
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg font-bold text-success">₹240</div>
            <p className="text-xs text-muted-foreground">Saved</p>
          </div>
        </Card>
        
        <Card className="p-3">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">4.8</div>
            <p className="text-xs text-muted-foreground">Rating</p>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for food items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-card"
          />
        </div>
        
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1 bg-muted/50 p-1">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-xs px-2 py-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category === "Main Course" ? "Main" : category === "South Indian" ? "South" : category === "North Indian" ? "North" : category === "Street Food" ? "Street" : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Food Menu Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Today's Menu
          </h2>
          <Badge variant="outline" className="text-xs">
            {filteredItems.length} items available
          </Badge>
        </div>
        
        {filteredItems.length > 0 ? (
          <div className="space-y-3">
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-2">
              No items found matching your search.
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}