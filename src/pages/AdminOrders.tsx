import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Clock, User, Receipt, Search } from "lucide-react";

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const mockOrders = [
    {
      id: "GAB001",
      studentName: "Rahul Sharma",
      studentId: "CS2021001",
      items: ["Masala Dosa", "Filter Coffee"],
      total: 85,
      status: "Pending",
      orderTime: "09:30 AM",
      pickupCode: "A123",
      paymentStatus: "Paid"
    },
    {
      id: "GAB002",
      studentName: "Priya Patel",
      studentId: "EC2021045",
      items: ["Chole Bhature", "Lassi"],
      total: 120,
      status: "Preparing",
      orderTime: "12:45 PM",
      pickupCode: "B456",
      paymentStatus: "Paid"
    },
    {
      id: "GAB003",
      studentName: "Amit Kumar",
      studentId: "ME2020078",
      items: ["Rajma Rice", "Raita", "Papad"],
      total: 110,
      status: "Ready",
      orderTime: "01:15 PM",
      pickupCode: "C789",
      paymentStatus: "Paid"
    },
    {
      id: "GAB004",
      studentName: "Sneha Singh",
      studentId: "IT2021032",
      items: ["Paneer Butter Masala", "Naan"],
      total: 160,
      status: "Completed",
      orderTime: "02:30 PM",
      pickupCode: "D012",
      paymentStatus: "Paid"
    }
  ];

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
    // In real app, this would update the backend
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-orange-500";
      case "Preparing": return "bg-blue-500";
      case "Ready": return "bg-green-500";
      case "Completed": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const filteredOrders = mockOrders.filter(order => {
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter;
    const matchesSearch = order.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
          <p className="text-muted-foreground">Manage and track all student orders</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">
                  {mockOrders.filter(o => o.status === "Pending").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Receipt className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preparing</p>
                <p className="text-2xl font-bold">
                  {mockOrders.filter(o => o.status === "Preparing").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ready</p>
                <p className="text-2xl font-bold">
                  {mockOrders.filter(o => o.status === "Ready").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                <Receipt className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">
                  {mockOrders.filter(o => o.status === "Completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders, students, or order IDs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="border-primary/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Order Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {order.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">#{order.id}</span>
                  </div>
                  <p className="font-semibold">{order.studentName}</p>
                  <p className="text-sm text-muted-foreground">{order.studentId}</p>
                  <p className="text-sm text-muted-foreground">{order.orderTime}</p>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  <p className="font-medium text-sm">Items:</p>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs mr-1">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <p className="font-bold text-primary">Total: ₹{order.total}</p>
                </div>

                {/* Pickup Code */}
                <div className="space-y-2">
                  <p className="font-medium text-sm">Pickup Code:</p>
                  <div className="bg-muted p-2 rounded text-center">
                    <span className="text-lg font-bold">{order.pickupCode}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {order.paymentStatus}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <p className="font-medium text-sm">Update Status:</p>
                  <div className="space-y-2">
                    {order.status === "Pending" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => updateOrderStatus(order.id, "Preparing")}
                      >
                        Start Preparing
                      </Button>
                    )}
                    {order.status === "Preparing" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => updateOrderStatus(order.id, "Ready")}
                      >
                        Mark Ready
                      </Button>
                    )}
                    {order.status === "Ready" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => updateOrderStatus(order.id, "Completed")}
                      >
                        Complete Order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}