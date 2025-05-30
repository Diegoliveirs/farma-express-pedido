
import { X, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from './ProductCard';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, onCheckout }: CartProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-gray-900">
              Meu Carrinho ({totalItems})
            </h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Seu carrinho está vazio</p>
              <p className="text-sm text-gray-400">Adicione produtos para fazer seu pedido</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-primary font-semibold">
                    {formatPrice(item.product.price)}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    size="sm"
                    variant="outline"
                    className="w-8 h-8 p-0 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="font-semibold text-gray-900 min-w-[24px] text-center">
                    {item.quantity}
                  </span>
                  <Button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    size="sm"
                    className="w-8 h-8 p-0 bg-primary text-white hover:bg-red-700"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(total)}
              </span>
            </div>
            
            <Button
              onClick={onCheckout}
              className="w-full bg-secondary text-gray-900 hover:bg-yellow-400 h-12 text-lg font-semibold"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Finalizar no WhatsApp
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Seu pedido será enviado via WhatsApp para confirmação
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
