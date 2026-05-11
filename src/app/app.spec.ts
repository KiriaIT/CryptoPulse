import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';
import { APP_CONFIG, AppConfig } from './core/tokens/app-config.token';

const TEST_CONFIG: AppConfig = {
  production: false,
  apiBaseUrl: 'http://localhost:0/api',
  appName: 'Crypto Pulse (test)',
};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), { provide: APP_CONFIG, useValue: TEST_CONFIG }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the shell with app name', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.shell__brand')?.textContent).toContain(TEST_CONFIG.appName);
  });
});
