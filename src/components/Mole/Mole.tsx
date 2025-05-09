import React from "react";
import "./Mole.css";

export interface MoleProps {
  isActive: boolean;
  onWhack: () => void;
  whacked: boolean;
}

const Mole: React.FC<MoleProps> = ({ isActive, onWhack, whacked }) => {
  return (
    <div className="mole-container" onClick={isActive ? onWhack : undefined}>
      <div className="mole-hole-upper"></div>
      <div className="mole-hole-lower"></div>
      {isActive && <div className={`mole ${whacked ? "whacked" : ""}`}/>}
      {whacked && <div className="guacamole" />}
    </div>
  );
};

export default Mole;
