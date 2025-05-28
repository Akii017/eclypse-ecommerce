import axios from 'axios';
import { CartItem } from '../store/cartSlice';

const API_URL = "https://eclypse-ecommerce-backend.onrender.com/api" ;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface OrderData {
  items: CartItem[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    streetAddress: string;
    aptNumber: string;
    state: string;
    zip: string;
  };
  totalAmount: number;
}

export const productsApi = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  updateStock: (id: string, stock: number) => api.patch(`/products/${id}/stock`, { stock }),
};

export const ordersApi = {
  create: (orderData: OrderData) => api.post('/orders', orderData),
  getById: (id: string) => api.get(`/orders/${id}`),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }),
};

export default api; 