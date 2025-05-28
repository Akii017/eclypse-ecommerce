import { useState, useEffect } from 'react';
import axios from 'axios';
import { Product } from '../types';
import { useAuth } from './useAuth';

interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  product: Product;
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:3000/api/wishlist');
      setItems(data);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to fetch wishlist');
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: number) => {
    try {
      await axios.post('http://localhost:3000/api/wishlist', { productId });
      await fetchWishlist();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to add item to wishlist');
      throw error;
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/wishlist/${productId}`);
      await fetchWishlist();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to remove item from wishlist');
      throw error;
    }
  };

  const isInWishlist = (productId: number) => {
    return items.some(item => item.productId === productId);
  };

  return {
    items,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
} 