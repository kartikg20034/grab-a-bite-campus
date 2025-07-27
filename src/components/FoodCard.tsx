import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Minus, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isVeg: boolean;
  isAvailable: boolean;
  prepTime?: number;
}

interface FoodCardProps {
  item: FoodItem;
  onAddToCart?: (item: FoodItem, quantity: number) => void;
  className?: string;
}

export const FoodCard = ({ item, onAddToCart, className }: FoodCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    if (quantity > 0 && onAddToCart) {
      onAddToCart(item, quantity);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  return (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
      !item.isAvailable && "opacity-60",
      className
    )}>
      <div className="relative">
        {/* Food Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm font-semibold">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white",
            isFavorite && "text-red-500"
          )}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </Button>

        {/* Veg/Non-veg Indicator */}
        <div className="absolute top-2 left-2">
          <div className={cn(
            "w-4 h-4 rounded border-2 flex items-center justify-center",
            item.isVeg ? "border-green-500" : "border-red-500"
          )}>
            <div className={cn(
              "w-2 h-2 rounded",
              item.isVeg ? "bg-green-500" : "bg-red-500"
            )} />
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Food Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              {item.category}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{item.rating}</span>
            </div>
            {item.prepTime && (
              <span>{item.prepTime} mins</span>
            )}
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg text-primary">
            ₹{item.price}
          </div>

          {item.isAvailable ? (
            <div className="flex items-center gap-2">
              {quantity === 0 ? (
                <Button 
                  variant="food" 
                  size="sm" 
                  onClick={incrementQuantity}
                  className="h-8 px-4"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={decrementQuantity}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-semibold">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <Button variant="ghost" size="sm" disabled>
              Unavailable
            </Button>
          )}
        </div>

        {/* Add to Cart Button (when quantity > 0) */}
        {quantity > 0 && (
          <Button 
            variant="food" 
            className="w-full mt-3 h-8"
            onClick={handleAddToCart}
          >
            Add {quantity} to Cart • ₹{(item.price * quantity).toFixed(2)}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};