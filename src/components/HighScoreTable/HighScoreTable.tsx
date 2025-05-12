
import React, { useEffect, useState } from 'react';
import { HighScoreService } from "../../services/highScoreService";
import type { Score } from "../../lib/databaseFunction";

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
    return <div className="text-center p-4">Cargando puntuaciones...</div>;
  }

  return (
    <div className="high-score-table">
      <h2 className="text-xl font-bold mb-4">Mejores Puntuaciones</h2>
      
      {highScores.length === 0 ? (
        <p className="text-center">¡Aún no hay puntuaciones registradas!</p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Puesto</th>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-right">Puntuación</th>
            </tr>
          </thead>
          <tbody>
            {highScores.map((score, index) => (
              <tr key={score.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2 font-bold">{score.name}</td>
                <td className="p-2 text-right">{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
