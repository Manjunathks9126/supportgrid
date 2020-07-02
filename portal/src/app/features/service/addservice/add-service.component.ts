import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.serive";
import { DialogService } from 'tgocp-ng/dist/components/dynamic-dialog/dialogservice';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from "../../../entity/User.entity";
import { Subscription } from "rxjs";
import { HomePageService } from "../../../services/homepage.service";
import { NotficationHandler } from "../../../util/exception/notfication.handler";
import { SharedDataService } from "../../../shared/sharedData.service";
import { TilesService } from "src/app/services/tiles.serivce";

@Component({
  selector: 'add-service',
  templateUrl: './add-service.component.html'
})
export class AddServiceComponent implements OnInit, OnDestroy {

  rForm: FormGroup;
  userProfile: any = new User();
  userName: string = "";
  userRoles: any[];
  updateProfileSUB: Subscription;
  serviceRoleGroups: any[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, private changeDetectorRef: ChangeDetectorRef, private dialogService: DialogService,
    private notification: NotficationHandler, private homePageService: HomePageService,
    private _sharedData: SharedDataService, private tilesService: TilesService) {
    this.homePageService.updateSaveButtonStatus(true);
    this.addValidatorOnFields();
    this.updateProfileSUB = this.userService.saveBtn.subscribe(data => {
      if (data == 'service') {
        this.saveService();
      }
    })
  }

  ngOnInit(): void {
    // this.retrieveRoles();
    this.rForm.valueChanges.subscribe(data => {
      this.updateFormValidation();
    })

    // this.serviceRoleGroups.push({'roleName':' ','roleDescription':'Select Role Group'})
    // this.serviceRoleGroups.push({'roleName':'ROLE_R_SG_PORTAL_DEV_LEAD','roleDescription':'ROLE_R_SG_PORTAL_DEV_LEAD'})
    // this.serviceRoleGroups.push({'roleName':'ROLE_R_SG_PORTAL_DEV_ADMIN','roleDescription':'ROLE_R_SG_PORTAL_DEV_ADMIN'})
  }
  private retrieveRoles() {
    this.tilesService.retrieveRoles().subscribe(data => {
      if (data.statusCode == 200) {
        this.serviceRoleGroups = data.response;
      }
    }, error => {
      this.notification.notify({ severity: 'error', details: error.userMessage });
    });

  }

  addValidatorOnFields() {
    this.rForm = this.fb.group({
      'serviceName': [null, Validators.compose([Validators.required, Validators.maxLength(80)])],
      'displayName': [null, Validators.compose([Validators.required, Validators.maxLength(80)])],
      'description': [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      'serviceUrl': [null, Validators.compose([Validators.required, Validators.maxLength(150)])],
      'tileIcon': [null,],
      'roleName': [null, Validators.compose([Validators.required])],
    })
  }

  updateFormValidation() {
    if (this.rForm.valid) {
      this.homePageService.updateSaveButtonStatus(false);
    } else {
      this.homePageService.updateSaveButtonStatus(true);
    }
  }

  isValid: boolean = true;
  validateRoleName() {
    let role = this.rForm.value.roleName;
    if (role !== '' && role !== undefined && role.includes('TGSG_')) {
      this.isValid = true;
      if (this.rForm.valid && this.rForm.touched) this.homePageService.updateSaveButtonStatus(false);
    } else {
    this.isValid = false
      if (this.rForm.valid && this.rForm.touched) this.homePageService.updateSaveButtonStatus(true);
    }
  }

  saveService() {
    if (this.rForm.valid && this.rForm.touched) {
      this.dialogService.close();
      this.tilesService.saveService(this.rForm.value).subscribe(data => {
        if (data.message == "info") {
          if(data.response[this.rForm.value.serviceUrl] && this.rForm.value.roleName.split(';').length == data.response[this.rForm.value.serviceUrl].length){
            this.notification.notify({ severity: 'warning',title:"Service already exists for given role(s)"});
          }else{
            let message = "Service was registered successfully, except for these pre-existing service roles: ";
            let messageArray = [message];
            messageArray = messageArray.concat(data.response[this.rForm.value.serviceUrl]);
            this.notification.notify({ severity: 'warning',title:"Service registered with warnings", details: messageArray });
          }
      
        } else {
          this.notification.notify({ severity: 'success', title: "Service registered successfully" });
        }
        this.homePageService.updateSaveButtonStatus(true);
        this.rForm.markAsPristine();
        this.homePageService.servcieSaveSubj.next('save');
      }, error => {
        this.notification.notify({ severity: 'error', details: error.userMessage });
      });
    }
  }


  ngOnDestroy(): void {
    if (!!this.updateProfileSUB) {
      this.updateProfileSUB.unsubscribe();
    }
  }
}
