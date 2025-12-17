'use client';

import { motion } from 'framer-motion';
import { Sparkles, Star, Zap, Shield } from 'lucide-react';

const updates = [
  {
    id: 1,
    icon: Sparkles,
    title: 'Nouveau design',
    description: 'Interface repensée pour une meilleure expérience utilisateur',
    date: '2024-01-20',
  },
  {
    id: 2,
    icon: Zap,
    title: 'Feed amélioré',
    description: 'Découvrez du contenu plus rapidement avec notre nouveau feed style reels',
    date: '2024-01-18',
  },
  {
    id: 3,
    icon: Shield,
    title: 'Sécurité renforcée',
    description: 'Authentification à deux facteurs maintenant disponible',
    date: '2024-01-15',
  },
  {
    id: 4,
    icon: Star,
    title: 'Programme Créateur',
    description: 'Nouveaux outils pour les créateurs: analytics avancés et plus',
    date: '2024-01-10',
  },
];

export default function WhatsNew() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-8 pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center animate-glow-pulse">
            <Sparkles size={24} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">
              Nouveautés
            </h1>
            <p className="text-muted-foreground">
              Dernières mises à jour de Celebque
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {updates.map((update, index) => {
            const Icon = update.icon;
            return (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-elevated rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                      {update.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {update.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(update.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
