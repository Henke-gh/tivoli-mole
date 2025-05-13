import { selectData, insertData } from '../lib/databaseFunction';
import type { Score } from '../lib/databaseFunction';

export class HighScoreService {
  private static TABLE_NAME = 'Score'; // Asumiendo que la tabla se llama 'scores'
  private static TOP_LIMIT = 10; // Número de puntuaciones altas a mostrar

  // Obtener las mejores puntuaciones
  static async getTopScores(): Promise<Score[]> {
    try {
      const data = await selectData(this.TABLE_NAME);
      
      if (!data) return [];
      
      // Ordenar por puntuación de mayor a menor
      const sortedScores = [...data].sort((a, b) => b.score - a.score);
      
      // Devolver solo las mejores TOP_LIMIT puntuaciones
      return sortedScores.slice(0, this.TOP_LIMIT);
    } catch (error) {
      console.error('Error fetching high scores:', error);
      return [];
    }
  }

  // Guardar una nueva puntuación
  static async saveScore(name: string, score: number): Promise<Score | null> {
    try {
      // Crear el objeto de puntuación
      const scoreData = {
        name,
        score
      };
      
      // Insertar la puntuación en la base de datos
      await insertData(this.TABLE_NAME, [scoreData]);
      
      // Como insertData no devuelve los datos insertados, obtenemos las puntuaciones
      // y encontramos la recién insertada (esto es una simplificación)
      const scores = await this.getTopScores();
      const insertedScore = scores.find(s => s.name === name && s.score === score);
      
      return insertedScore || null;
    } catch (error) {
      console.error('Error saving high score:', error);
      return null;
    }
  }

  // Comprobar si una puntuación califica para estar en el top
  static async checkIfQualifiesForHighScore(score: number): Promise<boolean> {
    const topScores = await this.getTopScores();
    
    // Si hay menos de TOP_LIMIT puntuaciones, cualquier puntuación califica
    if (topScores.length < this.TOP_LIMIT) {
      return true;
    }
    
    // Comprobar si la puntuación es mayor que la puntuación más baja en el top
    const lowestTopScore = topScores[topScores.length - 1];
    return score > lowestTopScore.score;
  }
}