import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { data, error } = await supabase
      .from("Score")
      .select("*")
      .order("score", { ascending: false })
      .limit(5);
    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching high scores:", error);
    res.status(500).json({ message: "Error fetching high scores" });
  }
}
