import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import MoviesShows from "./pages/MoviesShows";
import MovieDetail from "./pages/MovieDetail";
import MyList from "./pages/MyList";
import Support from "./pages/Support";
import Subscription from "./pages/Subscription";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import UsersAdminPage from "./pages/admin/Users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/movies-shows" element={<MoviesShows />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/support" element={<Support />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersAdminPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
