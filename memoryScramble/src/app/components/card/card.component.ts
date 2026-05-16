import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/game';

@Component({
  selector: 'app-card',
  standalone: true,                 
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: Card;
  @Output() cardClick = new EventEmitter<number>();

  onClick(): void {
    if (!this.card.isFlipped && !this.card.isMatched) {
      this.cardClick.emit(this.card.id);
    }
  }
}
