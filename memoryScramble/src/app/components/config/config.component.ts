import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { BoardConfig } from '../../models/game';

function evenBoardValidator(control: AbstractControl): ValidationErrors | null {
 const value = control.value;
  if (value && value % 2 !== 0) {
    return { oddNumber: true };
  }
  return null;
}

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private gameService: GameService) {
    this.form = this.fb.group(
      {
        nRows:          [4, [Validators.required, Validators.min(2), Validators.max(8),evenBoardValidator]],
        nColumns:       [4, [Validators.required, Validators.min(2), Validators.max(8),evenBoardValidator]],
        timeoutSeconds: [40, [Validators.required, Validators.min(10), Validators.max(300)]],
      },
    );
  }

  onStart(): void {
    if (this.form.invalid) return;
    this.gameService.startGame(this.form.value as BoardConfig);
  }
}


