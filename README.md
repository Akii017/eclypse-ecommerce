# Eclypse E-commerce

A modern e-commerce platform built with React, TypeScript, and Node.js.

## Project Requirements

### Objective

Recreate the basic e-commerce webpage using React, TailwindCSS, TypeScript, and NodeJS to assess coding ability.

### Scope

- **Frontend**: Implemented UI using React, TailwindCSS, and TypeScript
- **Backend**: Set up basic NodeJS server with dummy data endpoints
- **Focus**: Recreated design accurately with functional components, basic state management, and responsive layout

### Deliverables Achieved

✅ Functional webpage with frontend and backend structure
✅ Clean, documented code in GitHub repository

## Features

### Core Features

- Modern, responsive UI with TailwindCSS
- TypeScript for type safety
- Product catalog with filtering
- Shopping cart management
- User authentication
- Responsive design for all devices

### Additional Features

- Interactive size chart with UK/US measurements
- Detailed product views with multiple images
- Real-time stock management
- Quantity selection for products
- Dynamic cart updates
- Smooth animations using Framer Motion
- Mobile-responsive navigation
- Product thumbnails gallery
- Comprehensive size guide with measurements in inches and centimeters

## Tech Stack

- Frontend:

  - React
  - TypeScript
  - TailwindCSS
  - Vite
  - React Router
  - Framer Motion
  - Headless UI for accessible components

- Backend:
  - Node.js
  - Express
  - MongoDB
  - TypeScript

## Getting Started

1. Clone the repository:

```bash
git clone <your-repository-url>
cd eclypse-ecommerce
```

2. Install dependencies:

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Start the development servers:

```bash
# Start frontend (in frontend directory)
npm run dev

# Start backend (in backend directory)
npm run dev
```

4. Open http://localhost:5173 in your browser

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Project Structure

```
eclypse-ecommerce/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Cart/       # Cart related components
│   │   │   └── SizeChart   # Size chart component
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # State management
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── backend/
    ├── routes/             # API routes
    ├── models/             # Data models
    ├── scripts/            # Database scripts
    └── src/               # TypeScript source files
```

## Key Features Implementation

### Size Chart

- Interactive size chart with UK/US sizing
- Measurements in both inches and centimeters
- Detailed measurement instructions
- Modal-based display for better UX

### Product Management

- Dynamic stock tracking
- Multiple product images
- Detailed product descriptions
- Size selection with validation

### Shopping Cart

- Real-time cart updates
- Quantity adjustment
- Size-specific product selection
- Stock validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
