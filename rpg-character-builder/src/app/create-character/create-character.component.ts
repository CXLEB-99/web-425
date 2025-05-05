// create-character.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CharacterListComponent } from '../character-list/character-list.component';

export interface Character {
  id: number;
  name: string;
  gender: string;
  class: string;
}

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,

    CharacterListComponent
  ],
  template: `
    <div class="create-character-container">
      <form #characterForm="ngForm" (ngSubmit)="addCharacter()">
        <h2>Create Character</h2>

        <!-- Name -->
        <label for="name">Name:</label>
        <input
          id="name"
          name="name"
          required
          [(ngModel)]="newCharacter.name"
        />

        <!-- Gender -->
        <label for="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          required
          [(ngModel)]="newCharacter.gender"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <!-- Class -->
        <label for="class">Class:</label>
        <select
          id="class"
          name="class"
          required
          [(ngModel)]="newCharacter.class"
        >
          <option>Warrior</option>
          <option>Mage</option>
          <option>Rogue</option>
        </select>

        <button type="submit">Create Character</button>
      </form>

      <!-- Delegate list rendering -->
      <div class="character-list">
        <h2>Created Characters</h2>
        <app-character-list [characters]="characters"></app-character-list>
      </div>
    </div>
  `,
  styles: [
    `
      .create-character-container {
        display: flex;
        justify-content: space-between;
        gap: 20px;
      }
      form, .character-list { flex: 1; }
      label, input, select, button { display: block; margin-bottom: 10px; }
    `,
  ],
})
export class CreateCharacterComponent {
  @Output() characterCreated = new EventEmitter<Character>();

  characters: Character[] = [];

  newCharacter: Omit<Character, 'id'> = {
    name: '',
    gender: 'Male',
    class: 'Warrior',
  };

  addCharacter() {
    // generate a random id
    const c: Character = {
      id: Math.floor(Math.random() * 1000) + 1,
      ...this.newCharacter,
    };

    // update local list
    this.characters.push(c);

    // notify any parent/listener
    this.characterCreated.emit(c);

    // clear form
    this.resetForm();
  }

  /** Reset form back to defaults */
  private resetForm() {
    this.newCharacter = {
      name: '',
      gender: 'Male',
      class: 'Warrior',
    };
  }
}
