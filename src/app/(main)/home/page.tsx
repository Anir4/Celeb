'use client';

import { useRef, useEffect } from 'react';
import { posts } from '@/data/mockData';
import { ReelCard } from '@/components/feed/ReelCard';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add smooth scroll snap behavior
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Optional: Track scroll position for analytics
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y-mandatory hide-scrollbar"
    >
      {posts.map((post, index) => (
        <ReelCard key={post.id} post={post} />
      ))}
    </div>
  );
}
