import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Upload, Image, Video, FileText, Search, Download, Trash2, Eye } from "lucide-react";

export default function MediaManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const mockMedia = [
    {
      id: 1,
      name: "masala-dosa-banner.jpg",
      type: "image",
      size: "2.3 MB",
      uploadDate: "2024-01-15",
      usedIn: ["Menu Item", "Banner"],
      url: "/src/assets/food-sandwich.jpg",
      dimensions: "1920x1080"
    },
    {
      id: 2,
      name: "cafeteria-promo-video.mp4",
      type: "video",
      size: "15.7 MB",
      uploadDate: "2024-01-14",
      usedIn: ["Landing Page"],
      url: "",
      duration: "1:30"
    },
    {
      id: 3,
      name: "chole-bhature-hero.jpg",
      type: "image",
      size: "1.8 MB",
      uploadDate: "2024-01-13",
      usedIn: ["Menu Item"],
      url: "/src/assets/food-burger.jpg",
      dimensions: "1200x800"
    },
    {
      id: 4,
      name: "menu-template.pdf",
      type: "document",
      size: "890 KB",
      uploadDate: "2024-01-12",
      usedIn: ["Print Menu"],
      url: "",
      pages: 4
    },
    {
      id: 5,
      name: "biryani-special.jpg",
      type: "image",
      size: "2.1 MB",
      uploadDate: "2024-01-11",
      usedIn: ["Menu Item", "Social Media"],
      url: "/src/assets/food-pasta.jpg",
      dimensions: "1080x1080"
    },
    {
      id: 6,
      name: "cafe-interior.jpg",
      type: "image",
      size: "3.2 MB",
      uploadDate: "2024-01-10",
      usedIn: ["About Page"],
      url: "/src/assets/food-salad.jpg",
      dimensions: "1920x1280"
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image": return Image;
      case "video": return Video;
      case "document": return FileText;
      default: return FileText;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "image": return "bg-blue-500";
      case "video": return "bg-purple-500";
      case "document": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const filteredMedia = mockMedia.filter(item => {
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.usedIn.some(usage => usage.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const totalFiles = mockMedia.length;
  const imageFiles = mockMedia.filter(item => item.type === "image").length;
  const videoFiles = mockMedia.filter(item => item.type === "video").length;
  const documentFiles = mockMedia.filter(item => item.type === "document").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Media Management</h1>
          <p className="text-muted-foreground">Upload and manage images, videos, and documents</p>
        </div>
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button variant="food">
              <Upload className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Media</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fileUpload">Select File</Label>
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-2">
                    Drag and drop files here or click to browse
                  </p>
                  <input
                    id="fileUpload"
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx"
                    className="hidden"
                  />
                  <Button variant="outline" onClick={() => document.getElementById('fileUpload')?.click()}>
                    Choose Files
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input id="description" placeholder="Enter file description" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowUploadDialog(false)} className="flex-1">
                  Cancel
                </Button>
                <Button variant="food" className="flex-1">
                  Upload
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold">{totalFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Image className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Images</p>
                <p className="text-2xl font-bold">{imageFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Video className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Videos</p>
                <p className="text-2xl font-bold">{videoFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold">{documentFiles}</p>
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
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {["all", "image", "video", "document"].map((type) => (
                <Button
                  key={type}
                  variant={filterType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  {type === "all" ? ` (${totalFiles})` : ` (${mockMedia.filter(item => item.type === type).length})`}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMedia.map((file) => {
          const FileIcon = getFileIcon(file.type);
          return (
            <Card key={file.id} className="border-primary/20">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* File Preview */}
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    {file.type === "image" && file.url ? (
                      <img 
                        src={file.url} 
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-16 h-16 ${getFileTypeColor(file.type)} rounded-lg flex items-center justify-center`}>
                        <FileIcon className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div>
                    <h3 className="font-medium text-sm truncate" title={file.name}>
                      {file.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {file.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{file.size}</span>
                    </div>
                  </div>

                  {/* File Details */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Uploaded: {file.uploadDate}</p>
                    {file.dimensions && <p>Size: {file.dimensions}</p>}
                    {file.duration && <p>Duration: {file.duration}</p>}
                    {file.pages && <p>Pages: {file.pages}</p>}
                  </div>

                  {/* Usage */}
                  <div>
                    <p className="text-xs font-medium mb-1">Used in:</p>
                    <div className="flex flex-wrap gap-1">
                      {file.usedIn.map((usage, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {usage}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}