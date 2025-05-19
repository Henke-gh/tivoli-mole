import React, { useEffect, useState } from "react";
import Mole from "../Mole/Mole";
import "./MoleBoard.css";
import type { MoleState, WhackAMoleGameProps } from "../../types/types";

const NUM_MOLES = 12;

const WhackAMoleGame: React.FC<WhackAMoleGameProps> = ({
  onGameover,
  updateScore,
}) => {
  const [moles, setMoles] = useState<MoleState[]>(
    Array.from({ length: NUM_MOLES }, (_, i) => ({
      id: i,
      active: false,
      whacked: false,
    }))
  );
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(5); // 5 seconds
  const [gameEnd, setGameEnd] = useState<boolean>(false);

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
  }, [gameEnd]);

  //timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Decrease time every second

      return () => clearInterval(timer);
    } else {
      setGameEnd(true);
      if (onGameover) {
        updateScore?.(playerScore);
        onGameover();
      }
    }
  }, [timeLeft, onGameover]);

  const handleWhack = (id: number) => {
    if (!gameEnd) {
      setMoles((prev) =>
        prev.map((mole) =>
          mole.id === id ? { ...mole, active: false, whacked: true } : mole
        )
      );
      setPlayerScore((prev) => prev + 1);
      updateScore?.(playerScore);

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
      <h1>Happy guacing!</h1>
      <p className="game-p">Time Left: {timeLeft} seconds</p>
      {!gameEnd && (
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
      <p className="game-p">Score: {playerScore}</p>
    </div>
  );
};

export default WhackAMoleGame;
