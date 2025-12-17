'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  FileImage, 
  TrendingUp, 
  Plus, 
  Eye, 
  Lock,
  MoreVertical
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { creators, posts } from '@/data/mockData';

export default function CreatorDashboard() {
  // Mock creator data (first creator as example)
  const creator = creators[0];
  const creatorPosts = posts.filter(p => p.creatorId === creator.id);

  const stats = [
    { 
      label: 'Abonnés', 
      value: creator.subscriberCount.toLocaleString(), 
      icon: Users,
      change: '+12%',
      positive: true 
    },
    { 
      label: 'Revenus ce mois', 
      value: `€${creator.monthlyRevenue.toLocaleString()}`, 
      icon: DollarSign,
      change: '+8%',
      positive: true 
    },
    { 
      label: 'Total posts', 
      value: creator.postCount.toString(), 
      icon: FileImage,
      change: '+3',
      positive: true 
    },
    { 
      label: 'Vues ce mois', 
      value: '124K', 
      icon: TrendingUp,
      change: '+24%',
      positive: true 
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">
              Dashboard Créateur
            </h1>
            <p className="text-muted-foreground mt-1">
              Bienvenue, {creator.displayName}!
            </p>
          </div>
          <Link href="/create-post">
            <Button variant="gradient">
              <Plus size={20} className="mr-2" />
              Créer un post
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-elevated rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <span className={`text-xs font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="font-display font-bold text-2xl text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Posts Section */}
        <div className="glass-elevated rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-xl text-foreground">
              Mes Posts
            </h2>
            <Link href="/creator/posts" className="text-sm text-primary hover:underline">
              Voir tout
            </Link>
          </div>

          <div className="space-y-4">
            {creatorPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <img
                  src={post.mediaUrl}
                  alt={post.caption}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {post.caption}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Eye size={14} />
                      {post.likeCount}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      post.visibility === 'free' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-primary/20 text-primary'
                    }`}>
                      {post.visibility === 'free' ? 'Gratuit' : (
                        <span className="flex items-center gap-1">
                          <Lock size={10} />
                          Abonnés
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <MoreVertical size={20} className="text-muted-foreground" />
                </button>
              </motion.div>
            ))}
          </div>

          {creatorPosts.length === 0 && (
            <div className="text-center py-12">
              <FileImage size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Vous n'avez pas encore de posts
              </p>
              <Link href="/create-post">
                <Button variant="gradient">
                  <Plus size={20} className="mr-2" />
                  Créer votre premier post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
