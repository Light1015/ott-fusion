import React from 'react';

const Manage: React.FC = () => {
  return (
  <div className="min-h-screen bg-background md:pl-64 pt-24 px-6 md:px-20 scrollbar-hide">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-4">Quản lý</h1>
        <p className="text-muted-foreground">Manage system settings and users here.</p>
      </div>
    </div>
  );
};

export default Manage;
