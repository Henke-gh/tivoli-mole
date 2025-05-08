import { useCreateTransaction } from "../../hooks/useTransaction";
import { capitalizeFirstLetter } from "../../utils/utilityFunctions";
import "./TransactionForm.css";

export default function TransactionForm() {
  const { submitTransaction, loading, error, success } = useCreateTransaction();

  let cost: number = 20;
  const animalStamp: string = "tucan";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const buyerID: string = (
      form.elements.namedItem("buyer") as HTMLInputElement
    ).value;
    const data = {
      seller: "user-1",
      buyer: buyerID,
      amount: cost,
      stamp: "tucan",
    };
    console.log(data);
    submitTransaction(data);
  };

  return (
    <div className="transactionForm">
      <h2>Transaction Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="buyerInput">Your UUID:</label>
        <input type="text" id="buyerInput" name="buyer" required />

        <label htmlFor="metal-stamp">
          Add platinum to your {capitalizeFirstLetter(animalStamp)}:
        </label>
        <input type="checkbox" id="metal-stamp" name="metal-stamp" />

        <p>Your total: {cost}</p>
        <button type="submit">Submit</button>
        {loading && <p>Loading...</p>}
        {success && <p>Transaction successful!</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
