import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import MoleBoard from "./components/MoleBoard/MoleBoard";
import Startgame from "./components/Startgame/Startgame";
import Gameover from "./components/Gameover/Gameover";


function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  //const [score, setScore] = useState<number>(0);
  
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

  return (
    <div className="app">
      {!gameStarted ? (
        <Startgame onStartGame={handleStartGame} />
      ) : gameOver ? (
        <Gameover onRestart={handleRestartGame} />

      ) : (
        <>
          <Header />
          <h1>Whack-a-Mole!</h1>

           <MoleBoard/>

          <Footer />
        </>
      )}
    </div>
  );
}

export default App;