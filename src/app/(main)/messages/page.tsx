'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Search } from 'lucide-react';
import { messages } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function Messages() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-8 pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="font-display font-bold text-3xl text-foreground mb-6">
          Messages
        </h1>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher une conversation..."
            className="pl-12"
          />
        </div>

        <div className="space-y-2">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl transition-colors cursor-pointer",
                message.read 
                  ? "glass-elevated hover:bg-muted/50" 
                  : "bg-primary/10 border border-primary/20 hover:bg-primary/15"
              )}
            >
              <div className="relative">
                <img
                  src={message.senderAvatar}
                  alt={message.senderName}
                  className="w-14 h-14 rounded-full object-cover"
                />
                {!message.read && (
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={cn(
                    "text-foreground truncate",
                    !message.read && "font-semibold"
                  )}>
                    {message.senderName}
                  </span>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatDate(message.createdAt)}
                  </span>
                </div>
                <p className={cn(
                  "text-sm truncate",
                  message.read ? "text-muted-foreground" : "text-foreground"
                )}>
                  {message.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {messages.length === 0 && (
          <div className="text-center py-16 glass-elevated rounded-2xl">
            <MessageCircle size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucun message</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
