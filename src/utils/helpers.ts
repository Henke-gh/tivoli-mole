import supabase from "@/lib/supabaseClient";

export function qualifiesForHighScore(
  score: number,
  highScores: number[]
): boolean {
  // Check if the score qualifies for a high score
  const topFiveHighScores = highScores.sort((a, b) => b - a).slice(0, 5);
  return topFiveHighScores.length < 5 || score > Math.min(...topFiveHighScores);
}

//function to collect stamp_id from supabase public.game-settings table
export async function getStampId(): Promise<number | null> {
  try {
    const { data, error } = await supabase
      .from("game-settings")
      .select("stamp_id")
      .eq("cost-type", "game")
      .single();

    if (error) {
      console.error("Error fetching stamp_id:", error);
      return null;
    }

    return data.stamp_id;
  } catch (error) {
    console.error("Error fetching stamp_id:", error);
    return null;
  }
}

//function to collect cost from supabase public.game-settings table where cost-type is game
export async function getCost(): Promise<number | null> {
  try {
    const { data, error } = await supabase
      .from("game-settings")
      .select("cost")
      .eq("cost-type", "game")
      .single();

    if (error) {
      console.error("Error fetching cost:", error);
      return null;
    }

    return data.cost;
  } catch (error) {
    console.error("Error fetching cost:", error);
    return null;
  }
}
