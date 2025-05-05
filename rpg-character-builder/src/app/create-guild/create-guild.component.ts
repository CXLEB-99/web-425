// create-guild.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuildListComponent, Guild } from '../guild-list/guild-list.component';

@Component({
  selector: 'app-create-guild',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GuildListComponent
  ],
  template: `
    <div class="create-guild-container">
      <form [formGroup]="guildForm" (ngSubmit)="onSubmit()">
        <h2>Create Guild</h2>

        <label for="name">Name:</label>
        <input id="name" formControlName="name" />

        <label for="description">Description:</label>
        <input id="description" formControlName="description" />

        <label for="type">Type:</label>
        <select id="type" formControlName="type">
          <option value="" disabled>Select...</option>
          <option *ngFor="let t of types">{{ t }}</option>
        </select>

        <label for="notificationPreference">Notify via:</label>
        <select id="notificationPreference" formControlName="notificationPreference">
          <option value="" disabled>Select...</option>
          <option *ngFor="let n of notifications">{{ n }}</option>
        </select>

        <label class="terms">
          <input type="checkbox" formControlName="acceptTerms" />
          Accept Terms
        </label>

        <button type="submit" [disabled]="guildForm.invalid">
          Add Guild
        </button>
      </form>

      <div class="guild-list">
        <h2>Created Guilds</h2>
        <app-guild-list [guilds]="guilds"></app-guild-list>
      </div>
    </div>
  `,
  styles: [`
    .create-guild-container {
      display: flex;
      gap: 20px;
    }
    form, .guild-list { flex: 1; }
    label { display: block; margin-bottom: 6px; }
    input, select, button { display: block; margin-bottom: 12px; width: 100%; }
    .terms { margin-top: 8px; }
    button { width: auto; padding: 6px 12px; }
  `]
})
export class CreateGuildComponent {
  @Output() guildCreated = new EventEmitter<Guild>();

  guildForm: FormGroup;
  guilds: Guild[] = [];

  types = ['Competitive', 'Casual', 'Social', 'Educational'];
  notifications = ['Email', 'SMS', 'In-App'];

  constructor(private fb: FormBuilder) {
    this.guildForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      notificationPreference: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.guildForm.invalid) return;

    const newGuild: Guild = {
      name: this.guildForm.value.name.trim(),
      description: this.guildForm.value.description.trim(),
      type: this.guildForm.value.type,
      notificationPreference: this.guildForm.value.notificationPreference
    };

    this.guilds.push(newGuild);
    this.guildCreated.emit(newGuild);

    this.guildForm.reset({
      name: '',
      description: '',
      type: '',
      notificationPreference: '',
      acceptTerms: false
    });
  }
}
