import { Component,Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameState, GameStatus } from '../../models/game';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss'
})
export class GameOverComponent {

  @Input() state!: GameState;
  @Output() playAgain = new EventEmitter<void>();

  get isWin(): boolean {
    return this.state.status === GameStatus.WON;
  }
}
