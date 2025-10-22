import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-background md:pl-64 pt-24 px-6 md:px-20 scrollbar-hide">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-4">Cài đặt</h1>
        <p className="text-muted-foreground">Application and account settings.</p>
      </div>
    </div>
  );
};

export default Settings;
