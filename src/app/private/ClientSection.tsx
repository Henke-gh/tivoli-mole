"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

export default function ClientSection({ email }: { email: string }) {
  const router = useRouter();
  const supabase = createClient();
  const [cost, setCost] = useState<number | "">("");
  const [currentCost, setCurrentCost] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the current cost when the component mounts
    const fetchCurrentCost = async () => {
      try {
        const { data, error } = await supabase
          .from("game-settings")
          .select("cost")
          .eq("cost-type", "game")
          .single();

        if (error) {
          console.error("Error fetching current cost:", error);
          setMessage("Failed to fetch current cost.");
          return;
        }

        setCurrentCost(data.cost);
      } catch (error) {
        console.error("Error fetching current cost:", error);
        setMessage("An unexpected error occurred.");
      }
    };

    fetchCurrentCost();
  }, [supabase]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login");
    } else {
      console.error("Error signing out:", error.message);
    }
  };

  const handleUpdateCost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cost === "" || cost <= 0) {
      setMessage("Please enter a valid cost.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("game-settings")
        .update({ cost })
        .eq("cost-type", "game"); // Update the row where cost-type is 'game'

      if (error) {
        console.error("Error updating cost:", error);
        setMessage("Failed to update cost. Please try again.");
        return;
      }

      setMessage("Cost updated successfully!");
      setCurrentCost(cost);
      console.log("Updated cost:", data);
    } catch (error) {
      console.error("Error updating cost:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <>
      <div
        className="adminContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          fontFamily: "var(--robotoSlab)",
          gap: "10px",
        }}>
        <p>Hello {email}</p>

        <p>
          Current Cost: {currentCost !== null ? currentCost : "Fetching cost.."}
        </p>

        <form
          className="updateCostForm"
          style={{ display: "flex", flexDirection: "row", gap: "10px" }}
          onSubmit={handleUpdateCost}>
          <label htmlFor="cost-input">Update Cost:</label>
          <input
            id="cost-input"
            type="number"
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
          />
          <button type="submit">Update</button>
        </form>

        {/* Display success/error messages */}
        {message && <p>{message}</p>}

        <button onClick={handleSignOut} style={{ width: "fit-content" }}>
          Sign out
        </button>
      </div>
    </>
  );
}
