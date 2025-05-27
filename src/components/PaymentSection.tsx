import React from "react";
import { useGameContext } from "./GameContext";
import { processPayment } from "../services/transactionService";
import { processReward } from "../services/transactionService";

const PaymentSection: React.FC = () => {
  const {
    setHasPaid,
    isProcessing,
    setIsProcessing,
    paymentError,
    setPaymentError,
    jwtToken,
    handleStartGame,
    cost,
    stampId,
  } = useGameContext();

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      const result = await processPayment(jwtToken, cost);

      if (result.success) {
        setHasPaid(true);
        handleStartGame();
        processReward(jwtToken, "stamp", stampId);
      } else {
        setPaymentError("Payment failed, do you have sufficient funds? Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(
        error instanceof Error ? error.message : "Payment failed"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <button
        onClick={ handlePayment }
        disabled={isProcessing}
        className="start-button">
        {isProcessing ? "Processing..." : `Play Game`}
      </button>
      {paymentError && <div className="error-container">{paymentError}</div>}
    </div>
  );
};

export default PaymentSection;
