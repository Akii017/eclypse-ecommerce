import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setShippingAddress } from "../../store/cartSlice";

interface ShippingFormData {
  firstName: string;
  lastName: string;
  streetAddress: string;
  aptNumber: string;
  state: string;
  zip: string;
}

const ShippingForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const savedAddress = useAppSelector((state) => state.cart.shippingAddress);

  const [formData, setFormData] = useState<ShippingFormData>(
    savedAddress || {
      firstName: "",
      lastName: "",
      streetAddress: "",
      aptNumber: "",
      state: "",
      zip: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setShippingAddress(formData));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.streetAddress &&
      formData.state &&
      formData.zip
    );
  };

  return (
    <div className="p-6 bg-white">
      <div className="flex items-center mb-6">
        <Link to="/" className="mr-4 p-2 bg-[#1A1A1A] rounded-lg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19l-7-7 7-7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h2 className="text-xl font-medium text-black">Shipping Address</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-2 text-sm text-red-500">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span>Anonymous</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center mb-6">
          <div className="w-4 h-4 rounded-full border-2 border-black mr-2"></div>
          <span className="text-sm text-black">Add New Address</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-full px-4 py-3 bg-white text-black border-2 border-[#1A1A1A] placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-full px-4 py-3 bg-white text-black border-2 border-[#1A1A1A] placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div>
          <input
            type="text"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="Street Address"
            required
            className="w-full px-4 py-3 bg-white text-black border-2 border-[#1A1A1A] placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              name="aptNumber"
              value={formData.aptNumber}
              onChange={handleChange}
              placeholder="Apt Number"
              className="w-full px-4 py-3 bg-white text-black border-2 border-[#1A1A1A] placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
              className="w-full px-4 py-3 bg-white text-black border-2 border-[#1A1A1A] placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Zip"
              required
              pattern="[0-9]{5,6}"
              className="w-full px-4 py-3 bg-white text-black border-2 border-[#1A1A1A] placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 text-sm bg-white text-black border border-gray-300 rounded-lg hover:border-black"
          >
            cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid()}
            className="px-6 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Save This Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
