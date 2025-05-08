import React, { useEffect, useState } from "react";
import Mole from "../Mole/Mole";
import "./MoleBoard.css"
import type { MoleState } from "../../types/types";

const NUM_MOLES = 12;

const WhackAMoleGame: React.FC = () => {
  const [moles, setMoles] = useState<MoleState[]>(
    Array.from({ length: NUM_MOLES }, (_, i) => ({ id: i, active: false }))
  );
  const [score, setScore] = useState<number>(0);

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
      prev.map((mole) =>
        mole.id === id ? { ...mole, active: false } : mole
      )
    );
    setScore((prev) => prev + 1);
  };

  return (
    <div className="moleboard-container">
      <h2>Score: {score}</h2>
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
  );
};

export default WhackAMoleGame;
