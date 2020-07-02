
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { Response } from '@angular/http';


export class ExceptionWrapper {

    constructor() {
    }

    public static getErrorText(errorObject: Response | any) {

        let defaultError: any = {
            title: "The request could not be processed.Please contact OPENTEXT support."
        }

        if (errorObject && errorObject.error.responseDetails) {
            try {
                defaultError = errorObject.error.responseDetails.errorEntity;
            } catch (ex) {
                console.log(ex);
            }
        }

        return observableThrowError(defaultError);
    }

}
