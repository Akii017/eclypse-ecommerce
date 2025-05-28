//import { useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import { Product, Category } from "../types";

// Dummy data for demonstration
const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health tracking",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Running Shoes",
    description: "Comfortable running shoes for athletes",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Sports",
  },
];

const dummyCategories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
  },
  {
    id: 3,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
  },
];

export default function HomePage() {
  //const [cart, setCart] = useState<Product[]>([]);

  //const handleAddToCart = (product: Product) => {
  //  setCart([...cart, product]);
    // In a real app, you would also update the cart in a global state management solution
  //};

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-primary to-secondary">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container h-full flex flex-col justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to EShop</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Discover amazing products at competitive prices. Shop with
            confidence and enjoy our hassle-free shopping experience.
          </p>
          <button className="btn btn-primary w-fit">Shop Now</button>
        </div>
      </section>

      {/* Featured Categories */}
      <section>
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                //onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-dark py-16">
        <div className="container text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-8 text-gray-300">
            Stay updated with our latest products and exclusive offers.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-dark"
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
