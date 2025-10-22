import React from 'react';
import Sidebar from './Sidebar';
import StatCard from './DashboardWidgets/StatCard';
import TopProducts from './DashboardWidgets/TopProducts';
import EarningsWidget from './DashboardWidgets/EarningsWidget';
import VisitorInsights from './DashboardWidgets/VisitorInsights';
import { Users, Film, Activity, TrendingUp } from 'lucide-react';

const DashboardMain: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="md:pl-64 pt-24 px-4 md:px-12">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-8">Dashboard Quản Trị</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Tổng Người Dùng" value={"1,234"} subtitle="Người dùng đã đăng ký" icon={Users} />
            <StatCard title="Tổng Phim" value={"24"} subtitle="Phim có sẵn" icon={Film} />
            <StatCard title="Người Dùng Hoạt Động" value={"1,000"} subtitle="Đang hoạt động" icon={Activity} />
            <StatCard title="Lượt Theo Dõi" value={"2,345"} subtitle="Tổng lượt theo dõi" icon={TrendingUp} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <TopProducts />
              <EarningsWidget />
            </div>
            <div className="space-y-6">
              <VisitorInsights />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardMain;
