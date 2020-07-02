import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject ,  Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionWrapper } from '../util/exception/exception-wrapper';


@Injectable()
export class PasswordService {
    public configureModeSubject = new Subject<any>();
    errorMessage: string;
    constructor(private httpClient: HttpClient) {
    } 

    //Validate password against policy
    validateUserPswdPolicy(pswdPolicy: any): Observable<any> {
        return this.httpClient.post("password/validate/policy", pswdPolicy);
    }

    public validatePassword(password: String): Observable<any> {
        return this.httpClient.post("password/validate", password);
    }

    //Get PasswordPolicy
    getPasswordPolicy() {
        return this.httpClient.get("password/company/policy").pipe(catchError(exception => ExceptionWrapper.getErrorText(exception)));
    }

}
