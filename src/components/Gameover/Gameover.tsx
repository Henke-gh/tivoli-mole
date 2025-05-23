import "./Gameover.css";
import { HighScoreTable } from "../HighScoreTable/HighScoreTable";
import { HighScoreService } from "@/services/highScoreService";
import { qualifiesForHighScore } from "@/utils/helpers";
import { useEffect, useState } from "react";

interface GameoverProps {
  score?: number; // Optional prop for final score
  onRestart?: () => void;
}

function Gameover({ score, onRestart }: GameoverProps) {

  // Payout stamp logic goes here.

  const [highScore, setHighScore] = useState<number[]>([]);
  const [playerName, setPlayerName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionMsg, setSubmissionMsg] = useState<string | null>(null);
  const [highScoreTrigger, setHighScoreTrigger] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false); //Only one submission allowed

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const highscores = await HighScoreService.getTopScores();
        setHighScore(highscores.map((highscore) => highscore.score));
      } catch (error) {
        console.error("Error fetching high scores:", error);
      }
    };

    fetchHighScores();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
   // if you already submitted, do nothing
    if (submitted) {
      return;
    }
    if (!score || playerName.trim() === "") {
      setSubmissionMsg("Please enter your initials.");
      return;
    }
    setIsSubmitting(true);
    setSubmissionMsg(null);

    try {
      const savedScore = await HighScoreService.saveScore(playerName, score);

      if (savedScore) {
        setSubmissionMsg("Score submitted successfully!");
        setSubmitted(true); // Mark as submitted successfully

        //update high score table, re-render
        setHighScoreTrigger((prev) => prev + 1);
      } else {
        setSubmissionMsg("Failed to submit score.");
      }
    } catch (error) {
      console.error("Error submitting score:", error);
      setSubmissionMsg("Failed to submit score. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleRestart = () => {
    if (onRestart) {
      onRestart();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="gameover-content">
      <h1 className="game-over-title">Time is up!</h1>
      <section className="player-results">
        {/* Show only score if not highscore */}
        {score !== undefined && !qualifiesForHighScore(score, highScore) && (
          <p className="game-over-text">You guaced {score} moles.</p>
        )}

        {/* If new high score, also promts player to submit new high score */}
        {score !== undefined && qualifiesForHighScore(score, highScore) && (
          <div className="highScore-message">
            <p className="game-over-text">- New High Score -</p>
            <p className="game-over-text">You guaced {score} moles.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Enter your initials:</label>
              <div className="input-button-row">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="ATV"
                maxLength={3}
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                disabled={isSubmitting || submitted} // Disable input if submitting or already submitted
              />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              </div>
            </form>
            {submissionMsg && (
              <p className="submission-message">{submissionMsg}</p>
            )}

          <div className="stars-over">
                <img src="./star.svg" alt="Star 1" className="star star-right" />
                <img src="./star.svg" alt="Star 2" className="star star-bottom-left" />
          </div>
        </div>     
        )}
      </section>

      <article className="high-scores-container">
        <HighScoreTable key={highScoreTrigger} />
      </article>

      <section className="back-to-start">
        <p className="game-over-text">Thank you for playing!</p>
        <button className="restart-button" onClick={handleRestart}>
          Back to Start
        </button>
      </section>
      <article>
        <div className="gameover-images">
          <img src="./flagTrio-Left.svg" alt="" className="flagTrio-Left" />
          <img src="./Mole-Guacamole.svg" alt="" className= "Mole-Guacamole"/>
          <img src="flagTrio-new.svg" alt="" className="flagTrio-right" />
        </div>
      </article>
    </div>
  );
}

export default Gameover;
