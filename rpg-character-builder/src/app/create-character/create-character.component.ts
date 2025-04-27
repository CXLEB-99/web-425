// create-character.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Character {
  id: number;
  name: string;
  gender: string;
  class: string;
}

@Component({
  selector: 'app-create-character',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="create-character-container">
      <form #characterForm="ngForm" (ngSubmit)="addCharacter()">
        <h2>Create Character</h2>

        <label for="name">Name:</label>
        <input
          id="name"
          name="name"
          required
          [(ngModel)]="newCharacter.name"
        />

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

      <div class="character-list">
        <h2>Created Characters</h2>
        <table *ngIf="characters.length">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of characters">
              <td>{{ c.id }}</td>
              <td>{{ c.name }}</td>
              <td>{{ c.gender }}</td>
              <td>{{ c.class }}</td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="!characters.length">No characters created yet.</p>
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

      form {
        flex: 1;
      }

      .character-list {
        flex: 1;
      }

      label,
      input,
      select,
      button {
        display: block;
        margin-bottom: 10px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #f2f2f2;
      }
    `,
  ],
})
export class CreateCharacterComponent {
  characters: Character[] = [];

  // model for the form; renamed to avoid collision with #characterForm
  newCharacter: Omit<Character, 'id'> = {
    name: '',
    gender: 'Male',
    class: 'Warrior',
  };

  addCharacter() {
    const c: Character = {
      id: Math.floor(Math.random() * 1000) + 1,
      ...this.newCharacter,
    };
    this.characters.push(c);
    this.resetForm();
  }

  resetForm() {
    this.newCharacter = {
      name: '',
      gender: 'Male',
      class: 'Warrior',
    };
  }
}
