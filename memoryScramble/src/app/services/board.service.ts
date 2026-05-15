import { Injectable } from '@angular/core';
import { BoardConfig, Card } from '../models/game';

const ICONS: string[] = [
  '🐶', '🐱', '🦊', '🐸', '🦋', '🌸', '⭐', '🎃',
  '🍕', '🎸', '🚀', '🌈', '🦄', '🎯', '🍩', '🔮',
  '🐙', '🌵', '🎨', '🏆', '🦁', '🐧', '🍎', '🎲',
  '❄️','🍇', '🧋', '🍣', '🏓', '📸', '🌚', '💍',
];

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  private shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  generateCards (config: BoardConfig): Card[] {
    const totalCards = config.nRows * config.nColumns;
    const totalPairs = totalCards / 2;

    if (totalPairs > ICONS.length) {
      throw new Error(`Not enough unique icons to generate ${totalPairs} pairs. Max pairs: ${ICONS.length}`);
    }

    const selectedIcons = this.shuffle([ ...ICONS ]).slice(0, totalPairs);
    const cards: Card[] = [];

    selectedIcons.forEach((icon, pairId) => {
      cards.push({ id: pairId * 2, icon, pairId, isFlipped: false, isMatched: false });
      cards.push({ id: pairId * 2 + 1 , icon, pairId, isFlipped: false, isMatched: false });
    });
    return this.shuffle(cards);
  }

}
