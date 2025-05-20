import type { Score } from "@/types/types";

export class HighScoreService {
  private static API_BASE = "/api/high-scores";

  // Fetch top 5 scores from the HighScore API
  static async getTopScores(): Promise<Score[]> {
    try {
      const response = await fetch(`${this.API_BASE}/get`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Score[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching high scores:", error);
      return [];
    }
  }

  // Guardar una nueva puntuación
  static async saveScore(name: string, score: number): Promise<Score | null> {
    try {
      const response = await fetch(`${this.API_BASE}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score }),
      });
      if (!response.ok) {
        throw new Error("Failed to save to High Score");
      }

      const data: { message: string; data: Score } = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error saving score:", error);
      return null;
    }
  }
}
