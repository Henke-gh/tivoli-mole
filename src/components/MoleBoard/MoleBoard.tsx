import React, { useEffect, useState } from "react";
import Mole from "../Mole/Mole";
import "./MoleBoard.css";
import type { MoleState, WhackAMoleGameProps } from "../../types/types";
import StartGameModal from "../StartGameModal/StartGameModal";

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
  const [timeLeft, setTimeLeft] = useState<number>(30); // sets game timer to 30 seconds
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // Activate a random mole
  useEffect(() => {
    if (gameStarted && !gameEnd) {
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
    }
  }, [gameStarted, gameEnd]);

// Timer logic
useEffect(() => {
  if (gameStarted && timeLeft > 0) {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  } else if (gameStarted && timeLeft === 0) {
    setGameEnd(true);
  }
}, [gameStarted, timeLeft]);

useEffect(() => {
  if (!gameEnd) {
    updateScore?.(playerScore);
  }
}, [playerScore]);

useEffect(() => {
  if (gameEnd) {
    // Delay just a tick to get out of render phase
    const timeout = setTimeout(() => {
      updateScore?.(playerScore);
      onGameover?.();
    }, 0);
    return () => clearTimeout(timeout);
  }
}, [gameEnd, playerScore, updateScore, onGameover]);

  const handleWhack = (id: number) => {
  if (gameEnd) return;

  const targetMole = moles.find((m) => m.id === id);
  if (!targetMole || !targetMole.active || targetMole.whacked) return;

  setMoles((prev) =>
    prev.map((mole) =>
      mole.id === id ? { ...mole, whacked: true } : mole
    )
  );

  setPlayerScore((prev) => prev + 1);

  setTimeout(() => {
    setMoles((prev) =>
      prev.map((mole) =>
        mole.id === id ? { ...mole, active: false } : mole
      )
    );
  }, 200);

  setTimeout(() => {
    setMoles((prev) =>
      prev.map((mole) =>
        mole.id === id ? { ...mole, whacked: false } : mole
      )
    );
  }, 600);
};

  const hideModalAndStartGame = () => {
    setGameEnd(false);
    setPlayerScore(0);
    setGameStarted(true);
  };

  return (
    <div className="moleboard-container">
      {!gameStarted && <StartGameModal onStartGame={hideModalAndStartGame} />}
      <h1 className="headerText">Happy guacing!</h1>
      <p className="game-p withBorder top">Time Left: {timeLeft} seconds</p>
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
      <p className="game-p withBorder bottom">Score: {playerScore}</p>
    </div>
  );
};

export default WhackAMoleGame;
