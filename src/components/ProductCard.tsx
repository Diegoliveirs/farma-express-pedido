
import { Plus, Minus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onProductClick: () => void;
}

const ProductCard = ({ product, quantity, onAdd, onRemove, onProductClick }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Não abrir detalhes se clicar nos botões
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onProductClick();
  };

  return (
    <div 
      className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
      onClick={handleCardClick}
    >
      <div className="flex items-start space-x-3">
        {/* Product Image/Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <Package className="w-8 h-8 text-gray-400" />
          )}
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs text-gray-500 mb-2 line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            
            {/* Add/Remove Controls */}
            {quantity > 0 ? (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={onRemove}
                  size="sm"
                  variant="outline"
                  className="w-8 h-8 p-0 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-semibold text-gray-900 min-w-[20px] text-center">
                  {quantity}
                </span>
                <Button
                  onClick={onAdd}
                  size="sm"
                  className="w-8 h-8 p-0 bg-primary text-white hover:bg-red-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={onAdd}
                size="sm"
                className="bg-primary text-white hover:bg-red-700 px-4"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
