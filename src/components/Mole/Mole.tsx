import React from "react";
import "./Mole.css";

export interface MoleProps {
  isActive: boolean;
  onWhack: () => void;
}

const Mole: React.FC<MoleProps> = ({ isActive, onWhack }) => {
  return (
    <div className="mole-container" onClick={isActive ? onWhack : undefined}>
      <div className="mole-hole-upper"></div>
      <div className="mole-hole-lower"></div>
      {isActive && <div className="mole" />}
    </div>
  );
};

export default Mole;
