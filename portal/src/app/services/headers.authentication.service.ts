import { catchError } from 'rxjs/operators';

import { throwError as observableThrowError, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../features/sign-in/user';


@Injectable()
export class HeadersAuthenticationService {
    constructor(private httpClient: HttpClient) { }

    authenticated = false;
    private sessionState: boolean = false;
    private sessionSubject = new Subject<boolean>();
    redirectSessionState = this.sessionSubject.asObservable();
    setSessionState(state: boolean) {
        this.sessionState = state;
        this.sessionSubject.next(this.sessionState);
    }
    getSessionState(): boolean {
        return this.sessionState;
    }

    validateHeaders(): Observable<any> {
        return this.httpClient.get('validateHeaders').pipe(catchError(error => this.handleError(error)));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    handleError(error: Response | any) {
        console.log(error);
        return observableThrowError("failed need to change this block ");
    }

    authenticate(user: User): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        headers = headers.set('login-service', 'gateway');
        const body: URLSearchParams = new URLSearchParams();
        body.set('userid', user.userid);
        body.set('password', user.password);
        body.set('clientId', user.clientId);
        body.set('clientSecret', user.clientSecret);
        // return this.httpClient.get('abusss').pipe(catchError(error => this.handleError(error)));
        return this.httpClient.post('signin', user);

    }
}
