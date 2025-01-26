import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const { user } = useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const [err, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const navigate=useNavigate()

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    axiosSecure
      .get(`applyvisa/${user?.email}`)
      .then((res) => setVisas(res.data));
  }, [user?.email]);
  console.log(visas?.length);

  // assignment er time er ei nicher totalPrice ta dynamic value pabe
  const totalPrice = 1000;
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how  to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[payment error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmPaymentErr } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: CardElement,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmPaymentErr) {
      // Inform the customer that there was an error.
      console.log("confirm payment error", error.message);
    } else {
      // Handle next step based on PaymentIntent's status.
      console.log("PaymentIntent ID: " + paymentIntent.id);
      console.log("PaymentIntent status: " + paymentIntent.status);

      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: visas.map((visa) => visa._id),
          // visaId:
          status: "pending",
        };
        const res = axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);
        navigate('/dashboard/paymentHistory')
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button disabled={!stripe || !clientSecret} type="submit">
          Pay
        </button>
        <p className="text-red-600">{err}</p>
        {transactionId && (
          <p className="text-green-600">Your transaction id:{transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
