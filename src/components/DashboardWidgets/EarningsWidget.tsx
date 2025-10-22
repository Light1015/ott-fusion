import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          <div className="w-24 h-24 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <div className="text-lg font-bold text-foreground">80%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsWidget;
