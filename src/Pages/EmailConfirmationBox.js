// EmailConfirmationBox.jsx
import React, { useState } from "react";

const EmailConfirmationBox = ({ email, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setIsLoading(true);
    setError("");

    try {
      // API call to send confirmation email
      const response = await fetch("/api/send-confirmation-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        onConfirm(); // Callback to show success message
      } else {
        setError("Failed to send confirmation email. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="email-confirmation-box">
      <h2>Confirm Your Email</h2>
      <p>
        A confirmation link will be sent to <strong>{email}</strong>. Click the
        link in the email to activate your account.
      </p>

      {error && <p className="error-message">{error}</p>}

      <button
        onClick={handleConfirm}
        disabled={isLoading}
        className="confirm-button"
      >
        {isLoading ? "Sending..." : "Send Confirmation Email"}
      </button>
    </div>
  );
};

export default EmailConfirmationBox;