import React, { useState, useEffect } from "react";
import "./Startgame.css"; 
//import { HighScoreService } from "../../services/highScoreService";
//import type { Score } from "../../lib/databaseFunction";
import { HighScoreTable } from "../HighScoreTable/HighScoreTable";


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
   //const [highScores, setHighScores] = useState<Score[]>([]);
    //const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Efecto para animación de entrada
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
      {/*  useEffect(() => {
        // Cargar puntuaciones altas
        const loadHighScores = async () => {
            setIsLoading(true);
            const scores = await HighScoreService.getTopScores();
            setHighScores(scores);
            setIsLoading(false);
        };
        
        loadHighScores();
    }, []);*/}
    
    const handleStartGame = () => {
        setIsVisible(false);
        setTimeout(onStartGame, 500);
    }
    
    return (
        <div className={`startgame ${isVisible ? 'visible' : ''}`}>
            <div className="startgame-content">
                <h1 className="game-title">{gameTitle}</h1>
                
                 {/* <div className="game-mascot">
                    <div className="mole-graphic">🦔🦔🦔</div>
                </div>*/}
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
                
                <div className="high-scores-container">
                    <HighScoreTable />
                </div>
                {/* Tabla de puntuaciones altas 
                <div className="high-scores-container">
                    <h3 className="high-scores-title">Top Scores</h3>
                    
                    {isLoading ? (
                        <p className="loading-text">Loading scores...</p>
                    ) : highScores.length === 0 ? (
                        <p className="no-scores-text">No high scores yet. Be the first!</p>
                    ) : (
                        <div className="high-scores-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="rank-column">#</th>
                                        <th className="name-column">Player</th>
                                        <th className="score-column">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {highScores.slice(0, 5).map((score, index) => (
                                        <tr key={score.id}>
                                            <td className="rank-column">{index + 1}</td>
                                            <td className="name-column">{score.name}</td>
                                            <td className="score-column">{score.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                        </div>
                    )}
                </div>*/}
              
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