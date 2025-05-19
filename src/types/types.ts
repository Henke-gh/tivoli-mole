export interface MoleState {
  id: number;
  active: boolean;
  whacked: boolean;
}

export interface GameState {
  moles: MoleState[];
  score: number;
}

export interface WhackAMoleGameProps {
  onGameover?: () => void;
  updateScore?: (score: number) => void;
}

export interface bankTest {
  message: string;
  timestamp: string;
  headers: string;
}

// STRUCTURE of the Score table
export interface Score {
  id: number;
  created_at: string;
  name: string;
  score: number;
}
