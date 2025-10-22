import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Trophy,
  Users,
  Database,
  Film,
  Tv,
  FileText,
  MessageCircle,
  Settings,
  Clock,
  LogOut,
  ChevronRight,
  List,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const NavItem: React.FC<{ to: string; icon?: any; label: string }> = ({ to, icon: Icon, label }) => {
    const active = location.pathname === to;
    return (
      <li>
        <Link
          to={to}
          className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium ${
            active ? 'bg-muted text-foreground' : 'text-foreground/80 hover:text-foreground hover:bg-muted'
          }`}
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span>{label}</span>
        </Link>
      </li>
    );
  };

  return (
  <aside className="fixed left-0 top-0 bottom-0 w-64 hidden md:flex flex-col bg-card border-r border-border scrollbar-hide">
      <div className="h-20 flex items-center px-6">
        <h2 className="text-lg font-bold text-primary">STREAMIX Admin</h2>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-1">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/leaderboard" icon={Trophy} label="Leaderboard" />

          <li>
            <div className="px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground">Quản lý tài khoản</div>
            <ul className="space-y-1">
              <NavItem to="/manage" icon={Users} label="Quản lý" />
              <NavItem to="/users" icon={List} label="Người dùng" />
            </ul>
          </li>

          <li>
            <div className="px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground">Quản lý dữ liệu</div>
            <ul className="space-y-1">
              <NavItem to="/categories" icon={Database} label="Phân loại mục" />
              <NavItem to="/reports" icon={FileText} label="Báo cáo người dùng" />
              <NavItem to="/messages" icon={MessageCircle} label="Tin nhắn" />
            </ul>
          </li>

          <NavItem to="/settings" icon={Settings} label="Cài đặt" />
          <NavItem to="/history" icon={Clock} label="Lịch sử" />
          <NavItem to="/signout" icon={LogOut} label="Đăng xuất" />
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <Link to="/profile" className="flex items-center gap-3 text-sm hover:opacity-90">
          <div className="w-9 h-9 rounded-full bg-muted" />
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">Người Quản Trị</div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
