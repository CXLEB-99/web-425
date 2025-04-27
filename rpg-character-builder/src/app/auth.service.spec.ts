import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

describe('AuthService', () => {
  let service: AuthService;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CookieService', ['set', 'deleteAll', 'get']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: CookieService, useValue: spy },
      ],
    });

    service = TestBed.inject(AuthService);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set cookie and authState to true on successful signin', (done) => {
    const result = service.signin('warrior@rpg.com', 'Sword123'); // ✅ your real user
    expect(result).toBeTrue();
    expect(cookieServiceSpy.set.calls.count()).toBe(1);

    service.getAuthState().subscribe(state => {
      expect(state).toBeTrue();
      done();
    });
  });

  it('should not set cookie and authState to true on unsuccessful signin', (done) => {
    const result = service.signin('wrong@rpg.com', 'WrongPassword'); // ❌ intentionally bad
    expect(result).toBeFalse();
    expect(cookieServiceSpy.set.calls.count()).toBe(0);

    service.getAuthState().subscribe(state => {
      expect(state).toBeFalse();
      done();
    });
  });

  it('should clear cookie and set authState to false on signout', (done) => {
    service.signout();
    expect(cookieServiceSpy.deleteAll.calls.count()).toBe(1);

    service.getAuthState().subscribe(state => {
      expect(state).toBeFalse();
      done();
    });
  });
});
