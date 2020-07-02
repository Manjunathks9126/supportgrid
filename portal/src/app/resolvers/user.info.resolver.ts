import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from '../services/user.serive';
import { SharedDataService } from '../shared/sharedData.service';

@Injectable()

export class UserInfoResolver implements Resolve<string> {

    defaultLocale: string = 'en';

    constructor(private userService: UserService, private _sharedData: SharedDataService) { }

    resolve() {
        return this.userService.getUserFromSession().toPromise().
            then((result: any) => {
                if (result.success && result.responseEntity.userLocale) {
                    this._sharedData.setUserData(result.responseEntity);
                    return result.responseEntity.userLocale;
                } else {
                    return this.defaultLocale;
                }
            }).catch((reason: any) => {
                return this.defaultLocale;
            }

            );
    }
}
