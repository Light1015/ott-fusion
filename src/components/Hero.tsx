import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Featured Content"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Shadow of the City
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 max-w-xl">
            When darkness falls, heroes rise. An epic tale of courage, betrayal, and redemption
            in a city where nothing is as it seems.
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
              <Play className="mr-2 h-5 w-5 fill-current" />
              Play
            </Button>
            <Button size="lg" variant="secondary" className="bg-secondary/80 hover:bg-secondary text-foreground font-semibold px-8">
              <Info className="mr-2 h-5 w-5" />
              More Info
            </Button>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-4 pt-2 text-sm text-foreground/70">
            <span className="text-primary font-bold">98% Match</span>
            <span>2024</span>
            <span className="border border-foreground/30 px-2 py-0.5">HD</span>
            <span>2h 15m</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
