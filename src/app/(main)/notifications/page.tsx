'use client';

import { motion } from 'framer-motion';
import { Bell, Heart, MessageCircle, Users, Star } from 'lucide-react';
import { notifications } from '@/data/mockData';
import { cn } from '@/lib/utils';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like':
      return Heart;
    case 'comment':
      return MessageCircle;
    case 'follow':
      return Users;
    case 'subscription':
      return Star;
    default:
      return Bell;
  }
};

export default function Notifications() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'À l\'instant';
    if (hours < 24) return `Il y a ${hours}h`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-8 pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="font-display font-bold text-3xl text-foreground mb-8">
          Notifications
        </h1>

        <div className="space-y-3">
          {notifications.map((notification, index) => {
            const Icon = getNotificationIcon(notification.type);
            
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-xl transition-colors cursor-pointer",
                  notification.read 
                    ? "glass-elevated hover:bg-muted/50" 
                    : "bg-primary/10 border border-primary/20 hover:bg-primary/15"
                )}
              >
                {notification.avatar ? (
                  <img
                    src={notification.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon size={24} className="text-primary" />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-foreground",
                    !notification.read && "font-medium"
                  )}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(notification.createdAt)}
                  </p>
                </div>

                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                )}
              </motion.div>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-16 glass-elevated rounded-2xl">
            <Bell size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucune notification</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
