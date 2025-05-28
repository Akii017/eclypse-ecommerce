const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

//const initDb = require('./scripts/initDb'); // Initialize database with sample data
//initDb(); // Seed database on startup

const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://eclypse-ecommerce-one.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

app.use(express.json());

// Serve static files from the public directory
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Routes
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 

