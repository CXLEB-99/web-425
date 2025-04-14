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
        <input type="text" id="name" name="name" [(ngModel)]="characterForm.name" required />

        <label for="gender">Gender:</label>
        <select id="gender" name="gender" [(ngModel)]="characterForm.gender" required>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label for="class">Class:</label>
        <select id="class" name="class" [(ngModel)]="characterForm.class" required>
          <option value="Warrior">Warrior</option>
          <option value="Mage">Mage</option>
          <option value="Rogue">Rogue</option>
        </select>

        <button type="submit">Create Character</button>
      </form>

      <div class="character-list">
        <h2>Created Characters</h2>
        <table *ngIf="characters.length > 0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let character of characters">
              <td>{{ character.id }}</td>
              <td>{{ character.name }}</td>
              <td>{{ character.gender }}</td>
              <td>{{ character.class }}</td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="characters.length === 0">No characters created yet.</p>
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
  characterForm: any = {
    name: '',
    gender: 'Male',
    class: 'Warrior',
  };

  addCharacter() {
    const newCharacter: Character = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: this.characterForm.name,
      gender: this.characterForm.gender,
      class: this.characterForm.class,
    };
    this.characters.push(newCharacter);
    this.resetForm();
  }

  resetForm() {
    this.characterForm.name = '';
    this.characterForm.gender = 'Male';
    this.characterForm.class = 'Warrior';
  }
}