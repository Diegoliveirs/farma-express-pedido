
import { useState, useEffect } from 'react';
import { Plus, Heart } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-primary to-red-700 flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center animate-fade-in">
        {/* Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse-scale">
            <Plus className="w-12 h-12 text-primary" strokeWidth={3} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" fill="currentColor" />
          </div>
        </div>
        
        {/* Nome */}
        <h1 className="text-3xl font-bold text-white mb-2">
          Farmácia Amiga
        </h1>
        <p className="text-white/90 text-lg mb-8">
          Seus medicamentos na palma da mão
        </p>
        
        {/* Loading indicator */}
        <div className="w-16 h-1 bg-white/30 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-secondary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
