
interface CartItem {
  product: { name: string; price: number };
  quantity: number;
}

export const generateWhatsAppMessage = (items: CartItem[]) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  let message = "🏥 *Pedido Farmácia Express*\n\n";
  
  items.forEach(item => {
    const itemTotal = item.product.price * item.quantity;
    message += `• ${item.product.name} x${item.quantity} — ${formatPrice(itemTotal)}\n`;
  });
  
  message += `\n💰 *Total: ${formatPrice(total)}*\n\n`;
  message += "📍 *Forma de Pagamento:* A combinar\n";
  message += "🚚 *Entrega:* A combinar\n\n";
  message += "Obrigado pelo seu pedido! 😊";
  
  return encodeURIComponent(message);
};

export const sendWhatsAppOrder = (items: CartItem[], phoneNumber: string = "5511999999999") => {
  const message = generateWhatsAppMessage(items);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};
