'use client';

import { motion } from 'framer-motion';
import { Gift, Percent, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { creators } from '@/data/mockData';

const promotions = [
  {
    id: 1,
    creator: creators[0],
    discount: 50,
    originalPrice: 9.99,
    description: 'Premier mois à -50%',
    expiresAt: '2024-02-01',
  },
  {
    id: 2,
    creator: creators[3],
    discount: 30,
    originalPrice: 12.99,
    description: 'Offre de lancement',
    expiresAt: '2024-01-31',
  },
];

export default function Promotions() {
  const getDiscountedPrice = (originalPrice: number, discount: number) => {
    return (originalPrice * (1 - discount / 100)).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-8 pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <Gift size={24} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl text-foreground">
              Promotions
            </h1>
            <p className="text-muted-foreground">
              Offres exclusives limitées dans le temps
            </p>
          </div>
        </div>

        {promotions.length > 0 ? (
          <div className="space-y-4">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-elevated rounded-2xl p-6 relative overflow-hidden"
              >
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 gradient-primary px-3 py-1 rounded-full flex items-center gap-1">
                  <Percent size={14} className="text-primary-foreground" />
                  <span className="text-sm font-bold text-primary-foreground">
                    -{promo.discount}%
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={promo.creator.avatar}
                    alt={promo.creator.displayName}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/30"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {promo.creator.displayName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {promo.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-2xl text-primary">
                        €{getDiscountedPrice(promo.originalPrice, promo.discount)}
                      </span>
                      <span className="text-muted-foreground line-through">
                        €{promo.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Clock size={14} />
                      <span>
                        Expire le {new Date(promo.expiresAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  <Button variant="gradient" size="sm">
                    Profiter
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-elevated rounded-2xl">
            <Gift size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucune promotion disponible</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
