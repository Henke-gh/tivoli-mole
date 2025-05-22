"use client";

import { useGameContext } from '../components/GameContext';
import Startgame from '../components/Startgame/Startgame'; 
import Gameover from '../components/Gameover/Gameover';
import MoleBoard from '../components/MoleBoard/MoleBoard';
import styles from '../app/page.module.css'
import JwtDisplay from './JwtDisplay';

const GameContent: React.FC = () => {
  const { 
    gameStarted, 
    gameOver, 
    score,
    handleRestartGame, 
    handleGameOver, 
    handleScoreUpdate 
  } = useGameContext();

  return (
    <div className={styles.page}>
        <JwtDisplay />
      {!gameStarted ? (
        <Startgame />
      ) : gameOver ? (
        <Gameover onRestart={handleRestartGame} score={score} />
      ) : (
        <>
          <MoleBoard
            onGameover={handleGameOver}
            updateScore={handleScoreUpdate}
          />
        </>
      )}
    </div>
  );
};

export default GameContent;