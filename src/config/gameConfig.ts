import { GameConfig } from "../types/types";

export const GAME_CONFIG: GameConfig = {
  AMUSEMENT_ID: 9, // Default value, override with env if available
  GROUP_ID: 2,
  COST: 2, //Hämta från databas
  CURRENCY: "EUR",
  STAMP_ID: 11, // Hämta från databas
};

//console.log("Game configuration:", GAME_CONFIG);
