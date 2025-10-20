import { Search, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const menuItems = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-b from-background to-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <h1 className="text-3xl font-bold text-primary">STREAMIX</h1>
          
          {/* Menu Items */}
          <ul className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
                >
                  {item}
                </a>
              </li>
            ))}
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
          <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
