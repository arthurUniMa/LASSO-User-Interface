import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private behaviorUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.behaviorUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.behaviorUserSubject.asObservable();
    }

    public get currentUserData(): User {
        return this.behaviorUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.behaviorUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.behaviorUserSubject.next(null);
    }
}