import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../model/user';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtLoginFake implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const fakeUserData: User[] = [{
            id: 1,
            username: 'lasso',
            password: 'lasso'
        }];
        const {url, method, headers, body } = request;

        const {username, passoword } = body;
        const dummyUser = fakeUserData.find(x => x.username === username && x.password === passoword);

        if(!dummyUser) return error("Please check your credentials");
        return dataIsOk({
            id: dummyUser.id,
            username: dummyUser
        })

        function dataIsOk(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }
    }
}

export let fetLoginProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: JwtLoginFake,
    multi: true
};