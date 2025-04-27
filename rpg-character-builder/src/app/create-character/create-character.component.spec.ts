import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreateCharacterComponent } from './create-character.component';
import { CommonModule } from '@angular/common';

describe('CreateCharacterComponent', () => {
  let component: CreateCharacterComponent;
  let fixture: ComponentFixture<CreateCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, CreateCharacterComponent],
      // You might need to mock services injected into CreateCharacterComponent here
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
    expect(component.characters.length).toBe(initialLength + 1);
    expect(component.characters[component.characters.length - 1].name).toBe('Test Character');
    expect(component.characters[component.characters.length - 1].gender).toBe('Female');
    expect(component.characters[component.characters.length - 1].class).toBe('Mage');
    expect(component.characters[component.characters.length - 1].id).toBeGreaterThan(0);
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
});