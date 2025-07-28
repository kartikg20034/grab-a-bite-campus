import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Clock, 
  Edit, 
  Plus, 
  Search, 
  Calendar,
  ChefHat,
  Settings,
  Save,
  AlertCircle
} from "lucide-react";

// Comprehensive Indian menu items (admin can select from these)
const allIndianMenuItems = [
  // Main Course - North Indian
  { id: "1", name: "Butter Chicken", category: "North Indian", price: 180, isVeg: false, isActive: true, availableSlots: ["lunch", "dinner"], description: "Tender chicken in rich tomato-butter gravy" },
  { id: "2", name: "Paneer Butter Masala", category: "North Indian", price: 160, isVeg: true, isActive: true, availableSlots: ["lunch", "dinner"], description: "Cottage cheese in creamy tomato sauce" },
  { id: "3", name: "Dal Makhani", category: "North Indian", price: 120, isVeg: true, isActive: true, availableSlots: ["lunch", "dinner"], description: "Creamy black lentil curry" },
  { id: "4", name: "Chole Bhature", category: "North Indian", price: 100, isVeg: true, isActive: true, availableSlots: ["breakfast", "lunch"], description: "Spicy chickpeas with fried bread" },
  { id: "5", name: "Rajma Rice", category: "North Indian", price: 130, isVeg: true, isActive: true, availableSlots: ["lunch", "dinner"], description: "Red kidney beans with steamed rice" },
  { id: "6", name: "Aloo Paratha", category: "North Indian", price: 90, isVeg: true, isActive: true, availableSlots: ["breakfast", "lunch"], description: "Stuffed potato flatbread with curd" },
  
  // South Indian
  { id: "7", name: "Masala Dosa", category: "South Indian", price: 80, isVeg: true, isActive: true, availableSlots: ["breakfast", "lunch"], description: "Crispy crepe with spiced potato filling" },
  { id: "8", name: "Idli Sambar", category: "South Indian", price: 60, isVeg: true, isActive: true, availableSlots: ["breakfast"], description: "Steamed rice cakes with lentil curry" },
  { id: "9", name: "Medu Vada", category: "South Indian", price: 70, isVeg: true, isActive: true, availableSlots: ["breakfast"], description: "Crispy lentil donuts with sambar" },
  { id: "10", name: "Uttapam", category: "South Indian", price: 85, isVeg: true, isActive: true, availableSlots: ["breakfast", "lunch"], description: "Thick pancake with vegetables" },
  { id: "11", name: "Rava Upma", category: "South Indian", price: 55, isVeg: true, isActive: true, availableSlots: ["breakfast"], description: "Semolina porridge with vegetables" },
  
  // Rice Dishes
  { id: "12", name: "Chicken Biryani", category: "Rice", price: 200, isVeg: false, isActive: true, availableSlots: ["lunch", "dinner"], description: "Aromatic rice with tender chicken" },
  { id: "13", name: "Mutton Biryani", category: "Rice", price: 250, isVeg: false, isActive: true, availableSlots: ["lunch", "dinner"], description: "Fragrant rice with succulent mutton" },
  { id: "14", name: "Vegetable Biryani", category: "Rice", price: 150, isVeg: true, isActive: true, availableSlots: ["lunch", "dinner"], description: "Aromatic rice with mixed vegetables" },
  { id: "15", name: "Jeera Rice", category: "Rice", price: 80, isVeg: true, isActive: true, availableSlots: ["lunch", "dinner"], description: "Cumin flavored basmati rice" },
  { id: "16", name: "Curd Rice", category: "Rice", price: 70, isVeg: true, isActive: true, availableSlots: ["lunch", "dinner"], description: "Yogurt rice with tempered spices" },
  
  // Street Food
  { id: "17", name: "Pav Bhaji", category: "Street Food", price: 100, isVeg: true, isActive: true, availableSlots: ["lunch", "evening"], description: "Spiced vegetable curry with bread" },
  { id: "18", name: "Vada Pav", category: "Street Food", price: 40, isVeg: true, isActive: true, availableSlots: ["breakfast", "evening"], description: "Mumbai's favorite potato burger" },
  { id: "19", name: "Bhel Puri", category: "Street Food", price: 60, isVeg: true, isActive: true, availableSlots: ["evening"], description: "Puffed rice with tangy chutneys" },
  { id: "20", name: "Dahi Puri", category: "Street Food", price: 70, isVeg: true, isActive: true, availableSlots: ["evening"], description: "Crispy puris with yogurt and chutney" },
  
  // Snacks
  { id: "21", name: "Samosa (2 pcs)", category: "Snacks", price: 40, isVeg: true, isActive: true, availableSlots: ["breakfast", "evening"], description: "Crispy pastry with spiced potato filling" },
  { id: "22", name: "Kachori (2 pcs)", category: "Snacks", price: 45, isVeg: true, isActive: true, availableSlots: ["breakfast", "evening"], description: "Flaky pastry with lentil filling" },
  { id: "23", name: "Bread Pakoda", category: "Snacks", price: 50, isVeg: true, isActive: true, availableSlots: ["evening"], description: "Bread fritters with green chutney" },
  { id: "24", name: "Aloo Tikki", category: "Snacks", price: 60, isVeg: true, isActive: true, availableSlots: ["evening"], description: "Spiced potato patties with chutneys" },
  
  // Beverages
  { id: "25", name: "Masala Chai", category: "Beverages", price: 25, isVeg: true, isActive: true, availableSlots: ["breakfast", "evening"], description: "Traditional spiced tea with milk" },
  { id: "26", name: "Filter Coffee", category: "Beverages", price: 30, isVeg: true, isActive: true, availableSlots: ["breakfast", "evening"], description: "South Indian style coffee" },
  { id: "27", name: "Lassi", category: "Beverages", price: 50, isVeg: true, isActive: true, availableSlots: ["lunch", "evening"], description: "Refreshing yogurt drink" },
  { id: "28", name: "Fresh Lime Water", category: "Beverages", price: 35, isVeg: true, isActive: true, availableSlots: ["lunch", "evening"], description: "Refreshing lime juice with mint" },
  
  // Sweets
  { id: "29", name: "Gulab Jamun (2 pcs)", category: "Sweets", price: 60, isVeg: true, isActive: true, availableSlots: ["lunch", "dinner"], description: "Soft milk dumplings in sugar syrup" },
  { id: "30", name: "Jalebi", category: "Sweets", price: 80, isVeg: true, isActive: true, availableSlots: ["breakfast", "evening"], description: "Crispy spirals soaked in sugar syrup" },
  { id: "31", name: "Rasgulla (2 pcs)", category: "Sweets", price: 50, isVeg: true, isActive: true, availableSlots: ["lunch", "dinner"], description: "Spongy cottage cheese balls in syrup" },
  
  // Tandoor
  { id: "32", name: "Tandoori Chicken", category: "Tandoor", price: 220, isVeg: false, isActive: true, availableSlots: ["dinner"], description: "Clay oven roasted chicken with spices" },
  { id: "33", name: "Naan", category: "Tandoor", price: 40, isVeg: true, isActive: true, availableSlots: ["lunch", "dinner"], description: "Soft leavened bread from tandoor" },
  { id: "34", name: "Garlic Naan", category: "Tandoor", price: 50, isVeg: true, isActive: true, availableSlots: ["lunch", "dinner"], description: "Naan topped with garlic and herbs" },
  { id: "35", name: "Tandoori Roti", category: "Tandoor", price: 25, isVeg: true, isActive: true, availableSlots: ["lunch", "dinner"], description: "Whole wheat bread from tandoor" }
];

const mealSlots = [
  { id: "breakfast", name: "Breakfast", time: "7:00 AM - 10:30 AM" },
  { id: "lunch", name: "Lunch", time: "12:00 PM - 3:30 PM" },
  { id: "dinner", name: "Dinner", time: "6:00 PM - 9:30 PM" },
  { id: "evening", name: "Evening Snacks", time: "4:00 PM - 6:00 PM" }
];

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState(allIndianMenuItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("breakfast");
  const [orderTimings, setOrderTimings] = useState({
    breakfast: "10:00",
    lunch: "15:00", 
    dinner: "21:00",
    evening: "17:30"
  });

  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleItem = (itemId: string) => {
    setMenuItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const handleSlotToggle = (itemId: string, slot: string) => {
    setMenuItems(items =>
      items.map(item => {
        if (item.id === itemId) {
          const hasSlot = item.availableSlots.includes(slot);
          return {
            ...item,
            availableSlots: hasSlot 
              ? item.availableSlots.filter(s => s !== slot)
              : [...item.availableSlots, slot]
          };
        }
        return item;
      })
    );
  };

  const handleTimingChange = (slot: string, time: string) => {
    setOrderTimings(prev => ({ ...prev, [slot]: time }));
  };

  const getSlotItems = (slot: string) => {
    return menuItems.filter(item => 
      item.isActive && item.availableSlots.includes(slot)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Menu Management</h1>
          <p className="text-muted-foreground">
            Configure meal timings and manage menu items for different time slots
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
          <Button variant="food" className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Item
          </Button>
        </div>
      </div>

      <Tabs defaultValue="timings" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timings">Order Timings</TabsTrigger>
          <TabsTrigger value="menu">Menu Items</TabsTrigger>
          <TabsTrigger value="schedule">Meal Schedule</TabsTrigger>
        </TabsList>

        {/* Order Timings Tab */}
        <TabsContent value="timings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Cutoff Timings for Orders
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Set the last time students can place orders for each meal slot
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mealSlots.map((slot) => (
                  <div key={slot.id} className="space-y-3 p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">{slot.name}</h3>
                        <p className="text-sm text-muted-foreground">{slot.time}</p>
                      </div>
                      <Badge variant="outline">
                        {getSlotItems(slot.id).length} items
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Orders close at:
                      </Label>
                      <Input
                        type="time"
                        value={orderTimings[slot.id as keyof typeof orderTimings]}
                        onChange={(e) => handleTimingChange(slot.id, e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Menu Items Tab */}
        <TabsContent value="menu" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  All Menu Items
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full md:w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={item.isActive}
                        onCheckedChange={() => handleToggleItem(item.id)}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{item.name}</h3>
                          <Badge variant={item.isVeg ? "secondary" : "destructive"} className="text-xs">
                            {item.isVeg ? "VEG" : "NON-VEG"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.category} • ₹{item.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {mealSlots.map((slot) => (
                          <Badge
                            key={slot.id}
                            variant={item.availableSlots.includes(slot.id) ? "default" : "outline"}
                            className={`cursor-pointer text-xs ${
                              item.availableSlots.includes(slot.id) 
                                ? "bg-primary/10 text-primary hover:bg-primary/20" 
                                : "hover:bg-muted"
                            }`}
                            onClick={() => handleSlotToggle(item.id, slot.id)}
                          >
                            {slot.name.slice(0, 1)}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Meal Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Today's Meal Schedule</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mealSlots.map((slot) => {
                const slotItems = getSlotItems(slot.id);
                const isOrdersOpen = true; // This would be calculated based on current time
                
                return (
                  <Card key={slot.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{slot.name}</CardTitle>
                        <Badge variant={isOrdersOpen ? "default" : "secondary"}>
                          {isOrdersOpen ? "Orders Open" : "Orders Closed"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {slot.time} • Closes at {orderTimings[slot.id as keyof typeof orderTimings]}
                      </p>
                    </CardHeader>
                    <CardContent>
                      {slotItems.length > 0 ? (
                        <div className="space-y-2">
                          {slotItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between text-sm">
                              <span className="text-foreground">{item.name}</span>
                              <span className="text-muted-foreground">₹{item.price}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <AlertCircle className="h-4 w-4" />
                          No items scheduled for this slot
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}