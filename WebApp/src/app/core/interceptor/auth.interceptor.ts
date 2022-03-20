import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../../core/services/token-storage.service';
import { AuthenticationService } from '../../core/services/authentication.service';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';       


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private token: TokenStorageService, private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
      // for Spring Boot back-end
      //authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

      // for Node.js Express back-end
      //authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    return next.handle(authReq).pipe(catchError(error => {
      // if (error instanceof HttpErrorResponse && !authReq.url.includes('Authenticate/login') && error.status === 401) {
      //   return this.handle401Error(authReq, next);
      // }

      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

     // const token = this.token.getRefreshToken();

      // if (token)
      //   return this.authService.refreshToken(token).pipe(
      //     switchMap((token: any) => {
      //       this.isRefreshing = false;

      //       this.token.saveToken(token.accessToken);
      //       this.refreshTokenSubject.next(token.accessToken);

      //       return next.handle(this.addTokenHeader(request, token.accessToken));
      //     }),
      //     catchError((err) => {
      //       this.isRefreshing = false;

      //       this.token.signOut();
      //       return throwError(err);
      //     })
      //   );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    /* for Spring Boot back-end */
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

    /* for Node.js Express back-end */
    //return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
