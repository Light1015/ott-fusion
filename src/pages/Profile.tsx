import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home, User, CreditCard, Tv, Users, BookMarked, LogOut, ChevronRight, Edit } from "lucide-react";
import { ProfileEditDialog } from "@/components/ProfileEditDialog";
import { PasswordChangeDialog } from "@/components/PasswordChangeDialog";
import { LogoutConfirmDialog } from "@/components/LogoutConfirmDialog";
import MovieCard from "@/components/MovieCard";
import { trendingNow, newReleases, popularMovies } from "@/data/movies";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [followingMovies, setFollowingMovies] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        await fetchProfile(session.user.id);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    // Load following movies from localStorage
    const savedFollowing = localStorage.getItem("followingMovies");
    if (savedFollowing) {
      try {
        const movieIds = JSON.parse(savedFollowing);
        const allMovies = [...trendingNow, ...newReleases, ...popularMovies];
        const following = allMovies.filter(movie => movieIds.includes(movie.id));
        setFollowingMovies(following);
      } catch (error) {
        console.error("Error loading following movies:", error);
      }
    }
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleLogout = async () => {
    setLogoutDialogOpen(false);
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleProfileUpdate = () => {
    if (user) {
      fetchProfile(user.id);
    }
  };

  const menuItems = [
    { id: "overview", label: "Tổng quan", icon: Home },
    { id: "account", label: "Thông tin tài khoản", icon: User },
    { id: "payment", label: "Quản lý thanh toán và gói", icon: CreditCard },
    { id: "devices", label: "Quản lý thiết bị", icon: Tv },
    { id: "family", label: "Quản lý hộ sơ", icon: Users },
    { id: "library", label: "Thư viện", icon: BookMarked },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 px-4 md:px-12">
        <div className="container mx-auto flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-card rounded-lg p-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-muted text-foreground"
                      : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => setLogoutDialogOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/70 hover:bg-muted/50 hover:text-foreground transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm font-medium">Đăng xuất</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-card rounded-lg p-8">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Tổng quan</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-muted/30 rounded-lg p-6">
                      <h3 className="font-semibold text-foreground mb-4">{profile?.display_name || "User"}</h3>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                            {profile?.display_name?.[0]?.toUpperCase() || user?.email?.[0].toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{profile?.display_name || user?.email || "User"}</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveTab("account")}
                      className="w-full flex items-center justify-between bg-muted/30 hover:bg-muted/50 rounded-lg p-6 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-foreground/70" />
                        <span className="text-foreground font-medium">Thông tin tài khoản</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-foreground/50" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Thông tin tài khoản</h2>
                    <Button onClick={() => setEditDialogOpen(true)} size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Tên tài khoản</label>
                        <p className="text-foreground font-medium mt-1">{profile?.display_name || "Chưa cập nhật"}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Email</label>
                        <p className="text-foreground font-medium mt-1">{user?.email || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Số điện thoại</label>
                        <p className="text-foreground font-medium mt-1">{profile?.phone || "Chưa cập nhật"}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Mật khẩu</label>
                        <button 
                          onClick={() => setPasswordDialogOpen(true)}
                          className="flex items-center gap-2 mt-1 text-foreground font-medium hover:text-primary transition-colors"
                        >
                          <p>••••••</p>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "payment" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Quản lý thanh toán và gói</h2>
                  
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between bg-muted/30 hover:bg-muted/50 rounded-lg p-6 transition-colors">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-foreground/70" />
                        <span className="text-foreground font-medium">Gói đang sử dụng</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-foreground/50" />
                    </button>

                    <button className="w-full flex items-center justify-between bg-muted/30 hover:bg-muted/50 rounded-lg p-6 transition-colors">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-foreground/70" />
                        <span className="text-foreground font-medium">Quản lý gia hạn dịch vụ</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-foreground/50" />
                    </button>

                    <button className="w-full flex items-center justify-between bg-muted/30 hover:bg-muted/50 rounded-lg p-6 transition-colors">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-foreground/70" />
                        <span className="text-foreground font-medium">Lịch sử giao dịch</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-foreground/50" />
                    </button>

                    <button className="w-full flex items-center justify-between bg-muted/30 hover:bg-muted/50 rounded-lg p-6 transition-colors">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-foreground/70" />
                        <span className="text-foreground font-medium">Đổi mã quà tặng</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-foreground/50" />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "devices" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Quản lý thiết bị</h2>
                  <p className="text-muted-foreground">Danh sách thiết bị đã đăng nhập</p>
                </div>
              )}

              {activeTab === "family" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Quản lý hộ sơ</h2>
                  <p className="text-muted-foreground">Quản lý các hồ sơ trong gia đình</p>
                </div>
              )}

              {activeTab === "library" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Thư viện</h2>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Đang theo dõi</h3>
                    {followingMovies.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                    ) : (
                      <p className="text-muted-foreground">Các phim và chương trình bạn đang theo dõi sẽ xuất hiện ở đây</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {user && profile && (
        <>
          <ProfileEditDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            userId={user.id}
            currentDisplayName={profile.display_name || ""}
            currentPhone={profile.phone || ""}
            onSuccess={handleProfileUpdate}
          />
          <PasswordChangeDialog
            open={passwordDialogOpen}
            onOpenChange={setPasswordDialogOpen}
            userEmail={user.email || ""}
          />
        </>
      )}

      <LogoutConfirmDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Profile;
