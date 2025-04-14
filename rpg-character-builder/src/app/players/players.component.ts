// players.component.ts
import { Component } from '@angular/core';
import { Character } from '../models/character.model';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngFor

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule], // Add CommonModule to imports
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent {
  characters: Character[] = [
    {
      name: 'Thorn',
      gender: 'Male',
      class: 'Warrior',
      faction: 'The Iron Brotherhood',
      startingLocation: 'Ironhold',
      funFact: 'Thorn once single-handedly defeated a dragon.',
    },
    {
      name: 'Lyra',
      gender: 'Female',
      class: 'Mage',
      faction: 'The Silver Covenant',
      startingLocation: 'Eldoria',
      funFact: 'Lyra can control the elements with her mind.',
    },
    {
      name: 'Zephyr',
      gender: 'Other',
      class: 'Rogue',
      faction: 'The Shadow Syndicate',
      startingLocation: 'Nighthaven',
      funFact: 'Zephyr is a master of stealth and deception.',
    },
    {
      name: 'Grom',
      gender: 'Male',
      class: 'Warrior',
      faction: 'The Wild Horde',
      startingLocation: 'Grommar',
      funFact: 'Grom is known for his unmatched strength.',
    },
    {
      name: 'Anya',
      gender: 'Female',
      class: 'Mage',
      faction: 'The Celestial Order',
      startingLocation: 'Astraea',
      funFact: 'Anya can heal the wounded with her magic.',
    },
    {
      name: 'Kael',
      gender: 'Male',
      class: 'Rogue',
      faction: 'The Silent Blades',
      startingLocation: 'Kaelhaven',
      funFact: 'Kael is a master assassin.',
    },
    {
      name: 'Riven',
      gender: 'Female',
      class: 'Warrior',
      faction: 'The Steel Sentinels',
      startingLocation: 'Rivenspire',
      funFact: 'Riven is a fearless warrior.',
    },
    {
      name: 'Sol',
      gender: 'Other',
      class: 'Mage',
      faction: 'The Solar Conclave',
      startingLocation: 'Solaria',
      funFact: 'Sol can manipulate light and energy.',
    },
    {
      name: 'Vex',
      gender: 'Male',
      class: 'Rogue',
      faction: 'The Venomous Fang',
      startingLocation: 'Vexis',
      funFact: 'Vex is a master of poisons.',
    },
    {
      name: 'Nova',
      gender: 'Female',
      class: 'Warrior',
      faction: 'The Starforged Legion',
      startingLocation: 'Novaria',
      funFact: 'Nova wields a legendary sword.',
    },
  ];
}