import ShippingForm from "../components/Cart/ShippingForm";
import OrderSummary from "../components/Cart/OrderSummary";

const Cart = () => {
  const handlePlaceOrder = () => {
    // Handle place order logic
    console.log("Placing order...");
  };

  return (
    <div className="min-h-screen pt-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="border-r border-gray-200">
            <ShippingForm />
          </div>
          <div>
            <OrderSummary onPlaceOrder={handlePlaceOrder} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
