"use client";

import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

export default function ClientSection({ email }: { email: string }) {
  const router = useRouter();
  const [cost, setCost] = useState<number | "">("");
  const [id, setId] = useState<number | "">("");
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [currentCost, setCurrentCost] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentCostAndId = async () => {
      try {
        const { data, error } = await supabase
          .from("game-settings")
          .select("cost, stamp_id")
          .eq("cost-type", "game")
          .single();

        if (error) {
          console.error("Error fetching current cost and stamp_id:", error);
          setMessage("Failed to fetch current cost and stamp ID.");
          return;
        }

        setCurrentCost(data.cost);
        setCurrentId(data.stamp_id);
      } catch (error) {
        console.error("Error fetching current cost and stamp_id:", error);
        setMessage("An unexpected error occurred.");
      }
    };

    fetchCurrentCostAndId();
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

  const handleUpdateId = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id === "" || id <= 0 || id > 20) {
      setMessage("Please enter a valid ID.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("game-settings")
        .update({ stamp_id: id })
        .eq("cost-type", "game");

      if (error) {
        console.error("Error updating cost:", error);
        setMessage("Failed to update cost. Please try again.");
        return;
      }

      setMessage("Stamp ID updated successfully!");
      setCurrentId(id);
      console.log("Updated Stamp ID:", data);
    } catch (error) {
      console.error("Error updating ID:", error);
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

        <h1>The Super Secret Guaca Control Panel</h1>

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

        <p>
          Current Stamp ID:{" "}
          {currentId !== null ? currentId : "Fetching stamp_id.."}
        </p>

        <form
          className="updateIdForm"
          style={{ display: "flex", flexDirection: "row", gap: "10px" }}
          onSubmit={handleUpdateId}>
          <label htmlFor="id-input">Update Stamp_ID:</label>
          <input
            id="id-input"
            type="number"
            min={1}
            max={20}
            value={id}
            onChange={(e) => setId(Number(e.target.value))}
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
