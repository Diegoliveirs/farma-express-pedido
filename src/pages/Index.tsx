import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import Cart from '@/components/Cart';
import CustomerInfoForm from '@/components/CustomerInfoForm';
import DeliveryOptions from '@/components/DeliveryOptions';
import AddressForm from '@/components/AddressForm';
import OrderSummary from '@/components/OrderSummary';
import SuccessScreen from '@/components/SuccessScreen';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { sendWhatsAppOrder } from '@/utils/whatsapp';
import { Product } from '@/components/ProductCard';

type FlowStep = 'products' | 'cart' | 'customer-info' | 'delivery-options' | 'address' | 'summary' | 'success';

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

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeCategory, setActiveCategory] = useState('medicamentos');
  const [currentStep, setCurrentStep] = useState<FlowStep>('products');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery' | null>(null);
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    getItemQuantity,
    getTotalItems,
    clearCart
  } = useCart();

  const filteredProducts = products.filter(product => product.category === activeCategory);

  const generateOrderNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `${timestamp}${random}`;
  };

  const handleCartCheckout = () => {
    if (items.length === 0) return;
    setCurrentStep('customer-info');
  };

  const handleCustomerInfoSubmit = (data: CustomerInfo) => {
    setCustomerInfo(data);
    setCurrentStep('delivery-options');
  };

  const handlePickupSelect = () => {
    setDeliveryType('pickup');
    setOrderNumber(generateOrderNumber());
    setCurrentStep('summary');
  };

  const handleDeliverySelect = () => {
    setDeliveryType('delivery');
    setCurrentStep('address');
  };

  const handleAddressSubmit = (data: AddressInfo) => {
    setAddressInfo(data);
    setOrderNumber(generateOrderNumber());
    setCurrentStep('summary');
  };

  const handleOrderConfirm = () => {
    if (!customerInfo || !deliveryType) return;

    const orderData = {
      orderNumber,
      customerInfo,
      items,
      deliveryType,
      addressInfo: deliveryType === 'delivery' ? addressInfo : undefined
    };

    sendWhatsAppOrder(orderData);
    setCurrentStep('success');
    clearCart();
  };

  const handleBackToHome = () => {
    setCurrentStep('products');
    setActiveCategory('medicamentos');
    setCustomerInfo(null);
    setDeliveryType(null);
    setAddressInfo(null);
    setOrderNumber('');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleCloseProductDetail = () => {
    setIsProductDetailOpen(false);
    setSelectedProduct(null);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (currentStep === 'customer-info') {
    return (
      <CustomerInfoForm
        onSubmit={handleCustomerInfoSubmit}
        onBack={() => setCurrentStep('cart')}
      />
    );
  }

  if (currentStep === 'delivery-options' && customerInfo) {
    return (
      <DeliveryOptions
        onSelectPickup={handlePickupSelect}
        onSelectDelivery={handleDeliverySelect}
        onBack={() => setCurrentStep('customer-info')}
        customerInfo={customerInfo}
      />
    );
  }

  if (currentStep === 'address') {
    return (
      <AddressForm
        onSubmit={handleAddressSubmit}
        onBack={() => setCurrentStep('delivery-options')}
      />
    );
  }

  if (currentStep === 'summary' && customerInfo && deliveryType) {
    return (
      <OrderSummary
        orderNumber={orderNumber}
        customerInfo={customerInfo}
        items={items}
        deliveryType={deliveryType}
        addressInfo={addressInfo}
        onConfirm={handleOrderConfirm}
        onBack={() => {
          if (deliveryType === 'delivery') {
            setCurrentStep('address');
          } else {
            setCurrentStep('delivery-options');
          }
        }}
      />
    );
  }

  if (currentStep === 'success') {
    return (
      <SuccessScreen
        orderNumber={orderNumber}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setCurrentStep('cart')}
      />
      
      <CategoryTabs 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={getItemQuantity(product.id)}
              onAdd={() => addItem(product)}
              onRemove={() => removeItem(product.id)}
              onProductClick={() => handleProductClick(product)}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </main>

      <Cart
        isOpen={currentStep === 'cart'}
        onClose={() => setCurrentStep('products')}
        items={items}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCartCheckout}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onClose={handleCloseProductDetail}
        quantity={selectedProduct ? getItemQuantity(selectedProduct.id) : 0}
        onAdd={() => selectedProduct && addItem(selectedProduct)}
        onRemove={() => selectedProduct && removeItem(selectedProduct.id)}
      />
    </div>
  );
};

export default Index;
