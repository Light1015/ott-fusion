import Navbar from "@/components/Navbar";
import ContentRow from "@/components/ContentRow";
import { trendingNow, newReleases, popularMovies } from "@/data/movies";

const MoviesShows = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 md:px-12">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Movies & TV Shows</h1>
          
          <div className="space-y-8 pb-20">
            <ContentRow title="Trending Now" movies={trendingNow} />
            <ContentRow title="New Releases" movies={newReleases} />
            <ContentRow title="Popular on StreamiX" movies={popularMovies} />
            <ContentRow title="Action & Adventure" movies={trendingNow} />
            <ContentRow title="Drama" movies={newReleases} />
            <ContentRow title="Comedy" movies={popularMovies} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesShows;
