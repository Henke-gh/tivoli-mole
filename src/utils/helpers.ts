export function qualifiesForHighScore(
  score: number,
  highScores: number[]
): boolean {
  // Check if the score qualifies for a high score
  const topFiveHighScores = highScores.sort((a, b) => b - a).slice(0, 5);
  return topFiveHighScores.length < 5 || score > Math.min(...topFiveHighScores);
}
