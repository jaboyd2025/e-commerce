"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import Image from "next/image";
import { ShippingForm } from "@/components/checkout/shipping-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CreditCardForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // Here you would call your backend to create a PaymentIntent and confirm the payment
    // This is a placeholder for demo purposes
    setTimeout(() => {
      setLoading(false);
      alert("Payment successful! (implement real logic)");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <label className="block mb-2 font-medium">Credit Card</label>
        <div className="border rounded p-2 bg-white">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [showPayment, setShowPayment] = useState(false);
  const handleShippingSubmit = (data: any) => {
    setShowPayment(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="flex items-center py-4 gap-4">
                <div className="relative h-16 w-16">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </div>
                </div>
                <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between items-center mt-6 text-lg font-bold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="mb-8">
        {showPayment ? (
          <Elements stripe={stripePromise}>
            <CreditCardForm amount={total} />
          </Elements>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <ShippingForm onSubmit={handleShippingSubmit} />
          </>
        )}
      </div>
    </div>
  );
} 