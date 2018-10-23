import { Injectable } from "@angular/core";
import { Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { JwtService } from "./jwt.service";

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
        private jwtService: JwtService
    ) { }

    private setHeaders(): Headers {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        return new Headers(headersConfig);
    }

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(`${environment.api_url}${path}`,
            JSON.stringify(body))
            .pipe(catchError(this.formatErrors));

    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.api_url}${path}`,{ params })
            .pipe(catchError(this.formatErrors));
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http.put(
            `${environment.api_url}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }
    delete(path): Observable<any> {
        return this.http.delete(
            `${environment.api_url}${path}`
        ).pipe(catchError(this.formatErrors));
    }
}
