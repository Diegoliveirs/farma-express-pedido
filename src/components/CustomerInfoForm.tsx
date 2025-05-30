
import { useState } from 'react';
import { User, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CustomerInfoFormProps {
  onSubmit: (data: { name: string; phone: string }) => void;
  onBack: () => void;
}

const CustomerInfoForm = ({ onSubmit, onBack }: CustomerInfoFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      onSubmit({ name: name.trim(), phone: phone.trim() });
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="text-primary font-medium mb-4"
          >
            ← Voltar ao carrinho
          </button>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Seus dados
          </h1>
          <p className="text-gray-600">
            Precisamos dessas informações para finalizar seu pedido
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium">
              Nome completo
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome completo"
                className="pl-12 h-12 text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-medium">
              Telefone
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="(11) 99999-9999"
                className="pl-12 h-12 text-base"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary text-white hover:bg-red-700 text-lg font-semibold mt-8"
            disabled={!name.trim() || !phone.trim()}
          >
            Continuar
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CustomerInfoForm;
