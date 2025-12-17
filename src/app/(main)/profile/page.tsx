'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Settings, Star, Users, Heart, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptions, posts } from '@/data/mockData';

export default function Profile() {
  const { user } = useAuth();
  const userSubscriptions = subscriptions.filter(s => s.userId === user?.id);

  const stats = [
    { label: 'Abonnements', value: userSubscriptions.length, icon: Users },
    { label: 'Likes', value: '1.2K', icon: Heart },
    { label: 'Posts sauvés', value: 12, icon: Grid },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-br from-primary/30 via-accent/20 to-background">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute top-4 right-4">
          <Link href="/settings">
            <Button variant="glass" size="icon">
              <Settings size={20} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Content */}
      <div className="px-6 pb-24 lg:pb-6 -mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Avatar & Info */}
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src={user?.avatar}
              alt={user?.username}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-background shadow-xl mb-4"
            />
            <h1 className="font-display font-bold text-2xl text-foreground">
              {user?.username}
            </h1>
            <p className="text-muted-foreground mt-1">
              {user?.bio || 'Aucune bio pour le moment'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-elevated rounded-xl p-4 text-center"
                >
                  <Icon size={20} className="text-primary mx-auto mb-2" />
                  <p className="font-display font-bold text-xl text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Become Creator CTA */}
          {!user?.isCreator && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-elevated rounded-2xl p-6 mb-8 text-center"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 glow-primary">
                <Star size={32} className="text-primary-foreground" />
              </div>
              <h2 className="font-display font-bold text-xl text-foreground mb-2">
                Devenez Créateur
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Monétisez votre contenu et construisez votre communauté
              </p>
              <Link href="/become-creator">
                <Button variant="gradient" size="lg">
                  Commencer maintenant
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Creator Dashboard Link */}
          {user?.isCreator && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <Link href="/creator/dashboard">
                <Button variant="gradient" size="lg" className="w-full">
                  <Star size={20} className="mr-2" />
                  Accéder au Dashboard Créateur
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Subscriptions Section */}
          <div>
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">
              Mes Abonnements
            </h2>
            {userSubscriptions.length > 0 ? (
              <div className="space-y-3">
                {userSubscriptions.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/creators/${sub.creatorId}`}
                    className="flex items-center gap-4 p-4 glass-elevated rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <img
                      src={sub.creator.avatar}
                      alt={sub.creator.displayName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {sub.creator.displayName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Renouvellement: {new Date(sub.endDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <span className="text-sm text-primary font-medium">
                      €{sub.creator.subscriptionPrice}/mois
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 glass-elevated rounded-xl">
                <Users size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Vous n'avez pas encore d'abonnements
                </p>
                <Link href="/discover" className="text-primary text-sm hover:underline mt-2 block">
                  Découvrir des créateurs
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
