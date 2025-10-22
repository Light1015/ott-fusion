import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Plus, ThumbsUp, Volume2, ChevronLeft, ChevronRight, Calendar, Languages, Star as StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { trendingNow, newReleases, popularMovies } from "@/data/movies";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [expandedSeason, setExpandedSeason] = useState<number | null>(1);
  
  // Find content from all data
  const allContent = [...trendingNow, ...newReleases, ...popularMovies];
  const content = allContent.find(m => m.id === id);

  useEffect(() => {
    if (id) {
      const following = JSON.parse(localStorage.getItem("followingMovies") || "[]");
      setIsFollowing(following.includes(id));
    }
  }, [id]);

  const handleFollow = () => {
    if (!id) return;
    
    const following = JSON.parse(localStorage.getItem("followingMovies") || "[]");
    
    if (isFollowing) {
      const updated = following.filter((movieId: string) => movieId !== id);
      localStorage.setItem("followingMovies", JSON.stringify(updated));
      setIsFollowing(false);
      toast({
        title: "Đã bỏ theo dõi",
        description: `${content?.title} đã được bỏ khỏi danh sách theo dõi`,
      });
    } else {
      following.push(id);
      localStorage.setItem("followingMovies", JSON.stringify(following));
      setIsFollowing(true);
      toast({
        title: "Đã theo dõi",
        description: `${content?.title} đã được thêm vào danh sách theo dõi`,
      });
    }
  };

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Content not found</h2>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const isShow = content.type === "show";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <img
          src={content.image}
          alt={content.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        
        <div className="relative container mx-auto px-4 md:px-12 h-full flex flex-col justify-end pb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            {content.title}
          </h1>
          
          <p className="text-foreground/90 max-w-3xl mb-6 text-base md:text-lg">
            {content.description}
          </p>

          <div className="flex gap-3">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Play className="h-5 w-5 mr-2 fill-current" />
              Play Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleFollow}
              className={isFollowing ? "bg-primary/20 border-primary" : ""}
            >
              <Plus className="h-5 w-5 mr-2" />
            </Button>
            <Button size="lg" variant="outline">
              <ThumbsUp className="h-5 w-5 mr-2" />
            </Button>
            <Button size="lg" variant="outline">
              <Volume2 className="h-5 w-5 mr-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Seasons and Episodes (for shows) */}
            {isShow && content.seasons && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Seasons and Episodes</h2>
                <div className="space-y-4">
                  {content.seasons.map((season) => (
                    <Card key={season.number} className="bg-card/50 border-border">
                      <CardContent className="p-6">
                        <button
                          onClick={() => setExpandedSeason(expandedSeason === season.number ? null : season.number)}
                          className="flex items-center justify-between w-full text-left"
                        >
                          <h3 className="text-xl font-semibold text-foreground">
                            Season {String(season.number).padStart(2, '0')} | {season.episodes.length} Episodes
                          </h3>
                          <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${expandedSeason === season.number ? 'rotate-90' : ''}`} />
                        </button>
                        
                        {expandedSeason === season.number && (
                          <div className="mt-4 space-y-4">
                            {season.episodes.map((episode) => (
                              <div key={episode.number} className="flex gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                                <div className="text-2xl font-bold text-muted-foreground min-w-[40px]">
                                  {String(episode.number).padStart(2, '0')}
                                </div>
                                <div className="relative w-32 h-20 rounded overflow-hidden flex-shrink-0">
                                  <img src={episode.thumbnail} alt={episode.title} className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                                    <Play className="h-8 w-8 text-white" />
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-1">
                                    <h4 className="font-semibold text-foreground">{episode.title}</h4>
                                    <span className="text-sm text-muted-foreground">{episode.duration}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{episode.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{content.description}</p>
            </div>

            {/* Cast */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Cast</h2>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="rounded-full">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {content.cast.map((member, index) => (
                  <div key={index} className="flex flex-col items-center min-w-[100px]">
                    <Avatar className="h-20 w-20 mb-2">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium text-foreground text-center">{member.name}</p>
                    {member.role && <p className="text-xs text-muted-foreground text-center">{member.role}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground">Reviews</h2>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your Review
                </Button>
              </div>
              <div className="grid gap-4">
                {content.reviews.map((review, index) => (
                  <Card key={index} className="bg-card/50 border-border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{review.author}</h4>
                          <p className="text-sm text-muted-foreground">{review.location}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                            />
                          ))}
                          <span className="ml-1 text-sm font-semibold text-foreground">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Release Info */}
            <Card className="bg-card/50 border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Released Year</p>
                    <p className="text-sm">{content.year}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Languages className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Available Languages</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {content.languages.map((lang) => (
                        <Badge key={lang} variant="secondary">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Ratings</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">IMDb</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${i < content.imdbRating / 2 ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                          />
                        ))}
                        <span className="ml-1 text-sm font-semibold text-foreground">{content.imdbRating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Streamvibe</span>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${i < content.streamvibeRating ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                          />
                        ))}
                        <span className="ml-1 text-sm font-semibold text-foreground">{content.streamvibeRating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    {content.genres.map((genre) => (
                      <Badge key={genre} variant="outline">{genre}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Director */}
            {content.director && (
              <Card className="bg-card/50 border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Director</h3>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={content.director.image} alt={content.director.name} />
                      <AvatarFallback>{content.director.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{content.director.name}</p>
                      <p className="text-sm text-muted-foreground">From India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Music */}
            {content.music && (
              <Card className="bg-card/50 border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Music</h3>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={content.music.image} alt={content.music.name} />
                      <AvatarFallback>{content.music.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{content.music.name}</p>
                      <p className="text-sm text-muted-foreground">From India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
