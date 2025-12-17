'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, Image, Video, Lock, Globe, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function CreatePost() {
  const [caption, setCaption] = useState('');
  const [visibility, setVisibility] = useState<'free' | 'subscribers'>('free');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
        setMediaType(file.type.startsWith('video') ? 'video' : 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mediaPreview) {
      toast.error('Veuillez ajouter une image ou une vidéo');
      return;
    }

    setIsLoading(true);
    
    // TODO: Implement actual post creation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Post publié avec succès!');
    router.push('/creator/dashboard');
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft size={24} className="text-foreground" />
          </button>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Nouveau Post
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Media Upload */}
          <div className="glass-elevated rounded-2xl p-6">
            <label className="text-sm font-medium text-foreground mb-4 block">
              Média
            </label>
            
            {!mediaPreview ? (
              <label className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Upload size={32} className="text-primary" />
                  </div>
                  <p className="text-foreground font-medium mb-2">
                    Glissez ou cliquez pour ajouter
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Images ou vidéos jusqu'à 50MB
                  </p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Image size={16} /> Images
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Video size={16} /> Vidéos
                    </span>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <div className="relative h-80 rounded-xl overflow-hidden">
                  {mediaType === 'image' ? (
                    <img
                      src={mediaPreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={mediaPreview}
                      className="w-full h-full object-cover"
                      controls
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setMediaPreview(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                >
                  <X size={20} className="text-foreground" />
                </button>
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="glass-elevated rounded-2xl p-6">
            <label className="text-sm font-medium text-foreground mb-4 block">
              Légende
            </label>
            <textarea
              placeholder="Décrivez votre post..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              className="flex w-full rounded-xl border border-input bg-secondary/50 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
            />
          </div>

          {/* Visibility */}
          <div className="glass-elevated rounded-2xl p-6">
            <label className="text-sm font-medium text-foreground mb-4 block">
              Visibilité
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setVisibility('free')}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                  visibility === 'free'
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  visibility === 'free' ? "bg-primary/20" : "bg-muted"
                )}>
                  <Globe size={20} className={visibility === 'free' ? "text-primary" : "text-muted-foreground"} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Gratuit</p>
                  <p className="text-xs text-muted-foreground">Visible par tous</p>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setVisibility('subscribers')}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                  visibility === 'subscribers'
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  visibility === 'subscribers' ? "bg-primary/20" : "bg-muted"
                )}>
                  <Lock size={20} className={visibility === 'subscribers' ? "text-primary" : "text-muted-foreground"} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Abonnés uniquement</p>
                  <p className="text-xs text-muted-foreground">Contenu exclusif</p>
                </div>
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Publication...' : 'Publier'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
