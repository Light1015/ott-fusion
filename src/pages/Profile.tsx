import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home, User, CreditCard, Tv, Users, BookMarked, LogOut, ChevronRight } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
                onClick={handleLogout}
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
                      <h3 className="font-semibold text-foreground mb-4">Đoạn Trang</h3>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                            {user?.email?.[0].toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{user?.email || "User"}</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full flex items-center justify-between bg-muted/30 hover:bg-muted/50 rounded-lg p-6 transition-colors">
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
                  <h2 className="text-2xl font-bold text-foreground mb-6">Thông tin tài khoản</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground">Tên tài khoản</label>
                        <p className="text-foreground font-medium mt-1">Đoạn Trang</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">UID</label>
                        <p className="text-foreground font-medium mt-1">97990619</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Số điện thoại</label>
                        <p className="text-foreground font-medium mt-1">0392836881</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Mã quản lý</label>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-foreground font-medium">••••••</p>
                          <ChevronRight className="h-4 w-4 text-foreground/50" />
                        </div>
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
                      Đang theo dõi
                      <ChevronRight className="h-5 w-5" />
                    </h3>
                    <p className="text-muted-foreground">Các phim và chương trình bạn đang theo dõi sẽ xuất hiện ở đây</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
