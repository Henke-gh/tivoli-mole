import React, { useState, useEffect } from "react";
import "./Startgame.css"; 
import { HighScoreTable } from "../HighScoreTable/HighScoreTable";
import AttractionStampSelector from "../StampGame/StampAttraction";


interface StartgameProps {
    onStartGame: () => void;
    gameTitle?: string;
}

const Startgame: React.FC<StartgameProps> = ({ 
    onStartGame,
    gameTitle = "Welcome to Guac-a-Mole" 
}) => {
    console.log("✅ Startgame.tsx se está montando");
    const [isVisible, setIsVisible] = useState(false);

    const handleAttractionStampSelect = (option: 'basic' | 'premium') => {
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
    }
    
    return (
        <section className={`startgame ${isVisible ? 'visible' : ''}`}>
            <div className="startgame-content">
                <article>
                    <h1 className="game-title">{gameTitle}</h1>
                    <p>The moles have invaded our guacamole feast. Help us out by whacking as many as you can before the timer runs out.</p>
                    <h2>Awards:</h2>
                    <ul>
                        <li>Animal: Tucan</li> 
                        <li>Metal: Gold</li>
                    </ul>
                            <div className="mole-graphic">
                                <img src="./Mole.svg" alt="Mole" />
                            </div>
                </article>

                <article className="high-scores-container">
                    <HighScoreTable />
                </article>            

                <article className="welcome-text">
                    <h2>Buy ticket</h2>
                    <AttractionStampSelector 
                        baseCost={2}
                        metalCost={4}
                    onSelect={handleAttractionStampSelect}/>
                    <button 
                        className="start-button" 
                        onClick={handleStartGame}
                    >
                        To game
                    </button>
                </article>
            </div>
        </section>
    );
}

export default Startgame;