import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameState, GameStatus } from './models/game';

import { ConfigComponent } from './components/config/config.component';
import { BoardComponent } from './components/board/board.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ConfigComponent, BoardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  previewState: GameState = {
    config: { nRows: 2, nColumns: 2, timeoutSeconds: 60 },
    cards: [
      { id: 1, icon: '🍎', pairId: 1, isFlipped: false, isMatched: false },
      { id: 2, icon: '🍌', pairId: 2, isFlipped: false, isMatched: false },
      { id: 3, icon: '🍎', pairId: 1, isFlipped: false, isMatched: false },
      { id: 4, icon: '🍌', pairId: 2, isFlipped: false, isMatched: false },
    ],
    status: GameStatus.PLAYING,
    timeLeft: 60,
    moves: 0,
    matchedPairs: 0,
    totalPairs: 2,
    flippedCardIds: [],
  };

  onPreviewFlip(id: number): void {
    if (this.previewState.flippedCardIds.length >= 2) return;
    const card = this.previewState.cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;
    card.isFlipped = true;
    this.previewState.flippedCardIds.push(id);

    if (this.previewState.flippedCardIds.length === 2) {
      const [aId, bId] = this.previewState.flippedCardIds;
      const a = this.previewState.cards.find((c) => c.id === aId)!;
      const b = this.previewState.cards.find((c) => c.id === bId)!;
      this.previewState.moves++;
      if (a.pairId === b.pairId) {
        a.isMatched = true;
        b.isMatched = true;
        this.previewState.matchedPairs++;
        this.previewState.flippedCardIds = [];
      } else {
        setTimeout(() => {
          a.isFlipped = false;
          b.isFlipped = false;
          this.previewState.flippedCardIds = [];
        }, 800);
      }
    }
  }
}
