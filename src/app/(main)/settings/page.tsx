'use client';

import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Lock, 
  CreditCard, 
  Globe, 
  Moon, 
  HelpCircle, 
  FileText, 
  ChevronRight,
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const settingsSections = [
  {
    title: 'Compte',
    items: [
      { icon: User, label: 'Informations personnelles', path: '/settings/profile' },
      { icon: Bell, label: 'Notifications', path: '/settings/notifications' },
      { icon: Lock, label: 'Confidentialité et sécurité', path: '/settings/privacy' },
    ]
  },
  {
    title: 'Paiement',
    items: [
      { icon: CreditCard, label: 'Méthodes de paiement', path: '/settings/payment' },
    ]
  },
  {
    title: 'Préférences',
    items: [
      { icon: Globe, label: 'Langue', path: '/settings/language', value: 'Français' },
      { icon: Moon, label: 'Thème', path: '/settings/theme', value: 'Sombre' },
    ]
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Centre d\'aide', path: '/help' },
      { icon: FileText, label: 'Conditions d\'utilisation', path: '/terms' },
    ]
  },
];

export default function Settings() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-8 pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="font-display font-bold text-3xl text-foreground mb-8">
          Paramètres
        </h1>

        <div className="space-y-8">
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
                {section.title}
              </h2>
              <div className="glass-elevated rounded-xl overflow-hidden">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <span className="flex-1 text-left font-medium text-foreground">
                        {item.label}
                      </span>
                      {'value' in item && (
                        <span className="text-sm text-muted-foreground">
                          {item.value}
                        </span>
                      )}
                      <ChevronRight size={20} className="text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 glass-elevated rounded-xl hover:bg-destructive/10 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <LogOut size={20} className="text-destructive" />
              </div>
              <span className="flex-1 text-left font-medium text-destructive">
                Se déconnecter
              </span>
            </button>
          </motion.div>
        </div>

        {/* Version */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Celebque v1.0.0
        </p>
      </motion.div>
    </div>
  );
}
