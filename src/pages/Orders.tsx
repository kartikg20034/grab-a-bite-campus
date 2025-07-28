import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Receipt } from "lucide-react";

export default function Orders() {
  const mockOrders = [
    {
      id: "GAB001",
      pickupCode: "A123",
      items: ["Masala Dosa", "Filter Coffee"],
      total: 85,
      status: "Ready",
      orderTime: "09:30 AM",
      cafeName: "Main Campus Café"
    },
    {
      id: "GAB002", 
      pickupCode: "B456",
      items: ["Chole Bhature", "Lassi"],
      total: 120,
      status: "Preparing",
      orderTime: "12:45 PM",
      cafeName: "Food Court"
    },
    {
      id: "GAB003",
      pickupCode: "C789",
      items: ["Rajma Rice", "Raita"],
      total: 95,
      status: "Completed",
      orderTime: "Yesterday 7:30 PM",
      cafeName: "Hostel Mess"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready": return "bg-green-500";
      case "Preparing": return "bg-yellow-500";
      case "Completed": return "bg-gray-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track your food orders</p>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Card key={order.id} className="border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{order.cafeName}</span>
                  </div>
                </div>
                <Badge className={`${getStatusColor(order.status)} text-white`}>
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {order.orderTime}
              </div>
              
              <div>
                <p className="font-medium text-sm mb-2">Items:</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {order.status === "Ready" && (
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Receipt className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-600">Pickup Code</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{order.pickupCode}</p>
                  <p className="text-xs text-green-600/80">Show this code at pickup</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-bold">Total: ₹{order.total}</span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}