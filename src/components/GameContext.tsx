"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

import { getCost, getStampId } from "@/utils/helpers";

interface GameContextProps {
  gameStarted: boolean;
  setGameStarted: (gameStarted: boolean) => void;
  score: number;
  setScore: (score: number) => void;
  gameOver: boolean;
  setGameOver: (gameOver: boolean) => void;
  hasPaid: boolean;
  setHasPaid: (hasPaid: boolean) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  paymentError: string | null;
  setPaymentError: (error: string | null) => void;
  jwtToken: string | null;
  setJwtToken: (token: string | null) => void;
  handleStartGame: () => void;
  handleRestartGame: () => void;
  handleGameOver: () => void;
  handleScoreUpdate: (newScore: number) => void;
  cost: number;
  stampId: number;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [hasPaid, setHasPaid] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [cost, setCost] = useState<number>(4);
  const [stampId, setStampId] = useState<number>(11);

  useEffect(() => {
    const initializeGameConfig = async () => {
      try {
        const fetchedCost = await getCost();
        const fetchedStampId = await getStampId();

        if (fetchedCost !== null) {
          setCost(fetchedCost);
        }
        if (fetchedStampId !== null) {
          setStampId(fetchedStampId);
        }
      } catch (error) {
        console.error("Error initializing game configuration:", error);
      }
    };

    initializeGameConfig();
  }, []);

  const handleStartGame = (): void => {
    setGameStarted(true);
    setGameOver(false);
  };

  const handleRestartGame = (): void => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
  };

  const handleGameOver = (): void => {
    setGameOver(true);
  };

  const handleScoreUpdate = (newScore: number): void => {
    setScore(newScore);
  };

  return (
    <GameContext.Provider
      value={{
        gameStarted,
        setGameStarted,
        score,
        setScore,
        gameOver,
        setGameOver,
        hasPaid,
        setHasPaid,
        isProcessing,
        setIsProcessing,
        paymentError,
        setPaymentError,
        jwtToken,
        setJwtToken,
        handleStartGame,
        handleRestartGame,
        handleGameOver,
        handleScoreUpdate,
        cost,
        stampId,
      }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
