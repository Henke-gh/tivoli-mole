import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MoleBoard from "./components/MoleBoard/MoleBoard";
import Startgame from "./components/Startgame/Startgame";
import Gameover from "./components/Gameover/Gameover";
import { getBankTest } from "./api/centralbanken";

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleStartGame = (): void => {
    setGameStarted(true);
    setGameOver(false);
    //setScore(0);
  };

  const handleRestartGame = (): void => {
    setGameStarted(false);
    setGameOver(false);
    //setScore(0);
  };

  const handleGameOver = (): void => {
    setGameOver(true);
  };

  const handleScoreUpdate = (newScore: number): void => {
    setScore(newScore);
  };

  //this is a test to fetch data from the API
  // and log it to the console
  //remove before we go live
  useEffect(() => {
    const fetchTestResponse = async () => {
      try {
        const testResponse = await getBankTest();
        console.log("Test response:", testResponse);
      } catch (error) {
        console.error("Error fetching test response:", error);
      }
    };

    fetchTestResponse();
  }, []);

  return (
    <div className="app">
      <Header />
      {!gameStarted ? (
        <Startgame onStartGame={handleStartGame} />
      ) : gameOver ? (
        <Gameover onRestart={handleRestartGame} score={score} />
      ) : (
        <>
          <MoleBoard
            onGameover={handleGameOver}
            updateScore={handleScoreUpdate}
          />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
