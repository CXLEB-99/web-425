import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="signin-form-container">
      <form [formGroup]="signinForm" (ngSubmit)="signin()" class="signin-form">
        <h2>Sign In</h2>
        <label for="email">Email:</label>
        <input type="email" id="email" formControlName="email">
        @if (signinForm.controls['email'].touched && signinForm.controls['email'].hasError('required')) {
          <small class="error">Email is required.</small>
        }
        @if (signinForm.controls['email'].touched && signinForm.controls['email'].hasError('email')) {
          <small class="error">Invalid email format.</small>
        }

        <label for="password">Password:</label>
        <input type="password" id="password" formControlName="password">
        @if (signinForm.controls['password'].touched && signinForm.controls['password'].hasError('required')) {
          <small class="error">Password is required.</small>
        }
        @if (signinForm.controls['password'].touched && signinForm.controls['password'].hasError('pattern')) {
          <small class="error">Password must be at least 8 characters and contain at least one uppercase letter and one number.</small>
        }

        <button type="submit" [disabled]="!signinForm.valid">Sign In</button>
      </form>
    </div>
  `,
  styles: [`
    .signin-form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 300px; /* Adjust as needed */
    }

    .signin-form {
      width: 300px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
    }

    h2 {
      text-align: center;
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
    }

    input[type='email'],
    input[type='password'] {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 3px;
      box-sizing: border-box;
    }

    button[type='submit'] {
      background-color: #007bff;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      width: 100%;
    }

    button[type='submit']:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .error {
      color: red;
      font-size: 0.8em;
      margin-top: 3px;
    }
  `],
})
export class SigninComponent {
  signinForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  signin(): void {
    if (this.signinForm.valid) {
      const email = this.signinForm.value.email;
      const password = this.signinForm.value.password;
      if (this.authService.signin(email, password)) {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigate([returnUrl]);
      } else {
        window.alert('Invalid email or password. Please try again.'); // <- CHANGE here
        }
      }
    }
  }
  