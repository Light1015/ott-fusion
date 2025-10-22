import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const data = [
  { month: 'Jan', value: 50 },
  { month: 'Feb', value: 80 },
  { month: 'Mar', value: 120 },
  { month: 'Apr', value: 200 },
  { month: 'May', value: 380 },
  { month: 'Jun', value: 480 },
  { month: 'Jul', value: 420 },
  { month: 'Aug', value: 360 },
  { month: 'Sep', value: 300 },
  { month: 'Oct', value: 340 },
  { month: 'Nov', value: 260 },
  { month: 'Dec', value: 320 },
];

const VisitorInsights: React.FC = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Visitor Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7dd3fc" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#7dd3fc" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <ReferenceLine x="Jun" stroke="#f97316" strokeDasharray="3 3" />
              <Area type="monotone" dataKey="value" stroke="#60a5fa" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorInsights;
