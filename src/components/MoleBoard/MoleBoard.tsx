import React, { useEffect, useState } from "react";
import Mole from "../Mole/Mole";
import "./MoleBoard.css";
import type { MoleState } from "../../types/types";

const NUM_MOLES: number = 12;
let isWhack: boolean = false;
let gameEnd: boolean = false; // Flag to indicate if the game has ended

const WhackAMoleGame: React.FC = () => {
  const [moles, setMoles] = useState<MoleState[]>(
    Array.from({ length: NUM_MOLES }, (_, i) => ({ id: i, active: false }))
  );
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds

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
  }, []);

  const handleWhack = (id: number) => {
    setMoles((prev) =>
      prev.map((mole) => (mole.id === id ? { ...mole, active: false } : mole))
    );
    setScore((prev) => prev + 1);
  };

  const startWhacking = () => {
    isWhack = true;
    //function to start a 60 second timer
    const timerDuration = 5; // 60 seconds
    setTimeLeft(timerDuration); // Initialize time left

    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(interval);
          isWhack = false; // Stop the game
          gameEnd = true; // Set game end flag
          alert("Time's up! Your score is: " + score);
          return 0; // Set time left to 0
        }
        return prevTimeLeft - 1;
      });
    }, 1000); // Update every second
  };

  return (
    <div className="moleboard-container">
      <h2>Score: {score}</h2>
      {!isWhack && !gameEnd && (
        <div className="awaitStart">
          <button onClick={startWhacking}>Whack!</button>
        </div>
      )}
      {isWhack && (
        <div>
          <h3>Time Left: {timeLeft} seconds</h3>
          <div className="moleboard">
            {moles.map((mole) => (
              <Mole
                key={mole.id}
                isActive={mole.active}
                onWhack={() => handleWhack(mole.id)}
              />
            ))}
          </div>
        </div>
      )}
      {!isWhack && gameEnd && <div className="gameEnd">End</div>}
    </div>
  );
};

export default WhackAMoleGame;
