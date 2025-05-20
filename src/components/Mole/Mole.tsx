import React from "react";
import "./Mole.css";

export interface MoleProps {
  readonly isActive: boolean;
  readonly onWhack: () => void;
  readonly whacked: boolean;
}

const Mole: React.FC<MoleProps> = ({ isActive, onWhack, whacked }) => {
  return (
    <div className="mole-container">
      <div className="mole-hole-upper"></div>
      <div className="mole-hole-lower"></div>
        {isActive && (
          <div
            className={`mole ${whacked ? "whacked" : ""}`}
            onClick={onWhack}
            role="button"
            tabIndex={0}
          />
        )}
      {whacked && <div className="guacamole" />}
    </div>
  );
};

export default Mole;