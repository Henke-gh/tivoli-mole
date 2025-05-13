export interface MoleState {
    id: number;
    active: boolean;
    whacked: boolean;
  }
  
export interface GameState {
    moles: MoleState[];
    score: number;
  }
  