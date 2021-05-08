import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, exhaustMap, take } from 'rxjs/operators';

import { AuthenticationService } from '../authentication/authentication.service'

@Injectable()
export class LogginInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private router: Router) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const basicAuth = this.authService.getBasicAuth();

        // if(basicAuth && !request.headers.has('Authorization')){
        //     request = request.clone({
        //         setHeaders: { Authorization: 'Basic ' + basicAuth }
        //     });
        // }

        // return next.handle(request);

        // return next.handle(request).pipe(catchError( err => {
        //     // Error catching might be better suited to be split up into a different interceptor
        //     if(err.status == 401){
        //     }
        //     return throwError(err);
        // }));


        return this.authService.userSubject.pipe(
            take(1),
            exhaustMap(user => {
              if (!user) {
                return next.handle(req);
              }
              const modifiedReq = req.clone({
                params: new HttpParams().set('auth', user.role)
              });
              return next.handle(modifiedReq);
            })
          );
    }
}
