import React from 'react';

const Messages: React.FC = () => {
  return (
    <div className="min-h-screen bg-background md:pl-64 pt-24 px-6 md:px-20 scrollbar-hide">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-4">Tin nhắn</h1>
        <p className="text-muted-foreground">User messages and admin replies.</p>
      </div>
    </div>
  );
};

export default Messages;
