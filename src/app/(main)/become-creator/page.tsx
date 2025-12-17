'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, DollarSign, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function BecomeCreator() {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [price, setPrice] = useState('9.99');
  const [isLoading, setIsLoading] = useState(false);
  const { upgradeToCreator, user } = useAuth();
  const router = useRouter();

  const benefits = [
    { icon: DollarSign, title: 'Monétisez votre contenu', description: 'Gagnez de l\'argent avec vos créations' },
    { icon: Users, title: 'Créez votre communauté', description: 'Connectez-vous avec vos fans' },
    { icon: Sparkles, title: 'Contenu exclusif', description: 'Partagez du contenu réservé à vos abonnés' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await upgradeToCreator(displayName, bio, parseFloat(price));
      if (success) {
        toast.success('Félicitations! Vous êtes maintenant un créateur!');
        router.push('/creator/dashboard');
      }
    } catch (err) {
      toast.error('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.isCreator) {
    router.push('/creator/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 glow-primary animate-glow-pulse"
          >
            <Star size={40} className="text-primary-foreground" />
          </motion.div>
          <h1 className="font-display font-bold text-4xl text-foreground mb-4">
            Devenez <span className="gradient-text">Créateur</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Transformez votre passion en revenus et rejoignez notre communauté de créateurs
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="glass-elevated rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-elevated rounded-2xl p-8"
        >
          <h2 className="font-display font-semibold text-xl text-foreground mb-6">
            Configurez votre profil créateur
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Nom d'affichage
              </label>
              <Input
                placeholder="Votre nom de créateur"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Bio
              </label>
              <textarea
                placeholder="Décrivez-vous et votre contenu..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="flex w-full rounded-xl border border-input bg-secondary/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Prix de l'abonnement mensuel (€)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  step="0.01"
                  placeholder="9.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Vous pouvez modifier ce prix à tout moment
              </p>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Création en cours...' : (
                  <>
                    Devenir Créateur
                    <ArrowRight size={20} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
