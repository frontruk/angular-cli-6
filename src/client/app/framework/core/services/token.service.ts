import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import {
  Inject,
  Injectable,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class TokenService {
  public jwtHelper: JwtHelper = new JwtHelper();

  constructor(@Inject(PLATFORM_ID) public platformId: Object) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string): string {
    if (isPlatformBrowser(this.platformId))
      localStorage.setItem('token', token);

      return 'done';
  }
  isAuthenticated(): boolean {
    /**
     * Get the token
     */
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();

      return this.jwtHelper.isTokenExpired(token);
    }
  }
}
