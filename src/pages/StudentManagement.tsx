import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Users, TrendingUp, Clock } from "lucide-react";

export default function StudentManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const mockStudents = [
    {
      id: "CS2021001",
      name: "Rahul Sharma",
      email: "rahul.sharma@college.edu",
      department: "Computer Science",
      year: "3rd Year",
      totalOrders: 45,
      totalSpent: 2250,
      lastOrder: "2 hours ago",
      favoriteItems: ["Masala Dosa", "Filter Coffee"],
      status: "Active"
    },
    {
      id: "EC2021045",
      name: "Priya Patel",
      email: "priya.patel@college.edu",
      department: "Electronics",
      year: "3rd Year",
      totalOrders: 32,
      totalSpent: 1680,
      lastOrder: "1 day ago",
      favoriteItems: ["Chole Bhature", "Lassi"],
      status: "Active"
    },
    {
      id: "ME2020078",
      name: "Amit Kumar",
      email: "amit.kumar@college.edu",
      department: "Mechanical",
      year: "4th Year",
      totalOrders: 67,
      totalSpent: 3350,
      lastOrder: "5 hours ago",
      favoriteItems: ["Rajma Rice", "Paneer Curry"],
      status: "Active"
    },
    {
      id: "IT2021032",
      name: "Sneha Singh",
      email: "sneha.singh@college.edu",
      department: "Information Technology",
      year: "3rd Year",
      totalOrders: 28,
      totalSpent: 1540,
      lastOrder: "3 days ago",
      favoriteItems: ["Biryani", "Raita"],
      status: "Inactive"
    }
  ];

  const filteredStudents = mockStudents.filter(student => {
    const matchesDepartment = departmentFilter === "all" || student.department === departmentFilter;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const totalStudents = mockStudents.length;
  const activeStudents = mockStudents.filter(s => s.status === "Active").length;
  const avgOrdersPerStudent = Math.round(mockStudents.reduce((sum, s) => sum + s.totalOrders, 0) / totalStudents);
  const totalRevenue = mockStudents.reduce((sum, s) => sum + s.totalSpent, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground">Monitor student activity and preferences</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold">{activeStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Orders</p>
                <p className="text-2xl font-bold">{avgOrdersPerStudent}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
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
                  placeholder="Search students by name, ID, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{student.name}</h3>
                      <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                        {student.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{student.id}</p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                    <p className="text-sm text-muted-foreground">{student.department} • {student.year}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-3 bg-muted/30 rounded-lg px-3">
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">{student.totalOrders}</p>
                      <p className="text-xs text-muted-foreground">Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">₹{student.totalSpent}</p>
                      <p className="text-xs text-muted-foreground">Spent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">{student.lastOrder}</p>
                      <p className="text-xs text-muted-foreground">Last Order</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Favorite Items:</p>
                    <div className="flex flex-wrap gap-1">
                      {student.favoriteItems.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Send Message
                    </Button>
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