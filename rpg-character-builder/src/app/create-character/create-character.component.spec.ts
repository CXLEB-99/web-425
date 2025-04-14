// create-character.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCharacterComponent } from './create-character.component';
import { FormsModule } from '@angular/forms';

describe('CreateCharacterComponent', () => {
  let component: CreateCharacterComponent;
  let fixture: ComponentFixture<CreateCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCharacterComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a random character ID between 1 and 1000 with no decimal places', () => {
    component.addCharacter();
    expect(component.characters[0].id).toBeGreaterThan(0);
    expect(component.characters[0].id).toBeLessThanOrEqual(1000);
    expect(Number.isInteger(component.characters[0].id)).toBe(true);
  });

  it('should add a character with correct customization', () => {
    component.characterForm.name = 'Test Character';
    component.characterForm.gender = 'Male';
    component.characterForm.class = 'Warrior';
    component.addCharacter();

    const addedCharacter = component.characters[0];
    expect(addedCharacter.name).toBe('Test Character');
    expect(addedCharacter.gender).toBe('Male');
    expect(addedCharacter.class).toBe('Warrior');
  });

  it('should reset all form fields to their default values after resetForm is called', () => {
    component.characterForm.name = 'Test Character';
    component.characterForm.gender = 'Female';
    component.characterForm.class = 'Mage';
    component.resetForm();

    expect(component.characterForm.name).toBe('');
    expect(component.characterForm.gender).toBe('Male');
    expect(component.characterForm.class).toBe('Warrior');
  });
});