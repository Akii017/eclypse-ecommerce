const mongoose = require('mongoose');
const Product = require('../models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

const sampleProducts = [
  {
    id: 'silhouette-no-1',
    name: 'Silhouette No. 1 – Sunshine Yellow',
    price: 7999,
    description: 'A vibrant sunshine yellow athleisure set that makes a bold statement. Features a cropped hoodie with relaxed shoulders and oversized sleeves, paired with high-waisted joggers. Crafted from premium cotton blend fabric for ultimate comfort. Perfect for both style and sporty activities.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80'
    ],
    stock: 10
  },
  {
    id: 'silhouette-no-2',
    name: 'Silhouette No. 2 – Classic Black',
    price: 8999,
    description: 'A masterpiece of formal elegance. This classic black suit features impeccable tailoring with a modern slim fit. Adorned with a crisp white collar shirt, matching silk tie, white pocket square, and a refined silver lapel pin. Crafted from premium wool blend with a subtle sheen that speaks of luxury.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=1000&fit=clip',
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=400&fit=clip',
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=400&fit=clip',
      'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=400&fit=clip'
    ],
    stock: 8
  },
  {
    id: 'silhouette-no-3',
    name: 'Silhouette No. 3 – Emerald',
    price: 9499,
    description: 'A striking emerald green suit set with contemporary details. Features a perfectly fitted blazer and tailored pants.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=1000&fit=clip',
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=400&fit=clip',
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=400&fit=clip',
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=400&fit=clip'
    ],
    stock: 12
  },
  {
    id: 'silhouette-no-4',
    name: 'Silhouette No. 4 – Denim Dream',
    price: 5999,
    description: 'A charming denim shirt dress that combines casual comfort with feminine flair. Features a classic collar, practical chest pockets, and full button-down front. The gathered waist creates a flattering A-line silhouette with a playful midi length. Made from soft, medium-wash denim.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1000&fit=clip',
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=400&fit=clip',
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=400&fit=clip',
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=400&fit=clip'
    ],
    stock: 5
  }
];

const initDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');

    console.log('Database initialization completed');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initDb(); 