import React, { useEffect, useState } from "react";
import Mole from "../Mole/Mole";
import "./MoleBoard.css";
import type { MoleState } from "../../types/types";

const NUM_MOLES = 12;

const WhackAMoleGame: React.FC = () => {
  const [moles, setMoles] = useState<MoleState[]>(
    Array.from({ length: NUM_MOLES }, (_, i) => ({
      id: i,
      active: false,
      whacked: false,
    }))
  );
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(5); // 5 seconds
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Activate a random mole
  useEffect(() => {
    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * NUM_MOLES);
      setMoles((prev) =>
        prev.map((mole, i) => ({
          ...mole,
          active: i === index,
        }))
      );
    }, 1000); // Every 1 seconds?

    return () => clearInterval(interval);
  }, [gameOver]);

  //timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Decrease time every second

      return () => clearInterval(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft]);

  const handleWhack = (id: number) => {
    if (!gameOver) {
      setMoles((prev) =>
        prev.map((mole) =>
          mole.id === id ? { ...mole, active: false, whacked: true } : mole
        )
      );
      setScore((prev) => prev + 1);

      setTimeout(() => {
        setMoles((prev) =>
          prev.map((mole) =>
            mole.id === id ? { ...mole, whacked: false } : mole
          )
        );
      }, 300);
    }
  };
  return (
    <div className="moleboard-container">
      <h2>Score: {score}</h2>
      <h3>Time Left: {timeLeft} seconds</h3>
      {gameOver ? (
        <div className="game-over">
          <h1>Game Over!</h1>
          <p>Your final score is: {score}</p>
        </div>
      ) : (
        <div className="moleboard">
          {moles.map((mole) => (
            <Mole
              key={mole.id}
              isActive={mole.active}
              onWhack={() => handleWhack(mole.id)}
              whacked={mole.whacked}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WhackAMoleGame;
