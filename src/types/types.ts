export interface MoleState {
    id: number;
    active: boolean;
  }
  
export interface GameState {
    moles: MoleState[];
    score: number;
  }
  