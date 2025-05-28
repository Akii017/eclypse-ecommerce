import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { addItem } from "../store/cartSlice";
import { productsApi } from "../services/api";
import SizeChart from "./SizeChart";
import { SIZES } from "../constants";

interface ProductData {
  id: string;
  name: string;
  price: number;
  description: string;
  sizes: string[];
  images: string[];
  stock: number;
}

const Product = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsApi.getById("silhouette-no-1");
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    if (!product) {
      alert("Product data not available");
      return;
    }

    try {
      // Update stock in the backend
      await productsApi.updateStock(
        product.id,
        Math.max(0, product.stock - quantity)
      );

      dispatch(
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          size: selectedSize,
          quantity: quantity,
        })
      );

      alert("Added to cart successfully!");
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("There was an error adding the item to cart. Please try again.");
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-white py-20 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-dark text-white py-20 flex items-center justify-center">
        <p>{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-dark text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={product.images[0] || "/product-main.jpg"}
                alt={product.name}
                className="w-full rounded-lg"
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full rounded-lg"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-4xl font-light">{product.name}</h1>
            <p className="text-2xl">
              ₹{product.price.toLocaleString()}{" "}
              <span className="text-sm text-gray-400">
                MRP (incl. all taxes)
              </span>
            </p>

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm">Please select a size</p>
                <button
                  onClick={() => setIsSizeChartOpen(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Size chart
                </button>
              </div>
              <div className="flex gap-4">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border ${
                      selectedSize === size
                        ? "border-primary text-primary"
                        : "border-gray-600 hover:border-white"
                    }`}
                    disabled={product && !product.sizes.includes(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Chart Modal */}
            <SizeChart
              isOpen={isSizeChartOpen}
              onClose={() => setIsSizeChartOpen(false)}
            />

            {/* Quantity Selection */}
            <div className="space-y-4">
              <p className="text-sm">Quantity</p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg border border-gray-600 hover:border-white flex items-center justify-center"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-8 h-8 rounded-lg border border-gray-600 hover:border-white flex items-center justify-center"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              {product.stock < 5 && (
                <p className="text-sm text-red-500">
                  Only {product.stock} items left in stock!
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 py-3 border border-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 py-3 bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? "Out of Stock" : "Buy Now"}
              </button>
            </div>

            {/* Product Description */}
            <div className="text-gray-400">
              <p>{product.description}</p>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4 pt-8">
              <button className="w-full py-4 border-t border-gray-800 text-left flex justify-between items-center">
                <span>Size & Fit</span>
                <span>↓</span>
              </button>
              <button className="w-full py-4 border-t border-gray-800 text-left flex justify-between items-center">
                <span>Delivery & Returns</span>
                <span>↓</span>
              </button>
              <button className="w-full py-4 border-t border-gray-800 text-left flex justify-between items-center">
                <span>How This Was Made</span>
                <span>↓</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Product;
