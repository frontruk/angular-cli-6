import {
  Inject,
  Injectable,
  PLATFORM_ID
} from '@angular/core';
import { LocationStrategy } from '@angular/common';
import {
  HttpErrorResponse, HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor( @Inject(PLATFORM_ID) public platformId: Object,
               private tokenService: TokenService,
               private locationStrategy: LocationStrategy,
               ) {}
  addToken(req: HttpRequest<any>, token: string | '' ): HttpRequest<any> {
    if (token === undefined || token === null) return;
    return req.clone({ setHeaders: { Authorization: token, 'Site-Base-Path':  this.locationStrategy.getBaseHref() }});
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('http://localhost:2628'))  return next.handle(req);



    if (this.tokenService.getToken() === null)  return next.handle(req);
      return next.handle(this.addToken(req, this.tokenService.getToken()))
        .do((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse){
            if (err.status === 401) {
              // redirect to login
             // console.log('err', err);
            }
          }
        });
    }
}
