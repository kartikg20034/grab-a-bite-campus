import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Package
} from "lucide-react";

const statsCards = [
  {
    title: "Total Orders Today",
    value: "47",
    change: "+12%",
    icon: ShoppingBag,
    color: "text-primary"
  },
  {
    title: "Active Students",
    value: "324",
    change: "+5%",
    icon: Users,
    color: "text-secondary"
  },
  {
    title: "Today's Revenue",
    value: "₹8,240",
    change: "+18%",
    icon: DollarSign,
    color: "text-success"
  },
  {
    title: "Avg Order Time",
    value: "12 mins",
    change: "-2 mins",
    icon: Clock,
    color: "text-warning"
  }
];

const recentOrders = [
  {
    id: "#ORD-001",
    student: "John Doe",
    items: "Veggie Burger, Fries",
    amount: "₹195",
    status: "ready",
    time: "2 mins ago"
  },
  {
    id: "#ORD-002", 
    student: "Sarah Smith",
    items: "Caesar Salad, Juice",
    amount: "₹135",
    status: "preparing",
    time: "5 mins ago"
  },
  {
    id: "#ORD-003",
    student: "Mike Johnson",
    items: "Pasta, Garlic Bread",
    amount: "₹180",
    status: "pending",
    time: "8 mins ago"
  },
  {
    id: "#ORD-004",
    student: "Emma Wilson",
    items: "Sandwich, Coffee",
    amount: "₹120",
    status: "completed",
    time: "15 mins ago"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-success/10 text-success";
    case "ready":
      return "bg-primary/10 text-primary";
    case "preparing":
      return "bg-warning/10 text-warning";
    case "pending":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4" />;
    case "ready":
      return <Package className="h-4 w-4" />;
    case "preparing":
      return <Clock className="h-4 w-4" />;
    case "pending":
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor orders, manage menu, and track performance
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            Export Data
          </Button>
          <Button variant="food">
            Add Menu Item
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-success' : 'text-warning'}>
                    {stat.change}
                  </span>
                  {" "}from yesterday
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {order.id}
                        </span>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </div>
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.student} • {order.items}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {order.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">
                      {order.amount}
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Package className="h-4 w-4" />
              Update Inventory
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <TrendingUp className="h-4 w-4" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Manage Students
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <ShoppingBag className="h-4 w-4" />
              Process Orders
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Today's Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">87%</div>
              <div className="text-sm text-muted-foreground">Order Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">11 mins</div>
              <div className="text-sm text-muted-foreground">Avg Preparation Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">23</div>
              <div className="text-sm text-muted-foreground">Peak Hour Orders</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}