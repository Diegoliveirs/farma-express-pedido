
import { CheckCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToProducts: () => void;
}

const ConfirmationModal = ({ isOpen, onClose, onBackToProducts }: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Pedido Enviado!
        </h2>
        
        <p className="text-gray-600 mb-6">
          Seu pedido foi enviado para o WhatsApp da farmácia. 
          Entraremos em contato em breve para confirmar!
        </p>
        
        <div className="space-y-3">
          <Button
            onClick={onBackToProducts}
            className="w-full bg-primary text-white hover:bg-red-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
          
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            Fechar
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          Obrigado por escolher a Farmácia Express! 💚
        </p>
      </div>
    </div>
  );
};

export default ConfirmationModal;
