import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable()
export class ApiService {
    constructor(
        private http: Http
    ) {}

    private setHeaders(): Headers {
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        return new Headers(headersConfig);
    }

    private formatErrors(error: any) {
        console.log(JSON.parse(error._body));
        return throwError(JSON.parse(error._body));
    }

    post(path: string, body: Object = {}): Observable<any> {
        return this.http.post(`${environment.api_url}${path}`,
        JSON.stringify(body), { headers: this.setHeaders() })
        .pipe(map((res: Response) => {return (JSON.parse( res.text()))}), catchError(this.formatErrors));

    }
}
