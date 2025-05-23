import React from "react";
import "./Mole.css";
import Image from "next/image";

export interface MoleProps {
  readonly isActive: boolean;
  readonly onWhack: () => void;
  readonly whacked: boolean;
}

const Mole: React.FC<MoleProps> = ({ isActive, onWhack, whacked }) => {
  const shouldShowMole = isActive || whacked;

  return (
    <div className="mole-container">
      {shouldShowMole && (
        <div
          className={`mole ${whacked ? "whacked" : ""}`}
          onClick={onWhack}
          role="button"
          tabIndex={0}
        >
          <Image
            className="moleImg"
            src={"/darkerMole.svg"}
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
          src={"/boardBowl.svg"}
          alt="A bowl of guacamole"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default Mole; 