import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { HomePageService } from "../../../services/homepage.service";
import { UserService } from "../../../services/user.serive";
import { NotficationHandler } from "../../../util/exception/notfication.handler";
import { User } from "../../../entity/User.entity";
import { Subscription } from "rxjs";
import { SharedDataService } from "../../../shared/sharedData.service";
import { NgConstants } from 'tgocp-ng/dist/shared/Ng.constants';

@Component({
    selector: "account",
    templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit, OnDestroy {
    rForm: FormGroup;
    userProfile: any = new User();
    userLoginID: string = "";
    userLastLogin: any;
    userCreatedDate: Date;
    userName: string = "";
    userRoles: any[];
    editMode: boolean;
    privacyPolicyLink: string = "";
    NEO_TGO_DEF = "Neo-TGO Defaults";
    updateProfileSUB: Subscription;
    regex: string = NgConstants.emailRegEx;

    ngOnInit(): void {
      this.rForm.valueChanges.subscribe(data => {
        this.updateFormValidation(false);
      })
      this.getUserProfileDetails();
    }

    constructor(private fb: FormBuilder, private userService: UserService, private changeDetectorRef: ChangeDetectorRef,
        private notification: NotficationHandler, private homePageService: HomePageService,
        private _sharedData: SharedDataService) {
        this.homePageService.updateSaveButtonStatus(true);

        this.addValidatorOnFields();
    }

    getUserProfileDetails() {
      this.userRoles = [];
      this.userService.getUserProfile().subscribe(user => {
        if (user['response']) {
          this.userName = user.response.username;
          user.response.authorities.forEach(element => {
            this.userRoles.push({'roleName': element.authority, 'roleDisplayName': element.authority});
          });

          this.rForm.patchValue({
            'firstName': user.response.username,
            'lastName':user.response.username,
            'email': '',
            'addressLine1': '',
            'addressLine2': '',
            'city': '',
          });
        }
      });
    }

    addValidatorOnFields() {
        this.rForm = this.fb.group({
            'firstName': [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
            'lastName': [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
            'email': [null, Validators.compose([Validators.required, Validators.pattern(this.regex)])],
            'phone': [null, Validators.compose([Validators.required, Validators.maxLength(25)])],
            'country': [null, Validators.compose([Validators.required])],

            'addressLine1': [null, Validators.compose([Validators.maxLength(75)])],
            'addressLine2': [null, Validators.maxLength(75)],
            'city': [null, Validators.compose([Validators.maxLength(50)])],
            'state': [null, Validators.compose([Validators.maxLength(50)])],
            'mobile': [null, Validators.maxLength(25)],

            'postalCode': [null, Validators.compose([Validators.maxLength(50)])],
            'fax': [null, Validators.maxLength(25)],
            'alternate': [null],
            'facebook': [{ value: '', disabled: true }],
            'linkedIn': [{ value: '', disabled: true }],
            'twitter': [{ value: '', disabled: true }],
            'other': [{ value: '', disabled: true }]
        })
    }

    updatePassword() {
      this.userService.retrieveChangePwdUrl().subscribe(data=>{
        if(data.statusCode == 200){
          window.open(data.response);
        }
       })
    }

    updateFormValidation(hasConsentChanges: boolean) {
        if (hasConsentChanges) {
            this.rForm.markAsTouched();
            this.rForm.markAsPristine();
        }
        if ((!this.rForm.pristine || hasConsentChanges) && this.rForm.valid)
            this.homePageService.updateSaveButtonStatus(false);
        else {
            this.homePageService.updateSaveButtonStatus(true);
        }
    }

  ngOnDestroy(): void {
    if (!!this.updateProfileSUB) {
      this.updateProfileSUB.unsubscribe();
    }
  }

}
