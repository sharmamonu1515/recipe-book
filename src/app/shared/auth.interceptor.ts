import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercepted  ', req);
        const copiedRequest = req.clone({params: req.params.set('auth', this.authService.getToken()) })
        return next.handle(copiedRequest);
    }

}