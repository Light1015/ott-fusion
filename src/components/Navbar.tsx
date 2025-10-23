import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation, NavLink } from "react-router-dom";
import { Search, Bell, Heart, ChevronRight, LayoutDashboard, Home } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trendingNow, newReleases, popularMovies } from "@/data/movies";
import { useUserRole } from "@/hooks/useUserRole";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard');
  const { toast } = useToast();
  const { isAdmin } = useUserRole();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Đăng xuất thất bại",
        description: error.message,
        // keep default variant if your toast supports variants; optional
      });
      return;
    }
    // close the dialog first
    setShowLogoutConfirm(false);
    toast({
      title: "Đã đăng xuất",
      description: "Bạn đã đăng xuất thành công.",
    });
    navigate("/auth");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (isDashboard) {
      const tabs = [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Leaderboard', to: '/leaderboard' },
        { label: 'Quản lý', to: '/manage' },
        { label: 'Người dùng', to: '/users' },
        { label: 'Phân loại mục', to: '/categories' },
        { label: 'Báo cáo người dùng', to: '/reports' },
        { label: 'Tin nhắn', to: '/messages' },
        { label: 'Cài đặt', to: '/settings' },
        { label: 'Lịch sử', to: '/history' },
        { label: 'Đăng xuất', to: '/signout' },
      ];

      if (query.trim()) {
        const q = query.toLowerCase();
        const results = tabs.filter(t => t.label.toLowerCase().startsWith(q));
        setSearchResults(results.slice(0, 8));
      } else {
        setSearchResults([]);
      }
    } else {
      if (query.trim()) {
        const allMovies = [...trendingNow, ...newReleases, ...popularMovies];
        const q = query.toLowerCase();
        const results = allMovies.filter((movie) =>
          movie.title.toLowerCase().startsWith(q)
        );
        setSearchResults(results.slice(0, 5));
      } else {
        setSearchResults([]);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-b from-background to-transparent">
  <div className="container mx-auto px-4 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/">
            {!isDashboard ? (
              <h1 className="text-3xl font-bold text-primary cursor-pointer">STREAMIX</h1>
            ) : (
              <div className=""></div>
            )}
          </Link>
          {/* Show dashboard-only tab-search instead of menu when on dashboard; otherwise keep original menu */}
          {isDashboard ? (
            <div className="hidden md:block">
             
            </div>
          ) : null}

          {/* Centered top tabs (desktop) */}
          {!isDashboard && (
            <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex items-center gap-3 bg-card border-2 border-border rounded-lg px-1 py-3"> 
                <li>
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `mx-1 px-5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-muted text-foreground' : 'text-foreground/80 hover:text-foreground'}`} 
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/movies-shows"
                    className={({ isActive }) => `mx-1 px-5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-muted text-foreground' : 'text-foreground/80 hover:text-foreground'}`} 
                  >
                    Movies & Shows
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/support"
                    className={({ isActive }) => `mx-1 px-5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-muted text-foreground' : 'text-foreground/80 hover:text-foreground'}`} 
                  >
                    Support
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/subscription"
                    className={({ isActive }) => `mx-1 px-5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-muted text-foreground' : 'text-foreground/80 hover:text-foreground'}`} 
                  >
                    Subscriptions
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
        </div>

        {/* Right Icons */}
          <div className="flex items-center gap-4 relative">
          {/* Inline search that queries sidebar tabs */}
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
          {user ? (<>
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
                <>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    onClick={() => {
                      const target = isDashboard ? "/" : "/dashboard";
                      setShowUserMenu(false);
                      navigate(target);
                    }}
                    className="cursor-pointer py-3 px-3 text-foreground hover:bg-muted"
                  >
                    {isDashboard ? (
                      <Home className="h-4 w-4 mr-2" />
                    ) : (
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                    )}
                    <span className="text-sm">{isDashboard ? 'Trang chủ' : 'Bảng điều khiển'}</span>
                  </DropdownMenuItem>
                </>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={() => {
                    // close the user menu then open the confirmation dialog to avoid nested overlays
                    setShowUserMenu(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="cursor-pointer py-3 px-3 text-foreground hover:bg-muted"
                >
                  <span className="text-sm">Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Logout confirmation dialog (outside dropdown) */}
            <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Bạn có chắc muốn đăng xuất?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setShowLogoutConfirm(false)}>Hủy</Button>
                  <Button variant="destructive" onClick={() => { setShowLogoutConfirm(false); handleLogout(); }}>Đăng xuất</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>) : (
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
            <div className="absolute top-full right-0 mt-2 w-[360px] bg-card border border-border rounded-lg shadow-lg p-2 z-50">
              <Input
                type="text"
                placeholder={isDashboard ? "Tìm tab..." : "Tìm phim, show..."}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="mb-2"
                autoFocus
              />
              {searchResults.length > 0 && (
                <div className="space-y-1 max-h-[300px] overflow-y-auto scrollbar-hide p-2">
                  {searchResults.map((item: any) => {
                    const isTab = Boolean(item.to);
                    const key = isTab ? item.to : item.id;
                    return (
                      <div
                        key={key}
                        onClick={() => {
                          if (isTab) {
                            navigate(item.to);
                          } else if (item.id) {
                            navigate(`/movie/${item.id}`);
                          }
                          setShowSearch(false);
                          setSearchQuery("");
                          setSearchResults([]);
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-muted rounded cursor-pointer"
                      >
                        {!isTab && (
                          <img src={item.image} alt={item.title} className="w-12 h-16 object-cover rounded" />
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{isTab ? item.label : item.title}</div>
                          {!isTab && item.year && (
                            <div className="text-xs text-muted-foreground">{item.year}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {searchQuery && searchResults.length === 0 && (
                <p className="text-center text-muted-foreground text-sm py-4">Không tìm thấy</p>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
