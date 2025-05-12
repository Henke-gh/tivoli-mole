import "./Gameover.css";

// Define prop types for the Gameover component

interface GameoverProps {
  score?: number;  // Optional prop for final score
  onRestart?: () => void;  // Optional prop for custom restart function
}

function Gameover({ score, onRestart }: GameoverProps) {
  // Default handler uses window.location.reload if no custom handler provided
  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="gameover">
      <div className="gameover-content">
        <h1 className="game-over-title">Game Over!</h1>
        
        {/* Show score if provided */}
        {score !== undefined && (
          <p className="game-over-text">Your final score: {score}</p>
        )}
        
        <p className="game-over-text">Thank you for playing!</p>
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default Gameover;