import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Checkout";
import { useParams } from "react-router-dom";


const stripePromise = loadStripe("pk_test_51RjfkNQPoIXtMvxl2iiXmXaUVpakH3ORIc4AraowsyDfLSypU2jp4D3j0vUSGVi0I64cZiiItFaA0srpJRe75Gdy00uDEMbb5Z");

export default function PaymentPage() {
    const { id } = useParams();
    console.log(id)
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm postId={id} />
    </Elements>
  );
}