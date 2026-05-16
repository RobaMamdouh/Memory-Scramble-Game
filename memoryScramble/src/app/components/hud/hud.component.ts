import { Component , Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameState } from '../../models/game';

@Component({
  selector: 'app-hud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hud.component.html',
  styleUrl: './hud.component.scss'
})
export class HudComponent {
  @Input() state!: GameState;
  @Output() restart = new EventEmitter<void>();

  get timerClass(): string {
    if (this.state.timeLeft <= 10) return 'danger';
    if (this.state.timeLeft <= 20) return 'warn';
    return '';
  }
}
