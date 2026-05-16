import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameState, GameStatus } from './models/game';

import { ConfigComponent } from './components/config/config.component';
import { BoardComponent } from './components/board/board.component';

import { HudComponent }      from './components/hud/hud.component';
import { GameOverComponent } from './components/game-over/game-over.component';
import { Observable } from 'rxjs';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ConfigComponent,
    BoardComponent,
    HudComponent,
    GameOverComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  state$!: Observable<GameState>;
  readonly GameStatus = GameStatus;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.state$ = this.gameService.state$;
  }

  onCardFlipped(cardId: number): void {
    this.gameService.flipCard(cardId);
  }

  onRestart(): void {
    this.gameService.resetGame();
  }

  onPlayAgain(): void {
    this.gameService.resetGame();
  }

}
