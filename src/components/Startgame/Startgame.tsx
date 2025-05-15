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
    gameTitle = "WHACK A MOLE!" 
}) => {

    console.log("✅ Startgame.tsx se está montando");
    const [isVisible, setIsVisible] = useState(false);

    const handleAttractionStampSelect = (option: 'basic' | 'premium') => {
        console.log("Stamp option selected:", option);
    };
    
    useEffect(() => {
        // Animation effect for the start game screen
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
        <div className={`startgame ${isVisible ? 'visible' : ''}`}>
            <div className="startgame-content">
                <h1 className="game-title">{gameTitle}</h1>
                
                  <div className="game-mascot">
    <div className="mole-graphic">
        <img src="./Mole.svg" alt="Mole" />
        <img src="./Mole.svg" alt="Mole" />
        <img src="./Mole.svg" alt="Mole" />
    </div>
</div>

                <div className="welcome-text">
                    <h2>Welcome to the Game!</h2>
                    <p>Are you ready to start? <br /> 
                    Click the button below to begin your adventure!</p>
                </div>
                <button 
                    className="start-button" 
                    onClick={handleStartGame}
                >
                    Start Game
                </button>

                      {/*New component for Stamp and Metal*/}
                      <AttractionStampSelector 
                      baseCost={2}
                      metalCost={4}
                    onSelect={handleAttractionStampSelect}/>
                
                <div className="high-scores-container">
                    <HighScoreTable />
                </div>
                
                <details className="controls-info">
                    <summary>how to play?</summary>
                    <p>Smash on the moles to score points!</p>
                    <p>Try to score as many points as you can within the time limit!</p>
                    <p>Whack on the moles when they appear to score points!</p>
                </details>
            </div>
        </div>
    );
}

export default Startgame;