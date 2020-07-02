
import {catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExceptionWrapper } from '../util/exception/exception-wrapper';


@Injectable()
export class URLHelperService {
  constructor(private httpClient: HttpClient) {

  }

  getURLs(): Observable<any> {
    return this.httpClient.get("urls").pipe(
    catchError(exception => ExceptionWrapper.getErrorText(exception)));
  }

}
