import "./Gameover.css";
import { HighScoreTable } from "../HighScoreTable/HighScoreTable";

interface GameoverProps {
  score?: number; // Optional prop for final score
  onRestart?: () => void;
}

function Gameover({ score, onRestart }: GameoverProps) {
  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    } else {
      window.location.reload();
    }
  };

  return (
    <section className="gameover">
      <div className="gameover-content">
        <h1 className="game-over-title">Time is up!</h1>

        {/* Show score if provided */}
        {score !== undefined && (
          <p className="game-over-text">You guaced {score} moles.</p>
        )}

        <article className="high-scores-container">
                            <HighScoreTable />
                        </article>   

        <p className="game-over-text">Thank you for playing!</p>
        <button className="restart-button" onClick={handleRestart}>
          Back to start
        </button>
      </div>
    </section>
  );
}

export default Gameover;