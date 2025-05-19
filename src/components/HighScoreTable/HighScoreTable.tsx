import React, { useEffect, useState } from "react";
import { HighScoreService } from "../../services/highScoreService";
import type { Score } from "../../types/types";
import "./HighScoreTable.css";

export const HighScoreTable: React.FC = () => {
  const [highScores, setHighScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHighScores = async () => {
      setIsLoading(true);
      const scores = await HighScoreService.getTopScores();
      setHighScores(scores);
      setIsLoading(false);
    };

    loadHighScores();
  }, []);

  if (isLoading) {
    return <div className="loading">Loading scores...</div>;
  }

  return (
    <>
      <h2 className="title">High score</h2>

      {highScores.length === 0 ? (
        <p className="no-scores">No scores yet!</p>
      ) : (
        <table className="score-table">
          <thead>
            <tr>
              <th className="column-header">Rank</th>
              <th className="column-header">Name</th>
              <th className="column-header">Score</th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((score, index) => (
              <tr
                key={score.id}
                className={index % 2 === 0 ? "even-row" : "odd-row"}>
                <td className="cell">{index + 1}</td>
                <td className="cell">{score.name}</td>
                <td className="cell">{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
