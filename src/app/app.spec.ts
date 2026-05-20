import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';

import { App } from './app';
import { routes } from './app.routes';
import { MarketDataService } from './core/services/market-data.service';
import { APP_CONFIG, AppConfig } from './core/tokens/app-config.token';

const TEST_CONFIG: AppConfig = {
  production: false,
  apiBaseUrl: 'http://localhost:0/api',
  appName: 'Crypto Pulse (test)',
  supabaseUrl: 'http://localhost:0',
  supabaseAnonKey: 'test-anon-key',
};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        { provide: APP_CONFIG, useValue: TEST_CONFIG },
        {
          provide: MarketDataService,
          useValue: {
            getTickerSnapshot: () => of([]),
          } satisfies Pick<MarketDataService, 'getTickerSnapshot'>,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the shell with app name', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    await router.navigateByUrl('/');
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const brand = compiled.querySelector('.shell__brand')?.textContent ?? '';
    expect(brand).toContain(TEST_CONFIG.appName);
  });
});
