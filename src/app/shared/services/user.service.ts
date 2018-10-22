import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiService } from "./api.service";
import { Http } from "@angular/http";
import { User } from "../models";
import { map } from "rxjs/operators";

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable();
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor (
        private apiService: ApiService,
        private http: Http
    ) {}

    setAuth(user: User) {
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
    }

    attemptAuth(type, credentials): Observable<User> {
        let route = (type === 'login') ? '/login' : '';
        console.log({'user':credentials});
        return this.apiService.post('/users' + route, {user: credentials})
        .pipe(
            map(
            data => {
                this.setAuth(data);
                return data;
            }
        ));
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }
}