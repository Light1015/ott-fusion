import movie1 from "@/assets/movie1.jpg";
import movie2 from "@/assets/movie2.jpg";
import movie3 from "@/assets/movie3.jpg";
import movie4 from "@/assets/movie4.jpg";
import movie5 from "@/assets/movie5.jpg";

export interface Cast {
  name: string;
  role?: string;
  image: string;
}

export interface Review {
  author: string;
  location: string;
  rating: number;
  text: string;
}

export interface Episode {
  number: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
}

export interface Season {
  number: number;
  episodes: Episode[];
}

export interface Movie {
  id: string;
  image: string;
  title: string;
  genre: string;
  rating: string;
  type: "movie" | "show";
  year: string;
  duration?: string;
  description: string;
  languages: string[];
  imdbRating: number;
  streamvibeRating: number;
  genres: string[];
  director?: Cast;
  music?: Cast;
  cast: Cast[];
  reviews: Review[];
  seasons?: Season[];
}

export const trendingNow: Movie[] = [
  {
    id: "1",
    image: movie1,
    title: "Neon Dreams",
    genre: "Sci-Fi Thriller",
    rating: "95%",
    type: "movie",
    year: "2024",
    duration: "2h 15m",
    description: "A thrilling journey through a cyberpunk metropolis where dreams and reality merge in unexpected ways. Experience cutting-edge visual effects and a mind-bending storyline.",
    languages: ["English", "Japanese", "Korean"],
    imdbRating: 8.5,
    streamvibeRating: 4,
    genres: ["Action", "Sci-Fi", "Thriller"],
    director: { name: "Sarah Chen", role: "Director", image: movie1 },
    music: { name: "David Park", role: "Composer", image: movie2 },
    cast: [
      { name: "Alex Johnson", role: "Lead Actor", image: movie1 },
      { name: "Maria Santos", role: "Lead Actress", image: movie2 },
      { name: "James Kim", role: "Supporting", image: movie3 },
      { name: "Emily Zhang", role: "Supporting", image: movie4 },
    ],
    reviews: [
      {
        author: "Aniket Roy",
        location: "From India",
        rating: 4.5,
        text: "This movie was recommended to me by a very close friend who went to the movie by herself. I went to watch it, but never expected to be this overwhelmed by the movie.",
      },
      {
        author: "Swaraj",
        location: "From India",
        rating: 5,
        text: "A cinematic masterpiece that pushes the boundaries of storytelling. The visual effects are stunning and the narrative keeps you engaged throughout.",
      },
    ],
  },
  {
    id: "2",
    image: movie2,
    title: "The Enchanted Forest",
    genre: "Fantasy Adventure",
    rating: "92%",
    type: "show",
    year: "2024",
    description: "When a young boy vanishes, a small town uncovers a secret fantasy portal that leads to an enchanted forest filled with mystery and danger. A thrilling supernatural forest is all that's in the way.",
    languages: ["English", "Spanish", "French"],
    imdbRating: 8.2,
    streamvibeRating: 4.5,
    genres: ["Fantasy", "Adventure", "Mystery"],
    cast: [
      { name: "Tom Holland", role: "Lead", image: movie1 },
      { name: "Emma Watson", role: "Lead", image: movie2 },
      { name: "Chris Evans", role: "Supporting", image: movie3 },
      { name: "Scarlett Johansson", role: "Supporting", image: movie4 },
    ],
    reviews: [
      {
        author: "Michael Chen",
        location: "From USA",
        rating: 4.5,
        text: "An enchanting series that captures the magic of adventure. The forest scenes are breathtaking and the storyline is captivating.",
      },
      {
        author: "Lisa Wang",
        location: "From Canada",
        rating: 5,
        text: "Best fantasy series I've watched in years. The character development is outstanding and the world-building is incredible.",
      },
    ],
    seasons: [
      {
        number: 1,
        episodes: [
          {
            number: 1,
            title: "Chapter One: The Vanishing of Will Byers",
            duration: "49 min",
            description: "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
            thumbnail: movie2,
          },
          {
            number: 2,
            title: "Chapter Two: The Weirdo on Maple Street",
            duration: "56 min",
            description: "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.",
            thumbnail: movie2,
          },
          {
            number: 3,
            title: "Chapter Three: Holly, Jolly",
            duration: "52 min",
            description: "An increasingly concerned Nancy looks for Barb and finds out what Jonathan's been up to. Joyce is convinced Will is trying to talk to her.",
            thumbnail: movie2,
          },
          {
            number: 4,
            title: "Chapter Four: The Body",
            duration: "51 min",
            description: "Refusing to believe Will is dead, Joyce tries to connect with her son. The boys give Eleven a makeover. Nancy and Jonathan form an unlikely alliance.",
            thumbnail: movie2,
          },
        ],
      },
      {
        number: 2,
        episodes: [
          {
            number: 1,
            title: "Chapter One: MADMAX",
            duration: "48 min",
            description: "As the town preps for Halloween, a high-scoring rival shakes things up at the arcade, and a skeptical Hopper inspects a field of rotting pumpkins.",
            thumbnail: movie2,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    image: movie3,
    title: "City of Shadows",
    genre: "Crime Drama",
    rating: "88%",
    type: "movie",
    year: "2024",
    duration: "2h 30m",
    description: "A noir detective story set in a sprawling metropolis where corruption runs deep and every shadow hides a secret.",
    languages: ["English", "Italian"],
    imdbRating: 8.0,
    streamvibeRating: 4,
    genres: ["Crime", "Drama", "Thriller"],
    director: { name: "Martin Scorsese Jr.", role: "Director", image: movie3 },
    music: { name: "Hans Zimmer", role: "Composer", image: movie4 },
    cast: [
      { name: "Robert Pattinson", role: "Detective", image: movie3 },
      { name: "Zoe Kravitz", role: "Informant", image: movie4 },
      { name: "Paul Dano", role: "Villain", image: movie5 },
    ],
    reviews: [
      {
        author: "John Smith",
        location: "From UK",
        rating: 4,
        text: "A dark and gritty crime drama that keeps you on the edge of your seat. The cinematography is outstanding.",
      },
    ],
  },
  {
    id: "4",
    image: movie4,
    title: "Love in Paradise",
    genre: "Romantic Comedy",
    rating: "85%",
    type: "movie",
    year: "2024",
    duration: "1h 55m",
    description: "A lighthearted romantic comedy set in a tropical paradise where two strangers find unexpected love.",
    languages: ["English", "Portuguese"],
    imdbRating: 7.5,
    streamvibeRating: 4,
    genres: ["Romance", "Comedy"],
    director: { name: "Nancy Meyers", role: "Director", image: movie4 },
    music: { name: "Alexandre Desplat", role: "Composer", image: movie5 },
    cast: [
      { name: "Ryan Gosling", role: "Lead", image: movie1 },
      { name: "Emma Stone", role: "Lead", image: movie2 },
    ],
    reviews: [
      {
        author: "Sophie Martin",
        location: "From France",
        rating: 4.5,
        text: "Charming and delightful! A perfect date night movie with great chemistry between the leads.",
      },
    ],
  },
  {
    id: "5",
    image: movie5,
    title: "The Haunting",
    genre: "Horror Thriller",
    rating: "90%",
    type: "movie",
    year: "2024",
    duration: "2h 05m",
    description: "A terrifying horror experience that will keep you up at night. Enter if you dare.",
    languages: ["English"],
    imdbRating: 8.3,
    streamvibeRating: 4.5,
    genres: ["Horror", "Thriller"],
    director: { name: "James Wan", role: "Director", image: movie5 },
    music: { name: "Joseph Bishara", role: "Composer", image: movie1 },
    cast: [
      { name: "Vera Farmiga", role: "Lead", image: movie5 },
      { name: "Patrick Wilson", role: "Lead", image: movie1 },
    ],
    reviews: [
      {
        author: "Horror Fan",
        location: "From USA",
        rating: 5,
        text: "Genuinely scary! Best horror movie in years. The atmosphere is perfect and the scares are well-timed.",
      },
    ],
  },
  {
    id: "6",
    image: movie1,
    title: "Future Wars",
    genre: "Action Sci-Fi",
    rating: "93%",
    type: "movie",
    year: "2024",
    duration: "2h 20m",
    description: "An epic science fiction adventure featuring spectacular battles and stunning visual effects.",
    languages: ["English", "Mandarin"],
    imdbRating: 8.7,
    streamvibeRating: 4.5,
    genres: ["Action", "Sci-Fi", "Adventure"],
    director: { name: "Denis Villeneuve", role: "Director", image: movie1 },
    music: { name: "Ludwig Göransson", role: "Composer", image: movie2 },
    cast: [
      { name: "Timothée Chalamet", role: "Hero", image: movie1 },
      { name: "Zendaya", role: "Warrior", image: movie2 },
    ],
    reviews: [
      {
        author: "Sci-Fi Enthusiast",
        location: "From Japan",
        rating: 4.5,
        text: "A visual masterpiece with an engaging story. The action sequences are incredible.",
      },
    ],
  },
];

export const newReleases: Movie[] = [
  {
    id: "7",
    image: movie2,
    title: "Magic Kingdom",
    genre: "Family Fantasy",
    rating: "87%",
    type: "movie",
    year: "2024",
    duration: "1h 50m",
    description: "A magical family adventure filled with wonder and excitement.",
    languages: ["English", "Spanish"],
    imdbRating: 7.8,
    streamvibeRating: 4,
    genres: ["Family", "Fantasy", "Adventure"],
    director: { name: "Chris Columbus", role: "Director", image: movie2 },
    cast: [
      { name: "Tom Hanks", role: "King", image: movie2 },
      { name: "Emma Thompson", role: "Queen", image: movie3 },
    ],
    reviews: [
      {
        author: "Family Movie Fan",
        location: "From USA",
        rating: 4,
        text: "Perfect for the whole family! Heartwarming and magical.",
      },
    ],
  },
  {
    id: "8",
    image: movie3,
    title: "Dark Streets",
    genre: "Noir Thriller",
    rating: "91%",
    type: "movie",
    year: "2024",
    duration: "2h 10m",
    description: "A gritty noir thriller that explores the dark underbelly of the city.",
    languages: ["English"],
    imdbRating: 8.4,
    streamvibeRating: 4.5,
    genres: ["Thriller", "Crime", "Noir"],
    director: { name: "Christopher Nolan", role: "Director", image: movie3 },
    cast: [
      { name: "Christian Bale", role: "Detective", image: movie3 },
      { name: "Marion Cotillard", role: "Suspect", image: movie4 },
    ],
    reviews: [
      {
        author: "Cinema Critic",
        location: "From UK",
        rating: 4.5,
        text: "A masterclass in noir filmmaking. Atmospheric and gripping.",
      },
    ],
  },
  {
    id: "9",
    image: movie4,
    title: "Summer Love",
    genre: "Romance",
    rating: "83%",
    type: "movie",
    year: "2024",
    duration: "1h 45m",
    description: "A sweet summer romance that will warm your heart.",
    languages: ["English", "French"],
    imdbRating: 7.3,
    streamvibeRating: 3.5,
    genres: ["Romance", "Drama"],
    director: { name: "Richard Linklater", role: "Director", image: movie4 },
    cast: [
      { name: "Saoirse Ronan", role: "Lead", image: movie4 },
      { name: "Timothée Chalamet", role: "Lead", image: movie5 },
    ],
    reviews: [
      {
        author: "Romance Reader",
        location: "From France",
        rating: 4,
        text: "Beautifully shot and wonderfully acted. A touching love story.",
      },
    ],
  },
  {
    id: "10",
    image: movie5,
    title: "Nightmare Manor",
    genre: "Horror",
    rating: "86%",
    type: "show",
    year: "2024",
    description: "A chilling horror series set in a haunted mansion with dark secrets.",
    languages: ["English"],
    imdbRating: 8.1,
    streamvibeRating: 4,
    genres: ["Horror", "Mystery", "Thriller"],
    cast: [
      { name: "Anya Taylor-Joy", role: "Lead", image: movie5 },
      { name: "Bill Skarsgård", role: "Ghost", image: movie1 },
    ],
    reviews: [
      {
        author: "Horror Lover",
        location: "From Canada",
        rating: 4.5,
        text: "Terrifying and atmospheric. Can't wait for the next season!",
      },
    ],
    seasons: [
      {
        number: 1,
        episodes: [
          {
            number: 1,
            title: "The Arrival",
            duration: "52 min",
            description: "A family moves into a mysterious manor with a dark history.",
            thumbnail: movie5,
          },
        ],
      },
    ],
  },
  {
    id: "11",
    image: movie1,
    title: "Cyber Revolution",
    genre: "Sci-Fi Action",
    rating: "94%",
    type: "movie",
    year: "2024",
    duration: "2h 25m",
    description: "A revolutionary sci-fi action film exploring the future of humanity and AI.",
    languages: ["English", "Japanese"],
    imdbRating: 8.8,
    streamvibeRating: 4.5,
    genres: ["Sci-Fi", "Action", "Thriller"],
    director: { name: "The Wachowskis", role: "Directors", image: movie1 },
    cast: [
      { name: "Keanu Reeves", role: "Hero", image: movie1 },
      { name: "Carrie-Anne Moss", role: "Warrior", image: movie2 },
    ],
    reviews: [
      {
        author: "Tech Enthusiast",
        location: "From USA",
        rating: 5,
        text: "Mind-blowing action and thought-provoking themes. A must-watch!",
      },
    ],
  },
  {
    id: "12",
    image: movie2,
    title: "Dragon's Quest",
    genre: "Epic Fantasy",
    rating: "89%",
    type: "movie",
    year: "2024",
    duration: "2h 35m",
    description: "An epic fantasy adventure following a hero's quest to defeat an ancient dragon.",
    languages: ["English", "Welsh"],
    imdbRating: 8.2,
    streamvibeRating: 4,
    genres: ["Fantasy", "Adventure", "Action"],
    director: { name: "Peter Jackson", role: "Director", image: movie2 },
    cast: [
      { name: "Henry Cavill", role: "Hero", image: movie2 },
      { name: "Emilia Clarke", role: "Mage", image: movie3 },
    ],
    reviews: [
      {
        author: "Fantasy Fan",
        location: "From New Zealand",
        rating: 4.5,
        text: "Epic in every sense. The dragon effects are spectacular!",
      },
    ],
  },
];

export const popularMovies: Movie[] = [
  {
    id: "13",
    image: movie3,
    title: "Underworld",
    genre: "Crime Thriller",
    rating: "92%",
    type: "movie",
    year: "2023",
    duration: "2h 15m",
    description: "A deep dive into the criminal underworld of a major city.",
    languages: ["English", "Italian"],
    imdbRating: 8.5,
    streamvibeRating: 4.5,
    genres: ["Crime", "Thriller", "Drama"],
    director: { name: "Ridley Scott", role: "Director", image: movie3 },
    cast: [
      { name: "Javier Bardem", role: "Kingpin", image: movie3 },
      { name: "Penélope Cruz", role: "Detective", image: movie4 },
    ],
    reviews: [
      {
        author: "Crime Drama Fan",
        location: "From Spain",
        rating: 4.5,
        text: "Intense and gripping from start to finish. Excellent performances.",
      },
    ],
  },
  {
    id: "14",
    image: movie4,
    title: "Sunset Boulevard",
    genre: "Drama Romance",
    rating: "88%",
    type: "movie",
    year: "2023",
    duration: "2h 00m",
    description: "A romantic drama exploring love and loss in Hollywood.",
    languages: ["English"],
    imdbRating: 7.9,
    streamvibeRating: 4,
    genres: ["Drama", "Romance"],
    director: { name: "Damien Chazelle", role: "Director", image: movie4 },
    cast: [
      { name: "Brad Pitt", role: "Actor", image: movie4 },
      { name: "Margot Robbie", role: "Actress", image: movie5 },
    ],
    reviews: [
      {
        author: "Drama Lover",
        location: "From USA",
        rating: 4,
        text: "Beautiful cinematography and touching performances.",
      },
    ],
  },
  {
    id: "15",
    image: movie5,
    title: "The Possession",
    genre: "Supernatural Horror",
    rating: "85%",
    type: "movie",
    year: "2023",
    duration: "1h 55m",
    description: "A supernatural horror film about a demonic possession that terrorizes a family.",
    languages: ["English"],
    imdbRating: 7.7,
    streamvibeRating: 4,
    genres: ["Horror", "Supernatural", "Thriller"],
    director: { name: "Mike Flanagan", role: "Director", image: movie5 },
    cast: [
      { name: "Florence Pugh", role: "Victim", image: movie5 },
      { name: "Oscar Isaac", role: "Priest", image: movie1 },
    ],
    reviews: [
      {
        author: "Horror Buff",
        location: "From Australia",
        rating: 4,
        text: "Truly terrifying! The best possession film since The Exorcist.",
      },
    ],
  },
  {
    id: "16",
    image: movie1,
    title: "Space Odyssey",
    genre: "Sci-Fi Epic",
    rating: "96%",
    type: "movie",
    year: "2023",
    duration: "2h 45m",
    description: "A breathtaking journey through space exploring the mysteries of the universe.",
    languages: ["English", "Russian"],
    imdbRating: 9.0,
    streamvibeRating: 5,
    genres: ["Sci-Fi", "Adventure", "Drama"],
    director: { name: "Christopher Nolan", role: "Director", image: movie1 },
    cast: [
      { name: "Matthew McConaughey", role: "Astronaut", image: movie1 },
      { name: "Anne Hathaway", role: "Scientist", image: movie2 },
    ],
    reviews: [
      {
        author: "Space Fan",
        location: "From Russia",
        rating: 5,
        text: "A masterpiece! Visually stunning and intellectually stimulating.",
      },
    ],
  },
  {
    id: "17",
    image: movie2,
    title: "Mystic Legends",
    genre: "Fantasy Drama",
    rating: "90%",
    type: "movie",
    year: "2023",
    duration: "2h 20m",
    description: "A mystical fantasy drama about ancient legends coming to life.",
    languages: ["English", "Celtic"],
    imdbRating: 8.3,
    streamvibeRating: 4,
    genres: ["Fantasy", "Drama", "Mystery"],
    director: { name: "Guillermo del Toro", role: "Director", image: movie2 },
    cast: [
      { name: "Benedict Cumberbatch", role: "Sorcerer", image: movie2 },
      { name: "Tilda Swinton", role: "Ancient One", image: movie3 },
    ],
    reviews: [
      {
        author: "Mythology Enthusiast",
        location: "From Ireland",
        rating: 4.5,
        text: "Beautifully crafted with rich storytelling and stunning visuals.",
      },
    ],
  },
  {
    id: "18",
    image: movie3,
    title: "Last Mission",
    genre: "Action Thriller",
    rating: "87%",
    type: "movie",
    year: "2023",
    duration: "2h 10m",
    description: "An action-packed thriller about a soldier's final and most dangerous mission.",
    languages: ["English", "Arabic"],
    imdbRating: 7.9,
    streamvibeRating: 4,
    genres: ["Action", "Thriller", "War"],
    director: { name: "Michael Bay", role: "Director", image: movie3 },
    cast: [
      { name: "Tom Cruise", role: "Soldier", image: movie3 },
      { name: "Rebecca Ferguson", role: "Agent", image: movie4 },
    ],
    reviews: [
      {
        author: "Action Fan",
        location: "From UAE",
        rating: 4,
        text: "Non-stop action! Edge-of-your-seat entertainment.",
      },
    ],
  },
];
