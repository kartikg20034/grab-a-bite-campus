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
    name: "Veggie Deluxe Burger",
    description: "Fresh lettuce, tomato, cheese with crispy veggie patty on sesame bun",
    price: 120,
    image: burgerImg,
    category: "Burgers",
    rating: 4.5,
    isVeg: true,
    isAvailable: true,
    prepTime: 15
  },
  {
    id: "2", 
    name: "Caesar Salad Bowl",
    description: "Crisp lettuce, grilled chicken, parmesan cheese with caesar dressing",
    price: 95,
    image: saladImg,
    category: "Salads",
    rating: 4.3,
    isVeg: false,
    isAvailable: true,
    prepTime: 8
  },
  {
    id: "3",
    name: "Mushroom Pasta",
    description: "Creamy pasta with fresh mushrooms and herbs, garnished with basil",
    price: 140,
    image: pastaImg,
    category: "Pasta",
    rating: 4.7,
    isVeg: true,
    isAvailable: true,
    prepTime: 20
  },
  {
    id: "4",
    name: "Fresh Veggie Sandwich",
    description: "Layers of cucumber, tomato, lettuce and cheese on whole grain bread",
    price: 80,
    image: sandwichImg,
    category: "Sandwiches",
    rating: 4.2,
    isVeg: true,
    isAvailable: false,
    prepTime: 5
  }
];

const categories = ["All", "Burgers", "Salads", "Pasta", "Sandwiches", "Beverages"];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to grab a bite? Today's menu is fresh and delicious!
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Open until 9:00 PM</span>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success">
                MIT Campus Café
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Scan Food
            </Button>
            <Button variant="food" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Get Recommendations
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orders This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Money Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">₹240</div>
            <p className="text-xs text-muted-foreground">With pre-ordering discounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Favorite Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Burgers</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Most ordered
            </p>
          </CardContent>
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
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-muted/50">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="text-xs md:text-sm"
              >
                {category}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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