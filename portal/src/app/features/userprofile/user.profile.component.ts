import { Component, Input, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HomePageService } from "../../services/homepage.service";
import { UserService } from "../../services/user.serive";
import { User } from "../../entity/User.entity";
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DialogService } from 'tgocp-ng/dist/components/dynamic-dialog/dialogservice';

@Component({
    selector: 'user-profile',
    templateUrl: './user.profile.component.html'
})
export class UserProfileComponent implements OnDestroy {
    activeTab = "account";
    saveBtnStatus: boolean = true;
    closeEvent:any;
    userProfile: any = new User();
    profileSubscription : Subscription;
    saveButtonSubscription : Subscription;
    @Input() isIframe = true;
    constructor(private homePageService: HomePageService, private translate: TranslateService,
        private route: ActivatedRoute, private userSerivce: UserService, private dialogService : DialogService) {
      //  this.closeEvent = new CustomEvent('profileCloseEvent', { detail: "close" });
        this.closeEvent  = document.createEvent('Event');
        // Define that the event name is 'build'.
        this.closeEvent.initEvent('profileCloseEvent', true, true);

        this.profileSubscription = this.userSerivce.profileSubject.subscribe(data => {
            if (data) {
             this.activeTab=data;
            }
        })
        this.saveButtonSubscription = this.homePageService.saveButtonSubj.subscribe(data => {
            this.saveBtnStatus = data;
        })
    }
    ngOnInit() {
        this.route.data.subscribe(data => {
          if (data.userLocale) {
            this.translate.use(data.userLocale);
          }else{
            this.translate.setDefaultLang("en"); //Set as default language as well as fallback Language

          }
        });
    }

    closeModal() {
        try{
            window.parent.document.dispatchEvent(this.closeEvent);
            this.dialogService.close();
        }catch(err){
        }
    }

    ngOnDestroy(){
        this.profileSubscription.unsubscribe();
        this.saveButtonSubscription.unsubscribe();
    }
}
