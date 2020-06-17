import { TestBed } from '@angular/core/testing';

import { SecretInterceptorInterceptor } from './secret-interceptor.interceptor';

describe('SecretInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SecretInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SecretInterceptorInterceptor = TestBed.inject(SecretInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
