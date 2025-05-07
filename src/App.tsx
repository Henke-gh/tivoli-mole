import  { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Startgame from "./components/Startgame/Startgame";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <Startgame onStartGame={handleStartGame} />
      ) : (
        <>
          <Header />
          <h1>Whack-a-Mole!</h1>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
