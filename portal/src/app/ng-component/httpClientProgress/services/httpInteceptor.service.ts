
import { throwError as observableThrowError, Observable, Subject } from 'rxjs';

import { finalize, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';



import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';



// This will intercept http call and display/hide loader icon
@Injectable()
export class HttpClientInterceptorService implements HttpInterceptor {
    private _pendingRequests = 0;
    private _pendingRequestsStatus: Subject<boolean> = new Subject<boolean>();

    get pendingRequestsStatus(): Observable<boolean> {
        return this._pendingRequestsStatus.asObservable();
    }

    get pendingRequests(): number {
        return this._pendingRequests;
    }

    constructor() {
    }



    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Below code Lets http call use wihout Loader
        var showLoader = true;
        if (request.params.has('hideLoader') && request.params.get('hideLoader') == 'true') {
            showLoader = false;
        } else {
            this._pendingRequests++;
        }

        request = request.clone({
           
            setHeaders: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'x-ottg-caller-application':'SG-PORTAL-UI',
                'x-ottg-caller-application-timestamp': new Date().toString(),
                'x-ottg-caller-application-host':'SG-PORTAL'

            }
        });

        if (1 === this._pendingRequests && showLoader) {
            this._pendingRequestsStatus.next(true);
        }

        return next.handle(request).pipe(map(event => {
            return event;
        }),
            catchError(error => {
                return this.handleError(error);
                // return observableThrowError(error);
            }),
            finalize(() => {
                if (this._pendingRequests > 0)
                    this._pendingRequests--;
                if (0 === this._pendingRequests) {
                    this._pendingRequestsStatus.next(false);
                }

            }));
    }

    public handleError(error: Response | any) {
        if (error.status == 401) {
            window.location.href = "/supportgrid-portal/#/login?sg=unauthorized";
        }else if (error.status == 408) {
            window.location.href = "/supportgrid-portal/#/login?sg=tokenExpired";
        }
        return observableThrowError(error);

    }
}

export function HttpInterceptorServiceFactory() {
    return new HttpClientInterceptorService();
}

export let HttpInterceptorServiceFactoryProvider = {
    provide: HttpClientInterceptorService,
    useFactory: HttpInterceptorServiceFactory
};