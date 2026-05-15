export interface BoardConfig {
  nRows: number;
  nColumns: number;
  timeoutSeconds: number;
}

export interface Card {
  id: number;
  icon: string;
  pairId: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export enum GameStatus {
  IDLE = 'idle',
  PLAYING = 'playing',
  WON = 'won',
  LOST = 'lost',
}

export interface GameState {
  config: BoardConfig;
  cards: Card[];
  status: GameStatus;
  timeLeft: number;
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  flippedCardIds: number[];
}