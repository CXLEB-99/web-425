import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuildListComponent, Guild } from './guild-list.component';
import { By } from '@angular/platform-browser';

describe('GuildListComponent', () => {
  let component: GuildListComponent;
  let fixture: ComponentFixture<GuildListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GuildListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display guild names when guilds exist', () => {
    const testGuilds: Guild[] = [
      {
        name: 'G1',
        description: 'D1',
        type: 'Social',
        notificationPreference: 'Email'
      },
      {
        name: 'G2',
        description: 'D2',
        type: 'Competitive',
        notificationPreference: 'SMS'
      }
    ];

    component.guilds = testGuilds;
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent).toContain('G1');
    expect(listItems[1].nativeElement.textContent).toContain('G2');
  });

  it('should show fallback text when guild list is empty', () => {
    component.guilds = [];
    fixture.detectChanges();

    const fallback = fixture.debugElement.query(By.css('p'));
    expect(fallback.nativeElement.textContent).toContain('No guilds created yet.');
  });
});