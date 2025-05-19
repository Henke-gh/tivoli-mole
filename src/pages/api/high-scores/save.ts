import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { name, score } = req.body;
  if (!name || typeof score !== "number") {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const { data, error } = await supabase
      .from("Score")
      .insert([{ name, score }])
      .select();
    if (error !== null) {
      console.error("Error inserting data:", error);
      return res.status(500).json({ message: "Error saving score" });
    }
    if (!error) {
      res.status(200).json({ message: "Score saved successfully", data });
    }

    res.status(200).json({ message: "Score saved successfully", data });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ message: "Error saving score" });
  }
}
