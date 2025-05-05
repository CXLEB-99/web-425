import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterListComponent, Character } from './character-list.component';
import { By } from '@angular/platform-browser';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display character names when characters exist', () => {
    const testCharacters: Character[] = [
      { id: 1, name: 'A', gender: 'Male', charClass: 'W', faction: 'X' },
      { id: 2, name: 'B', gender: 'Female', charClass: 'M', faction: 'Y' }
    ];

    component.characters = testCharacters;
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent).toContain('A');
    expect(listItems[1].nativeElement.textContent).toContain('B');
  });

  it('should show fallback text when character list is empty', () => {
    component.characters = [];
    fixture.detectChanges();

    const fallback = fixture.debugElement.query(By.css('p'));
    expect(fallback.nativeElement.textContent).toContain('No characters created yet.');
  });
});
