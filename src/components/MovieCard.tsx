import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Heart } from "lucide-react";
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
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const following = JSON.parse(localStorage.getItem("followingMovies") || "[]");
    setIsFollowing(following.includes(id));
  }, [id]);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const following = JSON.parse(localStorage.getItem("followingMovies") || "[]");
    
    if (isFollowing) {
      const updated = following.filter((movieId: string) => movieId !== id);
      localStorage.setItem("followingMovies", JSON.stringify(updated));
      setIsFollowing(false);
      toast({
        title: "Đã bỏ theo dõi",
        description: `${title} đã được bỏ khỏi danh sách theo dõi`,
      });
    } else {
      following.push(id);
      localStorage.setItem("followingMovies", JSON.stringify(following));
      setIsFollowing(true);
      toast({
        title: "Đã theo dõi",
        description: `${title} đã được thêm vào danh sách theo dõi`,
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
              <Button 
                size="sm" 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/movie/${id}`);
                }}
              >
                <Play className="h-4 w-4 fill-current mr-1" />
                <span className="text-xs">Xem</span>
              </Button>
              <Button
                size="sm"
                onClick={handleFollow}
                className={`flex-1 ${
                  isFollowing 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "bg-secondary/80 text-foreground hover:bg-secondary"
                }`}
              >
                <Heart className={`h-4 w-4 mr-1 ${isFollowing ? "fill-current" : ""}`} />
                <span className="text-xs">{isFollowing ? "Bỏ theo dõi" : "Theo dõi"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
