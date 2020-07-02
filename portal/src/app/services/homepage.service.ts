import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class HomePageService {

    public openProfileSubj = new Subject<any>();
    public saveButtonSubj = new Subject<any>();

    public servcieSaveSubj = new Subject<any>();
    servcviceSaveState = this.servcieSaveSubj.asObservable();

    public configureModeSubject = new Subject<any>();
    errorMessage: string;


    constructor(private httpClient: HttpClient) {
    }
    pingServer(): Observable<any> {
        return this.httpClient.get("ping");
    }

    //Open Profile
    public openProfileSubject() {
        this.openProfileSubj.next(true);
    }

    public updateSaveButtonStatus(data: boolean) {
        this.saveButtonSubj.next(data);
    }

}
