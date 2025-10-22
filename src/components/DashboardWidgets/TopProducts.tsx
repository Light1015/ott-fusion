import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TopProducts: React.FC = () => {
  const items = [
    { rank: '01', name: 'Home Decore Range', popularity: 46 },
    { rank: '02', name: 'Disney Princess Dress', popularity: 17 },
    { rank: '03', name: 'Bathroom Essentials', popularity: 19 },
    { rank: '04', name: 'Apple Smartwatch', popularity: 29 },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.rank} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-muted-foreground">{it.rank}</div>
                <div>
                  <div className="font-medium text-foreground">{it.name}</div>
                  <div className="text-xs text-muted-foreground">Popularity</div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{it.popularity}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
