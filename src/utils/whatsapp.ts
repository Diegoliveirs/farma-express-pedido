
interface CartItem {
  product: { name: string; price: number };
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

interface OrderData {
  orderNumber: string;
  customerInfo: CustomerInfo;
  items: CartItem[];
  deliveryType: 'pickup' | 'delivery';
  addressInfo?: AddressInfo;
}

export const generateWhatsAppMessage = (orderData: OrderData) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const subtotal = orderData.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = orderData.addressInfo?.deliveryFee || 0;
  const total = subtotal + deliveryFee;
  
  let message = "🏥 *NOVO PEDIDO - Farmácia Amiga*\n\n";
  
  // Número do pedido
  message += `📋 *Pedido:* #${orderData.orderNumber}\n\n`;
  
  // Dados do cliente
  message += `👤 *Cliente:*\n`;
  message += `• Nome: ${orderData.customerInfo.name}\n`;
  message += `• Telefone: ${orderData.customerInfo.phone}\n\n`;
  
  // Forma de recebimento
  message += `📍 *Recebimento:*\n`;
  if (orderData.deliveryType === 'pickup') {
    message += `• Retirada na Loja\n\n`;
  } else {
    message += `• Delivery\n`;
    message += `• Endereço: ${orderData.addressInfo?.street}, ${orderData.addressInfo?.number}\n`;
    message += `• Bairro: ${orderData.addressInfo?.neighborhood}\n`;
    message += `• Cidade: ${orderData.addressInfo?.city}\n`;
    message += `• Taxa de entrega: ${formatPrice(deliveryFee)}\n\n`;
  }
  
  // Itens do pedido
  message += `🛒 *Itens do Pedido:*\n`;
  orderData.items.forEach(item => {
    const itemTotal = item.product.price * item.quantity;
    message += `• ${item.product.name} x${item.quantity} — ${formatPrice(itemTotal)}\n`;
  });
  
  // Valores
  message += `\n💰 *Valores:*\n`;
  message += `• Subtotal: ${formatPrice(subtotal)}\n`;
  if (orderData.deliveryType === 'delivery') {
    message += `• Taxa de entrega: ${formatPrice(deliveryFee)}\n`;
  }
  message += `• *Total: ${formatPrice(total)}*\n\n`;
  
  message += `💳 *Forma de Pagamento:* A combinar\n`;
  message += `⏰ *Previsão:* A combinar\n\n`;
  message += "Obrigado pelo seu pedido! 😊";
  
  return encodeURIComponent(message);
};

export const sendWhatsAppOrder = (orderData: OrderData, phoneNumber: string = "5511999999999") => {
  const message = generateWhatsAppMessage(orderData);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};
