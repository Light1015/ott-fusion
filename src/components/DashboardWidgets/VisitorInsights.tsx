import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VisitorInsights: React.FC = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Visitor Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground">Graph placeholder — implement chart as needed</div>
      </CardContent>
    </Card>
  );
};

export default VisitorInsights;
