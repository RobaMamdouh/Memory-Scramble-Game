import { Injectable } from '@angular/core';

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
}
