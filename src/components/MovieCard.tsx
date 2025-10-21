import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Plus, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface MovieCardProps {
  id: string;
  image: string;
  title: string;
  genre?: string;
  rating?: string;
}

const MovieCard = ({ id, image, title, genre, rating }: MovieCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isInList, setIsInList] = useState(false);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("likedMovies") || "[]");
    const myList = JSON.parse(localStorage.getItem("myList") || "[]");
    setIsLiked(liked.includes(id));
    setIsInList(myList.includes(id));
  }, [id]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const liked = JSON.parse(localStorage.getItem("likedMovies") || "[]");
    
    if (isLiked) {
      const updated = liked.filter((movieId: string) => movieId !== id);
      localStorage.setItem("likedMovies", JSON.stringify(updated));
      setIsLiked(false);
      toast({
        title: "Removed from liked",
        description: `${title} has been removed from your liked list`,
      });
    } else {
      liked.push(id);
      localStorage.setItem("likedMovies", JSON.stringify(liked));
      setIsLiked(true);
      toast({
        title: "Added to liked",
        description: `${title} has been added to your liked list`,
      });
    }
  };

  const handleAddToList = (e: React.MouseEvent) => {
    e.stopPropagation();
    const myList = JSON.parse(localStorage.getItem("myList") || "[]");
    
    if (isInList) {
      const updated = myList.filter((movieId: string) => movieId !== id);
      localStorage.setItem("myList", JSON.stringify(updated));
      setIsInList(false);
      toast({
        title: "Removed from My List",
        description: `${title} has been removed from your list`,
      });
    } else {
      myList.push(id);
      localStorage.setItem("myList", JSON.stringify(myList));
      setIsInList(true);
      toast({
        title: "Added to My List",
        description: `${title} has been added to your list`,
      });
    }
  };

  return (
    <div className="group relative flex-shrink-0 w-[200px] md:w-[250px] cursor-pointer">
      <div className="card-hover overflow-hidden rounded-lg" onClick={() => navigate(`/movie/${id}`)}>
        <img
          src={image}
          alt={title}
          className="w-full h-[300px] md:h-[375px] object-cover"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            <h3 
              className="text-foreground font-semibold text-lg cursor-pointer hover:text-primary"
              onClick={() => navigate(`/movie/${id}`)}
            >
              {title}
            </h3>
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
              <Button
                size="sm"
                variant="ghost"
                onClick={handleAddToList}
                className={`${
                  isInList ? "bg-primary text-white" : "bg-secondary/80"
                } hover:bg-secondary`}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleLike}
                className={`${
                  isLiked ? "bg-primary text-white" : "bg-secondary/80"
                } hover:bg-secondary`}
              >
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
