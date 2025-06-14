
import { CheckCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SuccessScreenProps {
  orderNumber: string;
  onBackToHome: () => void;
}

const SuccessScreen = ({ orderNumber, onBackToHome }: SuccessScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Pedido Enviado! 🎉
        </h1>
        
        <p className="text-gray-600 mb-2 text-lg">
          Pedido #{orderNumber}
        </p>
        
        <p className="text-gray-600 mb-8 max-w-sm">
          Seu pedido foi enviado para o WhatsApp da farmácia. 
          Entraremos em contato em breve para confirmação!
        </p>
        
        <div className="w-full max-w-sm space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <MessageCircle className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">WhatsApp</span>
            </div>
            <p className="text-sm text-blue-700">
              Verifique seu WhatsApp! Uma conversa foi iniciada automaticamente 
              com todos os dados do seu pedido.
            </p>
          </div>
          
          <Button
            onClick={onBackToHome}
            className="w-full h-12 bg-primary text-white hover:bg-red-700 text-lg font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar ao Início
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 mt-8">
          Obrigado por escolher a Farmácia Amiga! 💚
        </p>
      </div>
    </div>
  );
};

export default SuccessScreen;
