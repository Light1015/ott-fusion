import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Bell, Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trendingNow, newReleases, popularMovies } from "@/data/movies";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
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
          {user ? (
            <DropdownMenu open={showUserMenu} onOpenChange={setShowUserMenu}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="nav-icon-hover">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {user?.email?.[0].toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-card border-border">
                <div className="flex items-center gap-3 p-3 border-b border-border">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.email?.[0].toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">Đoạn Trang</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/profile");
                    setShowUserMenu(false);
                  }}
                  className="cursor-pointer py-3 px-3 text-foreground hover:bg-muted"
                >
                  <span className="text-sm">Xem thông tin của bạn</span>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    navigate("/my-list");
                    setShowUserMenu(false);
                  }}
                  className="cursor-pointer py-3 px-3 text-foreground hover:bg-muted"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  <span className="text-sm">Phim đã theo dõi</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer py-3 px-3 text-foreground hover:bg-muted"
                >
                  <span className="text-sm">Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/auth")}
              className="nav-icon-hover text-foreground"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted">
                  <span className="text-muted-foreground">?</span>
                </AvatarFallback>
              </Avatar>
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
