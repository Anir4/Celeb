'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Home, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={48} className="text-green-400" />
        </motion.div>

        <h1 className="font-display font-bold text-3xl text-foreground mb-4">
          Paiement réussi!
        </h1>
        <p className="text-muted-foreground mb-8">
          Votre abonnement a été activé avec succès. Vous avez maintenant accès à tout le contenu exclusif.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/index">
            <Button variant="gradient" size="lg">
              <Home size={20} className="mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
          <Link href="/subscriptions">
            <Button variant="secondary" size="lg">
              <User size={20} className="mr-2" />
              Mes abonnements
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
