import React from 'react';
import { Separator } from '@/components/ui/separator';

const MoviesAdmin: React.FC = () => {
  return (
    <div className="min-h-screen bg-background md:pl-64 pt-24 px-6 md:px-20 scrollbar-hide">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Phim</h1>
          <Separator className="my-4" />
        </div>

        <div>
          <p className="text-muted-foreground">Movies CRUD will go here.</p>
        </div>
      </div>
    </div>
  );
};

export default MoviesAdmin;
