import express, { Request, Response } from 'express';
import cors from 'cors';
import { Product, Category, User, LoginCredentials, RegisterData, CartItem, WishlistItem } from './types';
import { protect } from './middleware/auth';
import { generateToken, hashPassword, comparePassword } from './utils/auth';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data
const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    category: 'Electronics',
  },
  {
    id: 3,
    name: 'Running Shoes',
    description: 'Comfortable running shoes for athletes',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'Sports',
  },
];

const categories: Category[] = [
  {
    id: 1,
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
  },
  {
    id: 2,
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
  },
  {
    id: 3,
    name: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
  },
];

// In-memory storage for users, cart items, and wishlist items
let users: User[] = [];
let cartItems: CartItem[] = [];
let wishlistItems: WishlistItem[] = [];

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password }: RegisterData = req.body;

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const user: User = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    users.push(user);

    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);

    res.status(201).json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password }: LoginCredentials = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);

    res.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected routes
app.get('/api/user/profile', protect, (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const userId = req.user.id;
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Cart routes
app.get('/api/cart', protect, (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const userId = req.user.id;
  const userCart = cartItems.filter(item => item.userId === userId);
  const cartWithProducts = userCart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId),
  }));
  res.json(cartWithProducts);
});

app.post('/api/cart', protect, (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const { productId, quantity } = req.body;
  const userId = req.user.id;
  const existingItem = cartItems.find(
    item => item.userId === userId && item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({
      id: cartItems.length + 1,
      userId,
      productId,
      quantity,
    });
  }

  res.status(201).json({ message: 'Item added to cart' });
});

// Wishlist routes
app.get('/api/wishlist', protect, (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const userId = req.user.id;
  const userWishlist = wishlistItems.filter(item => item.userId === userId);
  const wishlistWithProducts = userWishlist.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId),
  }));
  res.json(wishlistWithProducts);
});

app.post('/api/wishlist', protect, (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const { productId } = req.body;
  const userId = req.user.id;
  const existingItem = wishlistItems.find(
    item => item.userId === userId && item.productId === productId
  );

  if (!existingItem) {
    wishlistItems.push({
      id: wishlistItems.length + 1,
      userId,
      productId,
    });
  }

  res.status(201).json({ message: 'Item added to wishlist' });
});

// Existing routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/categories/:id', (req, res) => {
  const category = categories.find((c) => c.id === parseInt(req.params.id));
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
});

app.get('/api/categories/:id/products', (req, res) => {
  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === categories.find((c) => c.id === parseInt(req.params.id))?.name.toLowerCase()
  );
  res.json(categoryProducts);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 