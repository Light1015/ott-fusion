import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Bell, User, LogOut, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trendingNow, newReleases, popularMovies } from "@/data/movies";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/auth");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const allMovies = [...trendingNow, ...newReleases, ...popularMovies];
      const results = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-b from-background to-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/">
            <h1 className="text-3xl font-bold text-primary cursor-pointer">STREAMIX</h1>
          </Link>
          
          {/* Menu Items */}
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link
                to="/"
                className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/movies-shows"
                className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
              >
                Movies & Shows
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                to="/subscription"
                className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
              >
                Subscription
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
            className="nav-icon-hover text-foreground"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="nav-icon-hover text-foreground"
            onClick={() => {
              toast({
                title: "Notifications",
                description: "You have no new notifications",
              });
            }}
          >
            <Bell className="h-5 w-5" />
          </Button>
          {user && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/my-list")}
              className="nav-icon-hover text-foreground"
            >
              <Heart className="h-5 w-5" />
            </Button>
          )}
          {user ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="nav-icon-hover text-foreground"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/auth")}
              className="nav-icon-hover text-foreground"
            >
              <User className="h-5 w-5" />
            </Button>
          )}

          {/* Search Dropdown */}
          {showSearch && (
            <div className="absolute top-full right-0 mt-2 w-[400px] bg-card border border-border rounded-lg shadow-lg p-4 z-50">
              <Input
                type="text"
                placeholder="Search movies & shows..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="mb-3"
                autoFocus
              />
              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {searchResults.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => {
                        navigate(`/movie/${movie.id}`);
                        setShowSearch(false);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="flex gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                    >
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{movie.title}</h4>
                        {movie.genre && (
                          <p className="text-xs text-muted-foreground">{movie.genre}</p>
                        )}
                        {movie.rating && (
                          <p className="text-xs text-primary mt-1">{movie.rating}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {searchQuery && searchResults.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-4">
                  No results found
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
