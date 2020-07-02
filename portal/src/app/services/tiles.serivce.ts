import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Response } from "@angular/http";
import { throwError as observableThrowError,Subject ,  Observable ,  of } from 'rxjs';
import { ExceptionWrapper } from '../util/exception/exception-wrapper';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TilesService {
    public tileDataSubject = new Subject<any>();
    public configureModeSubject = new Subject<any>();
    errorMessage: string;
    constructor(private httpClient: HttpClient, private router: Router) {
    }

    transactData(data) {
        this.tileDataSubject.next(data);
    }


    // Get Homepage Tiles
    public getTiles(): Observable<any> {
        return this.httpClient.get("tiles");
    }

  //   handleError(error: Response | any) {
  //     console.log(error);
  //     if(error.status=== 302 || error.status=== 301){
  //       this.router.navigateByUrl('/login?sg=unauthorized');
  //     }
  //     return observableThrowError("failed need to change this block ");
  // }
    // Get Hamburger
    public getHeaderFeatures(): Observable<any> {
        return this.httpClient.get("navigations/header").pipe(catchError(exception => ExceptionWrapper.getErrorText(exception)));
    }

    // Save customized Tiles
    public saveTiles(customizedTilesArray): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        let options = { headers: headers };
        return this.httpClient.post("navigations/tiles", customizedTilesArray, options).pipe(catchError(exception => ExceptionWrapper.getErrorText(exception)));
    }
    tileContent(url: string): Observable<any> {
        return this.httpClient.get(url).pipe(catchError(exception => ExceptionWrapper.getErrorText(exception)));
    }

    logout(url: string): Observable<any> {
        return this.httpClient.post(url, null).pipe(catchError(exception => of({})));
    }

  retrieveRoles(): Observable<any>{
      return this.httpClient.get("roles").pipe(catchError(exception => ExceptionWrapper.getErrorText(exception)));
  }

  saveService(service: any): Observable<any> {
    return this.httpClient.post("service",service).pipe(catchError(exception => ExceptionWrapper.getErrorText(exception)));
  }

  refreshRouts(): Observable<any> {
    return this.httpClient.get("refreshroutes").pipe(catchError(exception => ExceptionWrapper.getErrorText(exception)));
  }

  retrieveServices(userName: any): Observable<any> {
    return this.httpClient.get("service/"+userName).pipe(catchError(exception => ExceptionWrapper.getErrorText(exception)));
  }



}
