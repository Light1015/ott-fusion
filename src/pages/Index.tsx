import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContentRow from "@/components/ContentRow";
import { trendingNow, newReleases, popularMovies } from "@/data/movies";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      <div className="space-y-8 pb-20">
        <ContentRow title="Trending Now" movies={trendingNow} />
        <ContentRow title="New Releases" movies={newReleases} />
        <ContentRow title="Popular on StreamiX" movies={popularMovies} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 md:px-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About Us</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/support" className="hover:text-foreground">Help Center</Link></li>
                <li><Link to="/support" className="hover:text-foreground">Contact Us</Link></li>
                <li><Link to="/support" className="hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/subscription" className="hover:text-foreground">Pricing</Link></li>
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-foreground">Social</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Facebook</a></li>
                <li><a href="#" className="hover:text-foreground">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground">Instagram</a></li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © 2024 StreamiX. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
