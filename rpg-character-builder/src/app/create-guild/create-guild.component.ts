// create-guild.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface Guild {
  guildName: string;
  description: string;
  type: string;
  notificationPreference: string;
}

@Component({
  selector: 'app-create-guild',
  standalone: true,
  imports: [
    CommonModule,         // for *ngIf, *ngFor
    ReactiveFormsModule   // for [formGroup], formControlName, etc.
  ],
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css']
})
export class CreateGuildComponent {
  guildForm: FormGroup;
  guilds: Guild[] = [];

  types = ['Competitive', 'Casual', 'Social', 'Educational'];
  notifications = ['Email', 'SMS', 'In-App'];

  constructor(private fb: FormBuilder) {
    this.guildForm = this.fb.group({
      guildName:           ['', Validators.required],
      description:         ['', Validators.required],
      type:                ['', Validators.required],
      notificationPreference: ['', Validators.required],
      acceptTerms:         [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.guildForm.invalid) {
      return;
    }
    this.guilds.push(this.guildForm.value);
    this.guildForm.reset();
  }
}
