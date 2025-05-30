
import { useState } from 'react';
import { Product } from '@/components/ProductCard';

interface CartItem {
  product: Product;
  quantity: number;
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      
      return prevItems.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const getItemQuantity = (productId: string) => {
    const item = items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    getItemQuantity,
    getTotalItems,
    clearCart
  };
};
