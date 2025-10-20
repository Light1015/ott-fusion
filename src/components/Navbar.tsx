import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Bell, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [user, setUser] = useState(null);
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
          </ul>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
            <Bell className="h-5 w-5" />
          </Button>
          {user ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-foreground hover:text-primary"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/auth")}
              className="text-foreground hover:text-primary"
            >
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
