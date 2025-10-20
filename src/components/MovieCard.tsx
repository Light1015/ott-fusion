import { Play, Plus, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieCardProps {
  image: string;
  title: string;
  genre?: string;
  rating?: string;
}

const MovieCard = ({ image, title, genre, rating }: MovieCardProps) => {
  return (
    <div className="group relative flex-shrink-0 w-[200px] md:w-[250px] cursor-pointer">
      <div className="card-hover overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-[300px] md:h-[375px] object-cover"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <h3 className="text-foreground font-semibold text-lg">{title}</h3>
            {genre && <p className="text-foreground/70 text-sm">{genre}</p>}
            {rating && (
              <div className="flex items-center gap-2">
                <span className="text-primary text-sm font-semibold">{rating}</span>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Play className="h-4 w-4 fill-current" />
              </Button>
              <Button size="sm" variant="ghost" className="bg-secondary/80 hover:bg-secondary">
                <Plus className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="bg-secondary/80 hover:bg-secondary">
                <ThumbsUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
