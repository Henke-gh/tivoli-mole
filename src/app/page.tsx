"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Startgame from "@/components/Startgame/Startgame";
import MoleBoard from "@/components/MoleBoard/MoleBoard";

export default function Home() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleStartGame = (): void => {
    setGameStarted(true);
    setGameOver(false);
    //setScore(0);
  };

  const handleRestartGame = (): void => {
    setGameStarted(false);
    setGameOver(false);
    //setScore(0);
  };

  const handleGameOver = (): void => {
    setGameOver(true);
  };

  const handleScoreUpdate = (newScore: number): void => {
    setScore(newScore);
  };
  return (
    <div className={styles.page}>
      <h3>remove this</h3>
      {!gameStarted ? (
        <Startgame onStartGame={handleStartGame} />
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
}
