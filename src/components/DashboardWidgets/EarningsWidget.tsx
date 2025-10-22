import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Profit', value: 80, fill: '#34d399' },
];

const EarningsWidget: React.FC = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">$6078.76</div>
            <div className="text-xs text-muted-foreground">Profit is 48% More than last Month</div>
          </div>
          <div style={{ width: 120, height: 120 }}>
            <ResponsiveContainer>
              <RadialBarChart innerRadius="80%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
                <RadialBar background dataKey="value" />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="-mt-28 text-center text-lg font-bold text-foreground">80%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsWidget;
