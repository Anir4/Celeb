'use client';

import { motion } from 'framer-motion';
import { Wallet as WalletIcon, Plus, ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { walletBalance } from '@/data/mockData';

const transactions = [
  { id: 1, type: 'credit', description: 'Dépôt', amount: 50, date: '2024-01-20' },
  { id: 2, type: 'debit', description: 'Abonnement - Sophie Laurent', amount: -9.99, date: '2024-01-15' },
  { id: 3, type: 'debit', description: 'Abonnement - Lucas Martin', amount: -12.99, date: '2024-01-10' },
  { id: 4, type: 'credit', description: 'Dépôt', amount: 100, date: '2024-01-05' },
];

export default function Wallet() {
  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-8 pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="font-display font-bold text-3xl text-foreground mb-8">
          Portefeuille
        </h1>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="gradient-primary rounded-2xl p-6 mb-8 glow-primary"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-primary-foreground/80 text-sm font-medium">
              Solde disponible
            </span>
            <WalletIcon size={24} className="text-primary-foreground/80" />
          </div>
          <p className="font-display font-bold text-4xl text-primary-foreground mb-6">
            €{walletBalance.toFixed(2)}
          </p>
          <div className="flex gap-3">
            <Button variant="glass" size="sm" className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <Plus size={18} className="mr-2" />
              Ajouter
            </Button>
            <Button variant="glass" size="sm" className="flex-1 bg-white/20 text-white border-white/30 hover:bg-white/30">
              <CreditCard size={18} className="mr-2" />
              Retirer
            </Button>
          </div>
        </motion.div>

        {/* Transactions */}
        <div className="glass-elevated rounded-2xl p-6">
          <h2 className="font-display font-semibold text-lg text-foreground mb-6">
            Historique des transactions
          </h2>

          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'credit' 
                    ? 'bg-green-500/20' 
                    : 'bg-red-500/20'
                }`}>
                  {transaction.type === 'credit' ? (
                    <ArrowDownLeft size={20} className="text-green-400" />
                  ) : (
                    <ArrowUpRight size={20} className="text-red-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="font-medium text-foreground">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>

                <span className={`font-semibold ${
                  transaction.type === 'credit' 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}>
                  {transaction.type === 'credit' ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
