import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGuildComponent } from './create-guild.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CreateGuildComponent', () => {
  let component: CreateGuildComponent;
  let fixture: ComponentFixture<CreateGuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateGuildComponent],
      imports: [ReactiveFormsModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.guildForm.valid).toBeFalse();
  });

  it('acceptTerms must be checked', () => {
    component.guildForm.patchValue({
      guildName: 'My Guild',
      description: 'Just testing',
      type: 'Casual',
      notificationPreference: 'Email',
      acceptTerms: false
    });
    expect(component.guildForm.valid).toBeFalse();
    expect(component.guildForm.get('acceptTerms')!.hasError('required')).toBeTrue();
  });

  it('form should be valid when all required fields are filled and terms accepted', () => {
    component.guildForm.patchValue({
      guildName: 'My Guild',
      description: 'Just testing',
      type: 'Competitive',
      notificationPreference: 'SMS',
      acceptTerms: true
    });
    expect(component.guildForm.valid).toBeTrue();
  });

  it('should call onSubmit and add guild on valid submit', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.guildForm.setValue({
      guildName: 'Testers',
      description: 'QA heroes',
      type: 'Educational',
      notificationPreference: 'In-App',
      acceptTerms: true
    });
    fixture.detectChanges();

    const formEl = fixture.debugElement.query(By.css('form'));
    formEl.triggerEventHandler('ngSubmit', null);

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.guilds.length).toBe(1);
    expect(component.guilds[0].guildName).toBe('Testers');
  });
});
