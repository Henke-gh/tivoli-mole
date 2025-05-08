import { useState } from "react";
import { createTransaction } from "../api/transaction";
import type { NewTransaction } from "../api/transaction";

export const useCreateTransaction = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const submitTransaction = async (data: NewTransaction) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await createTransaction(data);
      if (res.status === 201) {
        setSuccess(true);
      } else {
        setError("Transaction failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { submitTransaction, loading, error, success };
};
