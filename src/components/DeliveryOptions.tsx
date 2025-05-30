
import { Store, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeliveryOptionsProps {
  onSelectPickup: () => void;
  onSelectDelivery: () => void;
  onBack: () => void;
  customerInfo: { name: string; phone: string };
}

const DeliveryOptions = ({ onSelectPickup, onSelectDelivery, onBack, customerInfo }: DeliveryOptionsProps) => {
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
            Como deseja receber?
          </h1>
          <p className="text-gray-600">
            Olá, {customerInfo.name}! Escolha a forma de recebimento:
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={onSelectPickup}
            className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-red-50 transition-all duration-200 active:scale-98"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Store className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-900">
                  Retirada na Loja
                </h3>
                <p className="text-gray-600">
                  Retire seu pedido diretamente na farmácia
                </p>
                <p className="text-sm text-green-600 font-medium mt-1">
                  Grátis
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={onSelectDelivery}
            className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-red-50 transition-all duration-200 active:scale-98"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-lg font-semibold text-gray-900">
                  Delivery
                </h3>
                <p className="text-gray-600">
                  Receba em casa com rapidez e segurança
                </p>
                <p className="text-sm text-primary font-medium mt-1">
                  Taxa de entrega a calcular
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;
