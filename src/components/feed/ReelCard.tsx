'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Lock, BadgeCheck } from 'lucide-react';
import { Post } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ReelCardProps {
  post: Post;
  isActive?: boolean;
}

export function ReelCard({ post, isActive = false }: ReelCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative w-full h-[calc(100vh-80px)] lg:h-screen snap-start flex items-center justify-center"
    >
      <div className="relative w-full max-w-md mx-auto h-full lg:h-[85vh] rounded-none lg:rounded-2xl overflow-hidden">
        {/* Media */}
        <div className="absolute inset-0">
          <img
            src={post.mediaUrl}
            alt={post.caption}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/30" />
        </div>

        {/* Locked Content Overlay */}
        {post.isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Lock size={32} className="text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                Contenu réservé aux abonnés
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Abonnez-vous pour accéder à ce contenu exclusif
              </p>
              <Link href={`/creators/${post.creatorId}`}>
                <Button className="gradient-primary">
                  S'abonner - €{post.creator.subscriptionPrice}/mois
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
          {/* Creator Info */}
          <Link
            href={`/creators/${post.creatorId}`}
            className="flex items-center gap-3 mb-4 group"
          >
            <img
              src={post.creator.avatar}
              alt={post.creator.displayName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/50 group-hover:ring-primary transition-all"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-foreground">
                  {post.creator.displayName}
                </span>
                {post.creator.isVerified && (
                  <BadgeCheck size={16} className="text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                @{post.creator.username}
              </p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground"
            >
              Suivre
            </Button>
          </Link>

          {/* Caption */}
          <p className="text-foreground text-sm lg:text-base mb-4 line-clamp-3">
            {post.caption}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6">
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all",
              isLiked ? "bg-primary text-primary-foreground" : "bg-background/50 backdrop-blur-sm text-foreground hover:bg-background/70"
            )}>
              <Heart
                size={24}
                className={cn(isLiked && "fill-current")}
              />
            </div>
            <span className="text-xs text-foreground font-medium">
              {likeCount >= 1000 ? `${(likeCount / 1000).toFixed(1)}K` : likeCount}
            </span>
          </button>

          <button className="flex flex-col items-center gap-1 group">
            <div className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/70 transition-all">
              <MessageCircle size={24} />
            </div>
            <span className="text-xs text-foreground font-medium">
              {post.commentCount}
            </span>
          </button>

          <button className="flex flex-col items-center gap-1 group">
            <div className="w-12 h-12 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/70 transition-all">
              <Share2 size={24} />
            </div>
            <span className="text-xs text-foreground font-medium">
              Partager
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
