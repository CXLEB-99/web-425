import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SigninComponent } from './signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['signin']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, SigninComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParamMap: { get: (key: string) => null } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // 👇 Make sure spy is active BEFORE detectChanges
    spyOn(window, 'alert');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signin and navigate on success', () => {
    authServiceSpy.signin.and.returnValue(true);

    component.signinForm.controls['email'].setValue('warrior@rpg.com');
    component.signinForm.controls['password'].setValue('Sword123');
    component.signin();

    expect(authServiceSpy.signin).toHaveBeenCalledWith('warrior@rpg.com', 'Sword123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should display alert on unsuccessful signin', () => {
    authServiceSpy.signin.and.returnValue(false);

    component.signinForm.controls['email'].setValue('wrong@rpg.com');
    component.signinForm.controls['password'].setValue('WrongPass123');
    component.signin();

    expect(window.alert).toHaveBeenCalledWith('Invalid email or password. Please try again.');
  });
});
