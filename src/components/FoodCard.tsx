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
      "flex overflow-hidden transition-all duration-200 hover:shadow-md",
      !item.isAvailable && "opacity-60",
      className
    )}>
      {/* Mobile Image */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1 left-1">
          <div className={cn(
            "w-3 h-3 rounded border flex items-center justify-center",
            item.isVeg ? "border-green-500" : "border-red-500"
          )}>
            <div className={cn(
              "w-1.5 h-1.5 rounded",
              item.isVeg ? "bg-green-500" : "bg-red-500"
            )} />
          </div>
        </div>
      </div>

      <CardContent className="p-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-sm text-foreground leading-tight line-clamp-1">
              {item.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground ml-2">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {item.rating}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-base font-bold text-primary">
              ₹{item.price}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {item.prepTime && <span>{item.prepTime}m</span>}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          {item.isAvailable ? (
            quantity === 0 ? (
              <Button 
                variant="food" 
                size="sm" 
                onClick={incrementQuantity}
                className="h-7 px-3 text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            ) : (
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={decrementQuantity}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-6 text-center text-sm font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            )
          ) : (
            <Button variant="ghost" size="sm" disabled className="text-xs">
              Out of Stock
            </Button>
          )}
          
          {quantity > 0 && (
            <Button 
              variant="food" 
              size="sm"
              className="h-7 text-xs ml-2"
              onClick={handleAddToCart}
            >
              ₹{(item.price * quantity)}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};