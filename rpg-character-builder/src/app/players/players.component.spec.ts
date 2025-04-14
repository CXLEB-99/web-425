// players.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersComponent } from './players.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PlayersComponent', () => {
  let component: PlayersComponent;
  let fixture: ComponentFixture<PlayersComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayersComponent], // Use imports instead of declarations for standalone components
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges(); // Trigger change detection
  });

  it('should create PlayersComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of characters', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr'); // Select table rows
    expect(rows.length).toBe(10); // Ensure 10 characters are displayed
  });

  it('should correctly display a list of characters', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstRow = compiled.querySelector('tbody tr:first-child');
    expect(firstRow?.textContent).toContain('Thorn'); // Check if the first character is displayed
  });
});