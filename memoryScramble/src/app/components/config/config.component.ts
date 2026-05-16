import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { BoardConfig } from '../../models/game';

function evenBoardValidator(control: AbstractControl): ValidationErrors | null {
  const rows = control.get('nRows')?.value;
  const cols = control.get('nColumns')?.value;
  if (rows && cols && (rows * cols) % 2 !== 0) {
    return { oddBoard: true };
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
        nRows:          [4, [Validators.required, Validators.min(2), Validators.max(8)]],
        nColumns:       [4, [Validators.required, Validators.min(2), Validators.max(8)]],
        timeoutSeconds: [60, [Validators.required, Validators.min(10), Validators.max(300)]],
      },
      { validators: evenBoardValidator }
    );
  }

  onStart(): void {
    if (this.form.invalid) return;
    this.gameService.startGame(this.form.value as BoardConfig);
  }
}
