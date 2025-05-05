// create-character.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateCharacterComponent, Character } from './create-character.component';

describe('CreateCharacterComponent', () => {
  let component: CreateCharacterComponent;
  let fixture: ComponentFixture<CreateCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
        CreateCharacterComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize newCharacter with default values', () => {
    expect(component.newCharacter).toEqual({
      name: '',
      gender: 'Male',
      class: 'Warrior',
    });
  });

  it('should add a new character to the characters array', () => {
    const initialLength = component.characters.length;
    component.newCharacter.name = 'Test Character';
    component.newCharacter.gender = 'Female';
    component.newCharacter.class = 'Mage';

    component.addCharacter();

    const added = component.characters[component.characters.length - 1];
    expect(component.characters.length).toBe(initialLength + 1);
    expect(added.name).toBe('Test Character');
    expect(added.gender).toBe('Female');
    expect(added.class).toBe('Mage');
    expect(added.id).toBeGreaterThan(0);
  });

  it('should reset the form after adding a character', () => {
    component.newCharacter.name = 'To Reset';
    component.newCharacter.gender = 'Other';
    component.newCharacter.class = 'Rogue';

    component.addCharacter();

    expect(component.newCharacter).toEqual({
      name: '',
      gender: 'Male',
      class: 'Warrior',
    });
  });

  it('should emit characterCreated when a character is added', () => {
    spyOn(component.characterCreated, 'emit');

    component.newCharacter.name = 'Emit Test';
    component.newCharacter.gender = 'Other';
    component.newCharacter.class = 'Rogue';

    component.addCharacter();

    expect(component.characterCreated.emit).toHaveBeenCalled();
    const emitted: Character = (component.characterCreated.emit as jasmine.Spy).calls.mostRecent().args[0];
    expect(emitted.name).toBe('Emit Test');
    expect(emitted.gender).toBe('Other');
    expect(emitted.class).toBe('Rogue');
    expect(emitted.id).toBeGreaterThan(0);
  });
});
