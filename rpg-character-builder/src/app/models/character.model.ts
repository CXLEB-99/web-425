import { Component } from '@angular/core';

export interface Character {
  name: string;
  gender: string;
  class: string;
  faction: string;
  startingLocation: string;
  funFact: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent {
  characters: Character[] = [
    { name: 'Thorn', gender: 'Male', class: 'Warrior', faction: 'The Iron Brotherhood', startingLocation: 'Ironhold', funFact: 'Thorn once single-handedly defeated a dragon.' },
    { name: 'Lyra', gender: 'Female', class: 'Mage', faction: 'The Silver Covenant', startingLocation: 'Eldoria', funFact: 'Lyra can control the elements with her mind.' },
    { name: 'Zephyr', gender: 'Other', class: 'Rogue', faction: 'The Shadow Syndicate', startingLocation: 'Nighthaven', funFact: 'Zephyr is a master of stealth and deception.' },
    { name: 'Grom', gender: 'Male', class: 'Warrior', faction: 'The Wild Horde', startingLocation: 'Grommar', funFact: 'Grom is known for his unmatched strength.' },
    { name: 'Anya', gender: 'Female', class: 'Priest', faction: 'The Dawn Order', startingLocation: 'Sanctuary', funFact: 'Anya has healed countless warriors on the battlefield.' },
    { name: 'Kael', gender: 'Male', class: 'Mage', faction: 'The Arcane Circle', startingLocation: 'Mysthaven', funFact: 'Kael is a prodigy in arcane magic.' },
    { name: 'Riven', gender: 'Female', class: 'Rogue', faction: 'The Shadow Syndicate', startingLocation: 'Nighthaven', funFact: 'Riven is a skilled assassin.' },
    { name: 'Doran', gender: 'Male', class: 'Warrior', faction: 'The Iron Brotherhood', startingLocation: 'Ironhold', funFact: 'Doran is Thorn’s closest ally.' },
    { name: 'Eira', gender: 'Female', class: 'Mage', faction: 'The Silver Covenant', startingLocation: 'Eldoria', funFact: 'Eira specializes in frost magic.' },
    { name: 'Fenrir', gender: 'Other', class: 'Hunter', faction: 'The Wild Horde', startingLocation: 'Grommar', funFact: 'Fenrir is a beastmaster.' },
  ];
}