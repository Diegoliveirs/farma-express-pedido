
import { useState } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddressFormProps {
  onSubmit: (data: { 
    street: string; 
    number: string; 
    neighborhood: string; 
    city: string; 
    deliveryFee: number;
  }) => void;
  onBack: () => void;
}

// Taxas de entrega por bairro (configurável)
const neighborhoodFees: { [key: string]: number } = {
  'Centro': 5.00,
  'Vila Nova': 7.00,
  'Jardim América': 8.00,
  'São João': 6.00,
  'Santa Maria': 9.00,
  'Outros': 10.00
};

const AddressForm = ({ onSubmit, onBack }: AddressFormProps) => {
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);

  const handleNeighborhoodChange = (value: string) => {
    setNeighborhood(value);
    const fee = neighborhoodFees[value] || neighborhoodFees['Outros'];
    setDeliveryFee(fee);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (street.trim() && number.trim() && neighborhood && city.trim()) {
      onSubmit({
        street: street.trim(),
        number: number.trim(),
        neighborhood,
        city: city.trim(),
        deliveryFee
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

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
            Endereço de entrega
          </h1>
          <p className="text-gray-600">
            Informe onde deseja receber seu pedido
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="street" className="text-base font-medium">
              Rua/Avenida
            </Label>
            <Input
              id="street"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Nome da rua ou avenida"
              className="h-12 text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number" className="text-base font-medium">
              Número
            </Label>
            <Input
              id="number"
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Número da casa/apartamento"
              className="h-12 text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="neighborhood" className="text-base font-medium">
              Bairro
            </Label>
            <select
              id="neighborhood"
              value={neighborhood}
              onChange={(e) => handleNeighborhoodChange(e.target.value)}
              className="w-full h-12 text-base border border-input bg-background px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="">Selecione o bairro</option>
              {Object.keys(neighborhoodFees).map((neighborhood) => (
                <option key={neighborhood} value={neighborhood}>
                  {neighborhood}
                </option>
              ))}
            </select>
            {neighborhood && (
              <p className="text-sm text-primary font-medium">
                Taxa de entrega: {formatPrice(deliveryFee)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-base font-medium">
              Cidade
            </Label>
            <Input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Nome da cidade"
              className="h-12 text-base"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary text-white hover:bg-red-700 text-lg font-semibold mt-8"
            disabled={!street.trim() || !number.trim() || !neighborhood || !city.trim()}
          >
            Continuar
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
