'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Bell, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Accueil', path: '/' },
  { icon: Compass, label: 'Découvrir', path: '/discover' },
  { icon: Bell, label: 'Notifications', path: '/notifications', badge: 2 },
  { icon: MessageCircle, label: 'Messages', path: '/messages', badge: 1 },
  { icon: User, label: 'Profil', path: '/profile' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/95 backdrop-blur-xl border-t border-border">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className="relative flex flex-col items-center py-2 px-4"
            >
              <div className="relative">
                <Icon
                  size={24}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-[10px] mt-1 transition-colors",
                isActive ? "text-primary font-medium" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
