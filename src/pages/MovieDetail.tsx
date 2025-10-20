import { useParams, useNavigate } from "react-router-dom";
import { Play, Plus, ThumbsUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ContentRow from "@/components/ContentRow";
import { trendingNow, newReleases } from "@/data/movies";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find movie from all data
  const allMovies = [...trendingNow, ...newReleases];
  const movie = allMovies.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Movie not found</h2>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Movie Details */}
      <div className="relative h-[80vh] w-full">
        <img
          src={movie.image}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="relative container mx-auto px-4 md:px-12 h-full flex flex-col justify-end pb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
            {movie.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-primary text-primary" />
              <span className="text-foreground font-semibold">{movie.rating || "8.5"}</span>
            </div>
            <span className="text-muted-foreground">{movie.genre}</span>
            <span className="text-muted-foreground">2024</span>
            <span className="text-muted-foreground">2h 15m</span>
          </div>

          <p className="text-foreground/80 max-w-2xl mb-8 text-lg">
            Experience an epic adventure filled with action, drama, and unforgettable moments. 
            This critically acclaimed film has captivated audiences worldwide with its stunning 
            visuals and powerful storytelling.
          </p>

          <div className="flex gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Play className="h-5 w-5 mr-2 fill-current" />
              Play
            </Button>
            <Button size="lg" variant="secondary">
              <Plus className="h-5 w-5 mr-2" />
              My List
            </Button>
            <Button size="lg" variant="secondary">
              <ThumbsUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* More Like This Section */}
      <div className="container mx-auto px-4 md:px-12 py-12">
        <ContentRow title="More Like This" movies={trendingNow} />
        <div className="mt-8">
          <ContentRow title="You May Also Like" movies={newReleases} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
