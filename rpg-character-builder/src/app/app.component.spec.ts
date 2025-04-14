// app.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayersComponent } from './players/players.component';
import { Routes, Router } from '@angular/router';

describe('AppComponent (Standalone)', () => {
  beforeEach(async () => {
    const routes: Routes = [
      { path: 'players', component: PlayersComponent },
    ];

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), AppComponent, PlayersComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have correct route for PlayersComponent', () => {
    const router = TestBed.inject(Router);
    const route = router.config.find((r) => r.path === 'players');
    expect(route).toBeDefined();
    if (route) {
      expect(route.component).toBe(PlayersComponent);
    }
  });
});