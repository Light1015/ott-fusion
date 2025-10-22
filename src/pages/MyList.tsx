import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { trendingNow, newReleases, popularMovies, Movie } from "@/data/movies";

const MyList = () => {
  const [followingMovies, setFollowingMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get following movies from localStorage
    const following = JSON.parse(localStorage.getItem("followingMovies") || "[]");
    
    // Find full movie data for following movie IDs
    const allMovies = [...trendingNow, ...newReleases, ...popularMovies];
    const followingMovieData = following
      .map((id: string) => allMovies.find((m) => m.id === id))
      .filter(Boolean);
    
    setFollowingMovies(followingMovieData);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-12">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Phim đã theo dõi</h1>
          
          {followingMovies.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-6">
                Bạn chưa theo dõi phim nào
              </p>
              <button
                onClick={() => navigate("/movies-shows")}
                className="text-primary hover:underline"
              >
                Khám phá phim
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
              {followingMovies.map((movie) => (
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
