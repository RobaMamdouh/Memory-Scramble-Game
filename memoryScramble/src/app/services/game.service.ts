import { Injectable, OnDestroy } from '@angular/core';
import { BoardConfig, Card, GameState, GameStatus } from '../models/game';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { BoardService } from './board.service';

const DEFAULT_CONFIG: BoardConfig = {
  nRows: 4,
  nColumns: 4,
  timeoutSeconds: 60,
};
  

@Injectable({
  providedIn: 'root'
})

export class GameService implements OnDestroy {

  private buildInitialState(): GameState {
    return {
      config: DEFAULT_CONFIG,
      cards: [],
      status: GameStatus.IDLE,
      timeLeft: DEFAULT_CONFIG.timeoutSeconds,
      moves: 0,
      matchedPairs: 0,
      totalPairs: 0,
      flippedCardIds: [],
    };
  }

  private readonly _state$ = new BehaviorSubject<GameState>(this.buildInitialState());
  readonly state$ = this._state$.asObservable();
  
  private timerSubscription: Subscription | null = null;
  private flipLock = false;

  constructor(private boardService: BoardService) {}

  get snapshot(): GameState {
    return this._state$.getValue();
  }


  private startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      const state = this.snapshot;
      if (state.status !== GameStatus.PLAYING) { this.stopTimer(); return; }

      const timeLeft = state.timeLeft - 1;
      if (timeLeft <= 0) {
        this._state$.next({ ...state, timeLeft: 0, status: GameStatus.LOST });
        this.stopTimer();
      } else {
        this._state$.next({ ...state, timeLeft });
      }
    });
  }

  private stopTimer(): void {
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = null;
  }

  private evaluatePair(): void {
    const state = this.snapshot;
    const [idA, idB] = state.flippedCardIds;
    const cardA = state.cards.find(c => c.id === idA)!;
    const cardB = state.cards.find(c => c.id === idB)!;

    const isMatch = cardA.pairId === cardB.pairId;
    const updatedCards: Card[] = state.cards.map(c => {
      if (c.id === idA || c.id === idB) {
        return isMatch
          ? { ...c, isFlipped: true,  isMatched: true }
          : { ...c, isFlipped: false, isMatched: false };
      }
      return c;
    });

    const matchedPairs = state.matchedPairs + (isMatch ? 1 : 0);
    const moves        = state.moves + 1;
    const won          = matchedPairs === state.totalPairs;

    this._state$.next({
      ...state,
      cards: updatedCards,
      flippedCardIds: [],
      moves,
      matchedPairs,
      status: won ? GameStatus.WON : state.status,
    });

    if (won) this.stopTimer();
    this.flipLock = false;
  }

  startGame(config: BoardConfig): void {
    this.stopTimer();
    const cards = this.boardService.generateCards(config);
    this._state$.next({
      config,
      cards,
      status: GameStatus.PLAYING,
      timeLeft: config.timeoutSeconds,
      moves: 0,
      matchedPairs: 0,
      totalPairs: (config.nRows * config.nColumns) / 2,
      flippedCardIds: [],
    });
    this.flipLock = false;
    this.startTimer();
  }

  flipCard(cardId: number): void {
    const state = this.snapshot;
    if (
      this.flipLock ||
      state.status !== GameStatus.PLAYING ||
      state.flippedCardIds.length >= 2
    ) return;

    const card = state.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    const updatedCards = state.cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    const flippedIds = [...state.flippedCardIds, cardId];

    this._state$.next({ ...state, cards: updatedCards, flippedCardIds: flippedIds });

    if (flippedIds.length === 2) {
      this.flipLock = true;
      setTimeout(() => this.evaluatePair(), 800);
    }
  }

  resetGame(): void {
    this.stopTimer();
    this._state$.next(this.buildInitialState());
    this.flipLock = false;
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }


}
