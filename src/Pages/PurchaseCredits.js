import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const API_BASE_URL = "https://forestgreen-rail-905681.hostingersite.com/api";
const stripePromise = loadStripe("pk_test_51P2ZKBP2rKrOH9q6wUNCsMJkJMeGXNIrHf9HJrlgPEEMbGrDrsz7SNn5lwryqZIsWnUHxTPQR5M7Hv6r2hkZQ8gc00ja44v10c");

const PurchaseCreditsForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [packageName, setPackageName] = useState("");
    const [amount, setAmount] = useState(0);
    const [credits, setCredits] = useState(0);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User not authenticated.");
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/user`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,

                    },
                });


                const data = await response.json();
                if (response.ok) {
                    setFirstName(data.first_name);
                } else {
                    setError("Failed to fetch user data.");
                }
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };
        fetchUser();
    }, []);


    const handlePurchase = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please login first.");
            navigate("/login");
            setIsSubmitting(false);
            return;
        }

        if (!stripe || !elements) {
            setError("Stripe not loaded. Reload the page.");
            setIsSubmitting(false);
            return;
        }

        try {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement),
            });

            if (error) throw error;

            // Send to backend
            const response = await fetch(`${API_BASE_URL}/purchase-credits`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    package_name: packageName.trim(),
                    amount: parseInt(amount),
                    credits: parseInt(credits),
                    payment_method_id: paymentMethod.id,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Payment failed");

            // Confirm Payment Step
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: paymentMethod.id,
                }
            );

            if (confirmError) throw confirmError;
            if (paymentIntent.status === 'succeeded') {
                navigate("/confirmation");
            }

        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!stripe || !elements) {
          toast.error('Stripe is not loaded yet.');
          return;
        }
      
        const cardElement = elements.getElement(CardElement);
      
        // Generate a new Stripe token
        const { token, error } = await stripe.createToken(cardElement);
      
        if (error) {
          toast.error(error.message);
          return;
        }
      
        console.log('Stripe Token:', token.id); // Ensure it's a new token
      
        // Send the newly generated token in the request
        const payload = {
          package_name: "basic",
          amount: 10.00,
          credits: 20,
          stripeToken: token.id, // Always send a fresh token
        };
      
        try {
          const response = await axios.post(
            'https://forestgreen-rail-905681.hostingersite.com/api/purchase-credits',
            payload,
            { headers: { 'Content-Type': 'application/json' } }
          );
      
          console.log('Response:', response.data);
          toast.success('Payment Successful!');
        } catch (err) {
          console.error('Payment Error:', err.response?.data || err.message);
          toast.error(`Error: ${err.response?.data?.message || err.message}`);
        }
      };
      

    return (
        <div>
            <div className="main-container main">
                <div className="content-wrapper">
                    <div className="welcome-box">
                        <h1>Welcome, {firstName}</h1>
                    </div>

                    <h1>Buy Credits</h1>
                    <form onSubmit={handlePurchase}>
                        <div className="input-container">
                            <div className="input-box">
                                <input type="text" placeholder="Package Name" onChange={(e) => setPackageName(e.target.value)} required />
                            </div>
                            <div className="input-box">
                                <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} required />
                            </div>
                            <div className="input-box">
                                <input type="number" placeholder="Credits" onChange={(e) => setCredits(e.target.value)} required />
                            </div>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>Cardholder Name</label>
                            <input type="text" name="cardholderName" className="form-control" required />
                        </div> <br />
                        <div className="form-group">
                            <label>Card Details</label>
                            <CardElement className="form-control" />
                        </div> <br />
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting || !stripe}>
                            {isSubmitting ? 'Processing...' : 'Pay Now'}
                        </button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

const PurchaseCredits = () => {
    return (
        <Elements stripe={stripePromise}>
            <PurchaseCreditsForm />
        </Elements>
    );
};

export default PurchaseCredits;
