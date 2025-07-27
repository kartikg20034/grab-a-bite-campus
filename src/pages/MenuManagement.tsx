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

// Sample menu data (would come from API)
const allMenuItems = [
  {
    id: "1",
    name: "Butter Chicken",
    category: "Main Course",
    price: 180,
    isVeg: false,
    isActive: true,
    availableSlots: ["lunch", "dinner"]
  },
  {
    id: "2",
    name: "Paneer Butter Masala", 
    category: "Main Course",
    price: 160,
    isVeg: true,
    isActive: true,
    availableSlots: ["lunch", "dinner"]
  },
  {
    id: "3",
    name: "Masala Dosa",
    category: "South Indian",
    price: 80,
    isVeg: true,
    isActive: true,
    availableSlots: ["breakfast", "lunch"]
  },
  {
    id: "4",
    name: "Idli Sambar",
    category: "South Indian", 
    price: 60,
    isVeg: true,
    isActive: false,
    availableSlots: ["breakfast"]
  },
  {
    id: "5",
    name: "Chicken Biryani",
    category: "Rice",
    price: 200,
    isVeg: false,
    isActive: true,
    availableSlots: ["lunch", "dinner"]
  }
];

const mealSlots = [
  { id: "breakfast", name: "Breakfast", time: "7:00 AM - 10:30 AM" },
  { id: "lunch", name: "Lunch", time: "12:00 PM - 3:30 PM" },
  { id: "dinner", name: "Dinner", time: "6:00 PM - 9:30 PM" },
  { id: "evening", name: "Evening Snacks", time: "4:00 PM - 6:00 PM" }
];

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState(allMenuItems);
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