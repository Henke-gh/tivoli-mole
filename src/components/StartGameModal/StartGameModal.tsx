import Image from "next/image";
import "./StartGameModal.css";

export default function StartGameModal({
  onStartGame,
}: {
  onStartGame: () => void;
}) {
  return (
    <div className="modalOverlay">
      <div className="startGameModal">
        <h1 className="headerText">How to play</h1>
        <div className="imgContainer">
          <Image
            src={"./gouacBowl.svg"}
            alt="A bowl of guacamole"
            width={50}
            height={50}
          />
          <Image
            src={"./darkerMole.svg"}
            alt="A hungry mole"
            width={50}
            height={50}
          />
          <Image
            src={"./moleWithGuac.svg"}
            alt="A mole with a bowl of guacamole on its head"
            width={50}
            height={50}
          />
        </div>
        <p className="game-p">
          Hit as many moles as you can before the timer runs out.
        </p>
        <button className="start-button" onClick={onStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}
