import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { trendingNow, newReleases, popularMovies } from '@/data/movies';

const Categories: React.FC = () => {
  const [tab, setTab] = useState<'categories' | 'movies' | 'shows'>('categories');

  return (
    <div className="min-h-screen bg-background md:pl-64 pt-24 px-6 md:px-20">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6">Phân loại mục</h1>
        <div className="flex gap-3 mb-4">
          <button onClick={() => setTab('categories')} className={`px-3 py-2 rounded ${tab==='categories'? 'bg-muted text-foreground':'text-muted-foreground'}`}>Phân loại</button>
          <button onClick={() => setTab('movies')} className={`px-3 py-2 rounded ${tab==='movies'? 'bg-muted text-foreground':'text-muted-foreground'}`}>Phim</button>
          <button onClick={() => setTab('shows')} className={`px-3 py-2 rounded ${tab==='shows'? 'bg-muted text-foreground':'text-muted-foreground'}`}>Show</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tab === 'categories' && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Thêm phân loại mới</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="Tên phân loại" />
                  <div className="flex justify-end">
                    <Button>Thêm</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {tab !== 'categories' && (
            <div className="lg:col-span-3">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>{tab === 'movies' ? 'Phim' : 'Show'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(tab === 'movies' ? [...trendingNow, ...newReleases, ...popularMovies] : [...trendingNow, ...newReleases].filter(m => m.type === 'show')).map(m => (
                      <div key={m.id} className="p-3 bg-muted rounded">
                        <div className="font-medium text-foreground">{m.title}</div>
                        <div className="text-xs text-muted-foreground">{m.genre} • {m.year}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
