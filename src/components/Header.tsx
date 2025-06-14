
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Farmácia Amiga</h1>
              <p className="text-xs text-gray-500">Entrega rápida</p>
            </div>
          </div>
          
          {/* Cart Button */}
          <Button
            onClick={onCartClick}
            variant="outline"
            size="sm"
            className="relative border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-gray-900 text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border-2 border-white">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
