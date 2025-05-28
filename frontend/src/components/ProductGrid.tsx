import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { addItem } from "../store/cartSlice";
import { productsApi } from "../services/api";
import { getImageUrl } from "../utils/imageUtils";
import SizeChart from "./SizeChart";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  sizes: string[];
  images: string[];
  stock: number;
}

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>(
    {}
  );
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi.getAll();
        setProducts(response.data);
        // Initialize quantities for all products
        const initialQuantities = response.data.reduce(
          (acc: any, product: Product) => {
            acc[product.id] = 1;
            return acc;
          },
          {}
        );
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return prev;

      const newQuantity = Math.max(
        1,
        Math.min(product.stock, prev[productId] + delta)
      );
      return {
        ...prev,
        [productId]: newQuantity,
      };
    });
  };

  const handleAddToCart = async (product: Product) => {
    if (!selectedSizes[product.id]) {
      alert("Please select a size");
      return;
    }

    try {
      // Update stock in the backend
      const newStock = product.stock - quantities[product.id];
      await productsApi.updateStock(product.id, Math.max(0, newStock));

      dispatch(
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          size: selectedSizes[product.id],
          quantity: quantities[product.id],
        })
      );

      // Update local state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, stock: newStock } : p
        )
      );

      alert("Added to cart successfully!");
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("There was an error adding the item to cart. Please try again.");
    }
  };

  const handleBuyNow = (product: Product) => {
    handleAddToCart(product);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark text-white py-20 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark text-white py-20 flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-dark text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Product Images */}
              <div className="space-y-2">
                {/* Main Image Container */}
                <div className="relative aspect-[4/5] w-full bg-[#2a2a2a] rounded-lg overflow-hidden">
                  <img
                    src={getImageUrl(product.images[0])}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite loop
                      target.src = "/placeholder.jpg"; // You can add a placeholder image in your public folder
                    }}
                  />
                </div>
                {/* Thumbnail Images */}
                <div className="grid grid-cols-3 gap-2 h-24">
                  {product.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="relative bg-[#2a2a2a] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "/placeholder.jpg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6 pt-4">
                <div>
                  <h2 className="text-2xl font-light mb-2">{product.name}</h2>
                  <p className="text-xl">
                    ₹{product.price.toLocaleString()}{" "}
                    <span className="text-sm text-gray-400">
                      MRP (incl. all taxes)
                    </span>
                  </p>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Size Selection */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">Select Size</p>
                    <button
                      onClick={() => setIsSizeChartOpen(true)}
                      className="text-sm text-primary hover:underline"
                    >
                      Size chart
                    </button>
                  </div>
                  <div className="flex gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(product.id, size)}
                        className={`w-[60px] h-[60px] rounded-lg border ${
                          selectedSizes[product.id] === size
                            ? "border-primary text-primary"
                            : "border-gray-600 hover:border-white"
                        } flex items-center justify-center text-sm font-medium`}
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

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    className="w-8 h-8 rounded-lg border border-gray-600 hover:border-white flex items-center justify-center"
                  >
                    -
                  </button>
                  <span>{quantities[product.id]}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="w-8 h-8 rounded-lg border border-gray-600 hover:border-white flex items-center justify-center"
                    disabled={quantities[product.id] >= product.stock}
                  >
                    +
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="flex-1 h-[52px] border border-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                  <button
                    onClick={() => handleBuyNow(product)}
                    disabled={product.stock === 0}
                    className="flex-1 h-[52px] bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {product.stock === 0 ? "Out of Stock" : "Buy Now"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
