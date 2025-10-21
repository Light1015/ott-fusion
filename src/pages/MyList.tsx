import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { trendingNow, newReleases, popularMovies } from "@/data/movies";

interface Movie {
  id: string;
  image: string;
  title: string;
  genre?: string;
  rating?: string;
}

const MyList = () => {
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get liked movies from localStorage
    const liked = JSON.parse(localStorage.getItem("likedMovies") || "[]");
    
    // Find full movie data for liked movie IDs
    const allMovies = [...trendingNow, ...newReleases, ...popularMovies];
    const likedMovieData = liked
      .map((id: string) => allMovies.find((m) => m.id === id))
      .filter(Boolean);
    
    setLikedMovies(likedMovieData);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-12">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">My List</h1>
          
          {likedMovies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-6">
                You haven't liked any movies or shows yet
              </p>
              <button
                onClick={() => navigate("/movies-shows")}
                className="text-primary hover:underline"
              >
                Browse Movies & Shows
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
              {likedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  image={movie.image}
                  title={movie.title}
                  genre={movie.genre}
                  rating={movie.rating}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyList;
