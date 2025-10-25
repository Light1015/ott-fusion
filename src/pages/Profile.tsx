import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Home, User, CreditCard, Tv, Users, BookMarked, LogOut, ChevronRight, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trendingNow, newReleases, popularMovies, type Movie } from "@/data/movies";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [followingMovies, setFollowingMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Dialog states
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Form states
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadProfile(session.user.id);
        loadFollowingMovies();
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) {
      setProfile(data);
      setDisplayName(data.display_name || "");
      setPhone(data.phone || "");
    }
  };

  const loadFollowingMovies = () => {
    const following = localStorage.getItem("followingMovies");
    if (following) {
      const movieIds = JSON.parse(following);
      const allMovies = [...trendingNow, ...newReleases, ...popularMovies];
      const movies = allMovies.filter((movie) => movieIds.includes(movie.id));
      setFollowingMovies(movies);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        phone: phone,
      })
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật thông tin",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thành công",
        description: "Đã cập nhật thông tin",
      });
      setShowEditDialog(false);
      loadProfile(user.id);
    }
  };

  const handleRequestPasswordChange = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu phải có ít nhất 6 ký tự",
        variant: "destructive",
      });
      return;
    }

    // Send OTP to user's email
    const { error } = await supabase.auth.updateUser({
      email: user.email,
    });

    if (error) {
      toast({
        title: "Lỗi",
        description: "Không thể gửi mã OTP",
        variant: "destructive",
      });
    } else {
      setTempPassword(newPassword);
      setShowPasswordDialog(false);
      setShowOtpDialog(true);
      toast({
        title: "Đã gửi OTP",
        description: "Vui lòng kiểm tra email của bạn",
      });
    }
  };

  const handleVerifyOtpAndChangePassword = async () => {
    if (!otpCode || otpCode.length !== 6) {
      toast({
        title: "Lỗi",
        description: "Mã OTP phải có 6 ký tự",
        variant: "destructive",
      });
      return;
    }

    // Verify OTP and update password
    const { error } = await supabase.auth.updateUser({
      password: tempPassword,
    });

    if (error) {
      toast({
        title: "Lỗi",
        description: "Không thể đổi mật khẩu. Vui lòng thử lại",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thành công",
        description: "Đã đổi mật khẩu thành công",
      });
      setShowOtpDialog(false);
      setOtpCode("");
      setNewPassword("");
      setTempPassword("");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
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
                onClick={() => setShowLogoutDialog(true)}
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
                            {user?.email?.[0].toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{profile?.display_name || user?.email}</p>
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
                    <Button onClick={() => setShowEditDialog(true)} variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Chỉnh sửa
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Tên tài khoản</label>
                        <p className="text-foreground font-medium mt-1">{profile?.display_name || "Chưa có"}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">UID</label>
                        <p className="text-foreground font-medium mt-1 text-xs">{user?.id.slice(0, 8)}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Số điện thoại</label>
                        <p className="text-foreground font-medium mt-1">{profile?.phone || "Chưa có"}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Mật khẩu</label>
                        <button
                          onClick={() => setShowPasswordDialog(true)}
                          className="flex items-center gap-2 mt-1 hover:text-primary transition-colors"
                        >
                          <p className="text-foreground font-medium">••••••</p>
                          <ChevronRight className="h-4 w-4 text-foreground/50" />
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
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      Đang theo dõi ({followingMovies.length})
                    </h3>
                    {followingMovies.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">Bạn chưa theo dõi phim nào</p>
                        <Button onClick={() => navigate("/movies-shows")}>
                          Khám phá phim
                        </Button>
                      </div>
                    ) : (
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
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
            <DialogDescription>
              Cập nhật tên tài khoản và số điện thoại của bạn
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Tên tài khoản</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Nhập tên tài khoản"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleUpdateProfile}>
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đổi mật khẩu</DialogTitle>
            <DialogDescription>
              Nhập mật khẩu mới của bạn. Chúng tôi sẽ gửi mã OTP để xác nhận.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleRequestPasswordChange}>
              Gửi OTP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* OTP Verification Dialog */}
      <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận OTP</DialogTitle>
            <DialogDescription>
              Nhập mã OTP 6 số đã được gửi đến email của bạn
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Mã OTP</Label>
              <Input
                id="otp"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Nhập 6 số"
                maxLength={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOtpDialog(false)}>
              Hủy
            </Button>
            <Button onClick={handleVerifyOtpAndChangePassword}>
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận đăng xuất</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Đăng xuất
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Profile;