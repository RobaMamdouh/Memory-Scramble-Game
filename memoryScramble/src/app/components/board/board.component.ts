import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, GameState } from '../../models/game';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() state!: GameState;
  @Output() cardFlipped = new EventEmitter<number>();

  get gridStyle(): Record<string, string> {
    return { gridTemplateColumns: `repeat(${this.state.config.nColumns}, 1fr)` };
  }

  trackByCard(_: number, card: Card): number {
    return card.id;
  }
}
