import React, { useState, useEffect } from "react";
import "./Startgame.css";
import { HighScoreTable } from "../HighScoreTable/HighScoreTable";
import AttractionStampSelector from "../StampGame/StampGame";

interface StartgameProps {
  onStartGame: () => void;
  gameTitle?: string;
}

const Startgame: React.FC<StartgameProps> = ({
  onStartGame,
  gameTitle = "Welcome to Guac-a-Mole",
}) => {
  console.log("✅ Startgame.tsx se está montando");
  const [isVisible, setIsVisible] = useState(false);

  const handleAttractionStampSelect = (option: "basic" | "premium") => {
    console.log("Stamp option selected:", option);
  };

  useEffect(() => {
    // Efecto para animación de entrada
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleStartGame = () => {
    setIsVisible(false);
    setTimeout(onStartGame, 500);
  };

  return (
    <section className={`startgame ${isVisible ? "visible" : ""}`}>
      <div className="startgame-container">
        <article className= "game-intro">
        <div className="startgame-header">
          <h1 className="game-title">{gameTitle}</h1>
          <p className="game-description">
            The moles have invaded our guacamole feast. Help us out by whacking
            as many as you can before the timer runs out.
          </p>
          </div>

          <div className="startgame-body">
          <div className="awards">
          <h2>Awards:</h2>
          <ul>
            <li>Animal: Tucan</li>
            <li>Metal: Gold</li>
          </ul>
          </div>
          <div className="mole-graphic">
            <img src="./Mole-new.svg" alt="Mole" />
          </div>
          </div>
        </article>
      
        

        <article className="high-scores-container">
          <HighScoreTable />
        </article>

        <article className="welcome-text">
        <img src="flagTrio-new.svg" alt="" className="flagTrio" />
          <h2>Buy ticket</h2>
          
          <div className="ticket-selection-container">
            <div className="ticket-selector">
          <AttractionStampSelector
            baseCost={2}
            metalCost={4}
            onSelect={handleAttractionStampSelect}
          />
            </div>
          <button className="start-button" onClick={handleStartGame}>
            To game
          </button>
          </div>
        </article>
     </div>
    </section>
  );
};

export default Startgame;
