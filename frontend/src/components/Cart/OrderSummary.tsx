import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { clearCart } from "../../store/cartSlice";
import { ordersApi } from "../../services/api";

const TAX_RATE = 0.18; // 18% tax
const SHIPPING_COST = 200;

const OrderSummary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, shippingAddress } = useAppSelector((state) => state.cart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax + SHIPPING_COST;

  const handlePlaceOrder = async () => {
    if (!shippingAddress) {
      alert("Please add a shipping address");
      return;
    }

    setIsLoading(true);
    try {
      // Format items to match backend expectations
      const formattedItems = items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        size: item.size,
        quantity: item.quantity,
      }));

      await ordersApi.create({
        items: formattedItems,
        shippingAddress,
        totalAmount: total,
      });

      dispatch(clearCart());
      navigate("/order-success");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="p-6 bg-gray-50 text-center">
        <p className="text-gray-600">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-800"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50">
      <div className="text-sm text-gray-600 mb-8">
        By placing your order, you agree to our company{" "}
        <a href="/privacy" className="text-blue-600 hover:underline">
          Privacy policy
        </a>{" "}
        and{" "}
        <a href="/terms" className="text-blue-600 hover:underline">
          Conditions of use
        </a>
        .
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-medium text-black">Order Summary</h3>

        <div className="space-y-3 text-black">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex justify-between"
            >
              <span>
                {item.name} ({item.size}) x{item.quantity}
              </span>
              <span>₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between">
            <span>Shipping and handling:</span>
            <span>₹{SHIPPING_COST}</span>
          </div>
          <div className="flex justify-between">
            <span>Before tax:</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax Collected:</span>
            <span>₹{tax.toLocaleString()}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between font-medium text-black">
            <span>Order Total:</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={!shippingAddress || isLoading}
          className="w-full py-3 mt-4 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
