import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiService } from "./api.service";
import { User } from "../models";
import { map } from "rxjs/operators";
import { JwtService } from "./jwt.service";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable();
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor (
        private apiService: ApiService,
        private http: HttpClient,
        private jwtService: JwtService
    ) {}

    setAuth(user: User) {
        this.jwtService.saveToken(user.token);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        console.log(this.currentUserSubject);
    }

    attemptAuth(type, credentials): Observable<User> {
        let route = (type === 'login') ? '/login' : '';
        return this.apiService.post('/users' + route, {user: credentials})
        .pipe(
            map(
            data => {
                console.log(data);
                this.setAuth(data.user);
                return data;
            }
        ));
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    populate() {
        if(this.jwtService.getToken()) {
            this.apiService.get('/user')
            .subscribe(
                data => this.setAuth(data.user),
                err => this.purgeAuth()
            );
        } else {
            this.purgeAuth();
        }
    }
    purgeAuth() {
        this.jwtService.destroyToken();
        this.currentUserSubject.next({} as User);
        this.isAuthenticatedSubject.next(false);
    }

    update(user): Observable<User> {
        return this.apiService
            .put('/user', {user})
            .pipe(map(data => {
                this.currentUserSubject.next(data.user);
                return data.user;
            }));
    }
}