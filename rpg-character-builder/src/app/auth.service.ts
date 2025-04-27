import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

export interface User {
  empId: number;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    { empId: 2001, email: 'warrior@rpg.com', password: 'Sword123' },
    { empId: 2002, email: 'mage@rpg.com', password: 'Spell456' },
    { empId: 2003, email: 'rogue@rpg.com', password: 'Shadow789' },
  ];
  private authState = new BehaviorSubject<boolean>(this.cookieService.get('session_user') ? true : false);

  constructor(private cookieService: CookieService, private router: Router) {}

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  signin(email: string, password: string): boolean {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      this.cookieService.set('session_user', email, 1);
      this.authState.next(true);
      return true;
    } else {
      this.authState.next(false);
      return false;
    }
  }

  signout(): void {
    this.cookieService.deleteAll();
    this.authState.next(false);
    this.router.navigate(['/signin']).then(() => {});
  }
}