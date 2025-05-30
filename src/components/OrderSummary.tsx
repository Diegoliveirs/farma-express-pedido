
import { CheckCircle2, MapPin, Store, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/components/ProductCard';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  phone: string;
}

interface AddressInfo {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  deliveryFee: number;
}

interface OrderSummaryProps {
  orderNumber: string;
  customerInfo: CustomerInfo;
  items: CartItem[];
  deliveryType: 'pickup' | 'delivery';
  addressInfo?: AddressInfo;
  onConfirm: () => void;
  onBack: () => void;
}

const OrderSummary = ({ 
  orderNumber,
  customerInfo, 
  items, 
  deliveryType, 
  addressInfo, 
  onConfirm, 
  onBack 
}: OrderSummaryProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = addressInfo?.deliveryFee || 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="text-primary font-medium mb-4"
          >
            ← Voltar
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Resumo do Pedido
          </h1>
          <p className="text-gray-600">
            Pedido #{orderNumber}
          </p>
        </div>

        <div className="space-y-6 pb-24">
          {/* Dados do Cliente */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Dados do Cliente
            </h3>
            <div className="space-y-1">
              <p className="text-gray-700">{customerInfo.name}</p>
              <p className="text-gray-600 flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {customerInfo.phone}
              </p>
            </div>
          </div>

          {/* Forma de Recebimento */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              {deliveryType === 'pickup' ? (
                <Store className="w-5 h-5 mr-2" />
              ) : (
                <MapPin className="w-5 h-5 mr-2" />
              )}
              Forma de Recebimento
            </h3>
            {deliveryType === 'pickup' ? (
              <p className="text-gray-700">Retirada na Loja</p>
            ) : (
              <div className="space-y-1">
                <p className="text-gray-700">Delivery</p>
                <p className="text-gray-600">
                  {addressInfo?.street}, {addressInfo?.number}
                </p>
                <p className="text-gray-600">
                  {addressInfo?.neighborhood} - {addressInfo?.city}
                </p>
              </div>
            )}
          </div>

          {/* Itens do Pedido */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Itens do Pedido
            </h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      {formatPrice(item.product.price)} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Valores */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              {deliveryType === 'delivery' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de entrega</span>
                  <span className="text-gray-900">{formatPrice(deliveryFee)}</span>
                </div>
              )}
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Fixo */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <Button
            onClick={onConfirm}
            className="w-full h-12 bg-secondary text-gray-900 hover:bg-yellow-400 text-lg font-semibold"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Confirmar Pedido
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
