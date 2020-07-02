import {Component, Input, OnDestroy} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.serive";
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from 'tgocp-ng/dist/components/dynamic-dialog/dialogservice';
import {User} from "../../entity/User.entity";
import {Subscription} from "rxjs";
import {HomePageService} from "../../services/homepage.service";

@Component({
  selector: 'service',
  templateUrl: './service.component.html'
})
export class ServiceComponent implements OnDestroy {
  activeTab = "service";
  saveBtnStatus: boolean = true;
  closeEvent:any;
  userProfile: any = new User();
  profileSubscription : Subscription;
  saveButtonSubscription : Subscription;
  @Input() isIframe = true;

  constructor(private translate: TranslateService, private homePageService: HomePageService, private route: ActivatedRoute, private userSerivce: UserService, private dialogService : DialogService) {
    //  this.closeEvent = new CustomEvent('profileCloseEvent', { detail: "close" });
    this.closeEvent = document.createEvent('Event');
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

  saveService() {
    console.log("Th service data: ")
    this.userSerivce.updateProfileBtnListner(this.activeTab);
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
