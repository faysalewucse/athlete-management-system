import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { SpinnerText } from "../../components/shared/SpinnerText";

export const CheckOutForm = ({ closeModal, payFor, refetch }) => {
  const stripe = useStripe();
  const { currentUser } = useAuth();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState();
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState();

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: payFor?.classInfo[0].price })
      .then(({ data }) => {
        console.log(data.clientSecret);
        setClientSecret(data.clientSecret);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      closeModal();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.displayName || "anonymous",
            email: currentUser?.email || "unknown",
          },
        },
      });

    if (confirmError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: confirmError.message,
      });
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const paymentInfo = {
        userEmail: currentUser?.email,
        transactionId: paymentIntent.id,
        date: new Date(Date.now()).toLocaleString(),
        price: payFor?.classInfo[0].price,
        classId: payFor?.classInfo[0]._id,
      };

      axiosSecure.post("/payment", paymentInfo).then((response) => {
        if (response.status === 200) {
          axiosSecure
            .put(`/classes/${payFor?.classInfo[0]._id}`)
            .then((response) => {
              if (response.status === 200) {
                axiosSecure
                  .delete(`/bookedClasses/${payFor?._id}`)
                  .then((response) => {
                    if (response.status === 200) {
                      setProcessing(false);
                      refetch();
                      closeModal();
                      Swal.fire(
                        "Great!",
                        "Your Payment is Successfull",
                        "success"
                      );
                    }
                  });
              }
            });
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="py-6">
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
      <button
        className={`${
          !stripe && "opacity-40 cursor-not-allowed"
        } bg-green-500 text-white font-semibold py-2 px-6 rounded-xl w-full mt-10`}
        type="submit"
        disabled={!stripe || !clientSecret || processing}
      >
        <SpinnerText text={"Pay Now"} loading={processing} />
      </button>
    </form>
  );
};
