import React from "react";
import "./Mole.css";
import Image from "next/image";

export interface MoleProps {
  isActive: boolean;
  onWhack: () => void;
  whacked: boolean;
}

const Mole: React.FC<MoleProps> = ({ isActive, onWhack, whacked }) => {
  return (
    <div className="mole-container" onClick={isActive ? onWhack : undefined}>
      {isActive && (
        <div className={`mole ${whacked ? "whacked" : ""}`}>
          <Image
            className="moleImg"
            src={"./darkerMole.svg"}
            alt="A hungry mole."
            width={50}
            height={50}
          />
        </div>
      )}
      {whacked && <div className="guacamole" />}
      <div className="mole-hole-lower">
        <Image
          className="bowl"
          src={"./boardBowl.svg"}
          alt="A bowl of guacamole"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default Mole;
