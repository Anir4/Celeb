'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BadgeCheck, Lock, Grid, Heart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { creators, posts, subscriptions } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function CreatorProfile() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useAuth();
  
  const creator = creators.find(c => c.id === id);
  const creatorPosts = posts.filter(p => p.creatorId === id);
  const isSubscribed = subscriptions.some(s => s.creatorId === id && s.userId === user?.id);

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Créateur non trouvé</h1>
          <Link href="/discover" className="text-primary hover:underline">
            Retour à la découverte
          </Link>
        </div>
      </div>
    );
  }

  const handleSubscribe = () => {
    // TODO: Implement Stripe checkout
    toast.info('Redirection vers le paiement...');
    // Mock redirect to success
    setTimeout(() => {
      window.location.href = '/payment/success';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      {/* Banner */}
      <div className="relative h-48 lg:h-64">
        <img
          src={creator.banner}
          alt={`${creator.displayName} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <Link
          href="/discover"
          className="absolute top-4 left-4 p-2 rounded-full glass backdrop-blur-xl"
        >
          <ArrowLeft size={24} className="text-foreground" />
        </Link>
      </div>

      {/* Profile Content */}
      <div className="px-4 lg:px-8 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Avatar & Info */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-6">
            <img
              src={creator.avatar}
              alt={creator.displayName}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-background shadow-xl"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display font-bold text-2xl lg:text-3xl text-foreground">
                  {creator.displayName}
                </h1>
                {creator.isVerified && (
                  <BadgeCheck size={24} className="text-primary" />
                )}
              </div>
              <p className="text-muted-foreground">@{creator.username}</p>
            </div>
            
            {!isSubscribed ? (
              <Button
                variant="gradient"
                size="lg"
                onClick={handleSubscribe}
                className="w-full lg:w-auto"
              >
                S'abonner - €{creator.subscriptionPrice}/mois
              </Button>
            ) : (
              <Button variant="secondary" size="lg" className="w-full lg:w-auto">
                Abonné ✓
              </Button>
            )}
          </div>

          {/* Bio */}
          <p className="text-foreground mb-6">{creator.bio}</p>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-8">
            <div className="text-center">
              <p className="font-display font-bold text-xl text-foreground">
                {creator.subscriberCount.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Abonnés</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-xl text-foreground">
                {creator.postCount}
              </p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
            {creatorPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={post.mediaUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1 text-foreground">
                    <Heart size={20} className="fill-current" />
                    <span className="font-medium">{post.likeCount}</span>
                  </div>
                </div>

                {/* Lock indicator for subscriber-only content */}
                {post.visibility === 'subscribers' && !isSubscribed && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <Lock size={32} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Réservé aux abonnés</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {creatorPosts.length === 0 && (
            <div className="text-center py-16 glass-elevated rounded-2xl">
              <Grid size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun post pour le moment</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
