import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Product } from '../types/index';
import { useAuth } from './useAuth';

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: Product;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:3000/api/cart');
      setItems(data);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    try {
      await axios.post('http://localhost:3000/api/cart', { productId, quantity });
      await fetchCart();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to add item to cart');
      throw error;
    }
  };

  const removeFromCart = async (itemId: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${itemId}`);
      await fetchCart();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to remove item from cart');
      throw error;
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      await axios.put(`http://localhost:3000/api/cart/${itemId}`, { quantity });
      await fetchCart();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update quantity');
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:3000/api/cart');
      setItems([]);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to clear cart');
      throw error;
    }
  };

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return {
    items,
    loading,
    error,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
} 