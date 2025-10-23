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
import Leaderboard from "./pages/admin/Leaderboard";
import Manage from "./pages/admin/Manage";
import Categories from "./pages/admin/Categories";
import Reports from "./pages/admin/Reports";
import Messages from "./pages/admin/Messages";
import Settings from "./pages/admin/Settings";
import History from "./pages/admin/History";
import Signout from "./pages/admin/Signout";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

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
          
          {/* Admin routes with shared layout */}
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/manage" element={<Manage />} />
            <Route path="/users" element={<UsersAdminPage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/history" element={<History />} />
            <Route path="/signout" element={<Signout />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

