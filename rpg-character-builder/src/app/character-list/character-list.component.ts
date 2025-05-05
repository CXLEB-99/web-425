import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Character {
  id: number;
  name: string;
  gender: string;
  charClass: string;
  faction: string;
}

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Characters</h3>
    <ul *ngIf="characters.length; else none">
      <li *ngFor="let c of characters">
        {{ c.name }} — {{ c.charClass }} ({{ c.faction }})
      </li>
    </ul>
    <ng-template #none>
      <p>No characters created yet.</p>
    </ng-template>
  `
})
export class CharacterListComponent {
  @Input() characters: Character[] = [];
}
