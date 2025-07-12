import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#1e293b", // Tailwind 'text-slate-800'
      fontSize: "16px",
      fontFamily: "Inter, sans-serif",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#94a3b8", // Tailwind 'text-slate-400'
      },
      padding: "12px 14px",
    },
    invalid: {
      color: "#ef4444", // Tailwind 'text-red-500'
      iconColor: "#ef4444",
    },
  },
};

export default function CheckoutForm({ postId }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Payment intent yarat
    const { data } = await axios.post("https://backend-kmti.onrender.com/create-payment-intent", {
      postId,
    });

    // Kart məlumatını təsdiqlə
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      // Ödəniş uğurlu — premium statusu backend-ə göndər
      await axios.post("http://localhost:3001/mark-premium", {
        postId,
      });

      alert("Ödəniş uğurla tamamlandı, elan premium oldu!");
    }
  } catch (err) {
    console.error("Ödəniş xətası:", err);
    alert("Ödəniş zamanı xəta baş verdi");
  }

  setLoading(false);
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
    >
      <label className="block text-gray-700 font-semibold mb-2" htmlFor="card-element">
        Kredit Kartı Məlumatları
      </label>
      <div
        id="card-element"
        className="border border-gray-300 rounded-md p-3 bg-white focus-within:ring-2 focus-within:ring-blue-500"
      >
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md disabled:opacity-50"
      >
        {loading ? "Yüklənir..." : "Ödəniş Et"}
      </button>
    </form>
  );
}
