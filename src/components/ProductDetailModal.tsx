
import { X, Plus, Minus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from './ProductCard';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

const ProductDetailModal = ({ 
  product, 
  isOpen, 
  onClose, 
  quantity, 
  onAdd, 
  onRemove 
}: ProductDetailModalProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">
            Detalhes do Produto
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Product Content */}
        <div className="p-6 space-y-6">
          {/* Product Image/Icon */}
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <Package className="w-16 h-16 text-gray-400" />
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="text-center space-y-3">
            <h3 className="text-xl font-bold text-gray-900">
              {product.name}
            </h3>
            
            {product.description && (
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="bg-primary/10 rounded-xl p-4">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Preço por unidade
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <h4 className="font-semibold text-gray-900 mb-3">Informações:</h4>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Categoria:</span>
              <span className="font-medium text-gray-900 capitalize">
                {product.category === 'medicamentos' && '💊 Medicamentos'}
                {product.category === 'vitaminas' && '🌿 Vitaminas'}
                {product.category === 'cuidado' && '✨ Cuidado Pessoal'}
                {product.category === 'higiene' && '🧼 Higiene'}
                {product.category === 'bebe' && '👶 Bebê'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Disponibilidade:</span>
              <span className="font-medium text-green-600">Em estoque</span>
            </div>
          </div>
        </div>

        {/* Footer - Add to Cart */}
        <div className="border-t border-gray-100 p-4 space-y-4">
          {quantity > 0 ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  onClick={onRemove}
                  size="sm"
                  variant="outline"
                  className="w-10 h-10 p-0 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold text-gray-900 min-w-[40px] text-center">
                  {quantity}
                </span>
                <Button
                  onClick={onAdd}
                  size="sm"
                  className="w-10 h-10 p-0 bg-primary text-white hover:bg-red-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-600">Subtotal:</p>
                <p className="text-xl font-bold text-primary">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
            </div>
          ) : (
            <Button
              onClick={onAdd}
              className="w-full h-12 bg-primary text-white hover:bg-red-700 text-lg font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar ao Carrinho
            </Button>
          )}
          
          <p className="text-xs text-gray-500 text-center">
            Toque fora da tela para fechar
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
