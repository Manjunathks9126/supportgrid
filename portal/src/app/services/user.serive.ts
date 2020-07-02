import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { ExceptionWrapper } from '../util/exception/exception-wrapper';
import { User } from '../entity/User.entity';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserService {

    public configureModeSubject = new Subject<any>();
    public saveBtn = new Subject<any>();
    public profileSubject =  new Subject<any>();
    public userSubject =  new Subject<any>();
    public userLoginId: any;
    errorMessage: string;
    userProfileDetails: any = new User();

    constructor(private httpClient: HttpClient) {
    }
    // Get userinfo
    getUserFromSession(): Observable<any> {
        return this.httpClient.get("session/user").pipe(catchError(exception => ExceptionWrapper.getErrorText(exception)));
    }
    // Get Login User's Profile Details
    public getUserProfile(): Observable<any> {
        return this.httpClient.get("user").pipe(catchError(exception => ExceptionWrapper.getErrorText(exception)));
    }

    setUserLoginId(userLogin: any) {
        this.userLoginId = userLogin;
    }

    getUserLoginId(): any {
        return this.userLoginId;
    }

    setUserProfileDetails(userProfile: User) {
        this.userProfileDetails = userProfile;
        this.userSubject.next(userProfile);
    }

    getUserProfileDetails(): User {
        return this.userProfileDetails;
    }

    getUserRoles(): Observable<any> {
        return this.httpClient.get("user/roles");
    }

    public updateProfileBtnListner(activeTab) {
        this.saveBtn.next(activeTab);
    }

    public updateProfileTab(activeTab){
        this.profileSubject.next(activeTab);
    }

  public isUserAuthenticated():Observable<any> {
    return this.httpClient.get('userauthentication');
  }

  public retrieveChangePwdUrl():Observable<any> {
    return this.httpClient.get('changePasswordUrl');
  }
}
