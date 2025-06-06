import React, { useState, useEffect } from "react";
import "./Startgame.css";
import { HighScoreTable } from "../HighScoreTable/HighScoreTable";
import PaymentSection from "../PaymentSection";
import { TicketPricesFetcher } from "../TicketPricesFetcher/TicketPricesFetcher"; // Ajusta la ruta
import { useGameContext } from "../GameContext";
import stampMap from "@/lib/stampMap";

interface StartgameProps {
  gameTitle?: string;
}

const Startgame: React.FC<StartgameProps> = ({
  gameTitle = "Welcome to Guac-a-Mole",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { stampId } = useGameContext();

  const stampType = stampMap[stampId] || "Unknown Stamp";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`startgame ${isVisible ? "visible" : ""}`}>
      <div className="startgame-container">
        <article className="game-intro">
          <div className="startgame-header">
            <h1 className="game-title">{gameTitle}</h1>
            <p className="game-description">
              The moles have invaded our guacamole feast. Help us out by
              whacking as many as you can before the timer runs out.
            </p>
          </div>

          <div className="startgame-body">
            <div className="awards">
              <h2>Awards:</h2>
              <p>{stampType}</p>
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
          <h2>Buy Ticket</h2>

          <div className="ticket-selection-container">
            <div className="ticket-display">
              <TicketPricesFetcher />
            </div>
            <PaymentSection />
          </div>
        </article>
      </div>
    </section>
  );
};

export default Startgame;
