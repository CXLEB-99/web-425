import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="wrapper">
      <header class="banner">
        <h1>RPG Character Builder</h1>
      </header>
      <div class="sign-in-container">
        @if (isAuthenticated) {
          <p>Welcome, {{ email }}!</p>
          <button (click)="signout()">Sign Out</button>
        } @else {
          <a routerLink="/signin" class="sign-in-link">Sign In</a>
        }
      </div>
      <main class="main-content">
        <nav class="navbar">
          <ul>
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/create-character">Create Character</a></li>
            <li><a routerLink="/view-characters">View Characters</a></li>
          </ul>
        </nav>
        <section class="content">
          <router-outlet />
        </section>
      </main>
      <footer class="footer">
        <nav class="footer-nav">
          <a routerLink="/">Home</a> |
          <a routerLink="/create-character">Create Character</a> |
          <a routerLink="/view-characters">View Characters</a> |
          <a routerLink="/signin">Sign In</a>
        </nav>
        <p>&copy; 2025 RPG Character Builder</p>
      </footer>
    </div>
  `,
  styles: [`
    .wrapper {
      font-family: sans-serif;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .banner {
      background-color: #333;
      color: white;
      padding: 1em;
      text-align: center;
    }

    .sign-in-container {
      text-align: right;
      padding-right: 20px;
      margin-top: 10px;
    }

    .sign-in-link {
      color: #007bff;
      text-decoration: none;
    }

    .sign-in-link:hover {
      text-decoration: underline;
    }

    .main-content {
      display: flex;
      flex-grow: 1;
    }

    .navbar {
      background-color: #f8f9fa;
      border-right: 1px solid #eee;
      padding: 1em;
      width: 200px;
    }

    .navbar ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .navbar li {
      margin-bottom: 0.5em;
    }

    .navbar a {
      text-decoration: none;
      color: #333;
    }

    .navbar a:hover {
      color: #007bff;
    }

    .content {
      padding: 1em;
      flex-grow: 1;
    }

    .footer {
      background-color: #333;
      color: white;
      padding: 0.5em;
      text-align: center;
    }
    .footer-nav a {
      color: white;
      text-decoration: none;
      margin: 0 0.5em;
    }
    .footer-nav a:hover {
      text-decoration: underline;
    }
  `]
})
export class AppComponent implements OnInit {
  email?: string;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit() {
    this.authService.getAuthState().subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
      if (this.isAuthenticated) {
        this.email = this.cookieService.get('session_user');
      } else {
        this.email = undefined;
      }
    });
  }

  signout() {
    this.authService.signout();
  }
}