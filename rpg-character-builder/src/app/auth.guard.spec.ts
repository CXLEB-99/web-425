import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('authGuard', () => {
  let guard: CanActivateFn;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [CookieService],
    });
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
    guard = TestBed.runInInjectionContext(() => authGuard); // Get the guard within the test context
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if session_user cookie exists', () => {
    spyOn(cookieService, 'get').and.returnValue('test@example.com');
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    expect(TestBed.runInInjectionContext(() => guard(route, state))).toBe(true);
  });

  it('should return false and navigate to /signin if session_user cookie does not exist', () => {
    spyOn(cookieService, 'get').and.returnValue(''); // Return an empty string instead
    const routerSpy = spyOn(router, 'navigate');
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/create-character' } as RouterStateSnapshot;
  
    expect(TestBed.runInInjectionContext(() => guard(route, state))).toBe(false);
    expect(routerSpy).toHaveBeenCalledWith(['/signin'], { queryParams: { returnUrl: '/create-character' } });
  });
});