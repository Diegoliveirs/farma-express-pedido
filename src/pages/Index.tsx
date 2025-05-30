
import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { sendWhatsAppOrder } from '@/utils/whatsapp';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeCategory, setActiveCategory] = useState('medicamentos');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
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

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    sendWhatsAppOrder(items);
    setIsCartOpen(false);
    setShowConfirmation(true);
    clearCart();
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const handleBackToProducts = () => {
    setShowConfirmation(false);
    setActiveCategory('medicamentos');
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemsCount={getTotalItems()} 
        onCartClick={() => setIsCartOpen(true)}
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
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        onBackToProducts={handleBackToProducts}
      />
    </div>
  );
};

export default Index;
