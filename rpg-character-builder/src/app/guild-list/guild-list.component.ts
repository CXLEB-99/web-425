import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Guild {
  name: string;
  description: string;
  type: string;
  notificationPreference: string;
}

@Component({
  selector: 'app-guild-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Guilds</h3>
    <ul *ngIf="guilds.length; else none">
      <li *ngFor="let g of guilds">
        <strong>{{ g.name }}</strong> — {{ g.description }}<br>
        Type: {{ g.type }}<br>
        Notify via: {{ g.notificationPreference }}
      </li>
    </ul>
    <ng-template #none>
      <p>No guilds created yet.</p>
    </ng-template>
  `
})
export class GuildListComponent {
  @Input() guilds: Guild[] = [];
}
