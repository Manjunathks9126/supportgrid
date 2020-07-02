import { Component, ChangeDetectionStrategy, AfterContentInit, OnDestroy, HostListener } from '@angular/core';
import { SharedDataService } from "../../../../shared/sharedData.service";
import { HomePageService } from "../../../../services/homepage.service";
import { DialogueboxService } from 'tgocp-ng/dist/components/dialoguebox/dialoguebox.service';
import { LogoutService } from '../../../../services/logout.service';
import { Tile } from '../../../../entity/tile.entity';
import { DialogService } from 'tgocp-ng/dist/components/dynamic-dialog/dialogservice';
import {UserProfileComponent} from "../../../userprofile/user.profile.component";
import {Router} from "@angular/router";

@Component({
    selector: 'homepage-header',
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements AfterContentInit, OnDestroy {
    userName: string;
    dropdownToggle: boolean = true;
    flag:boolean = true;
    searchToggle: boolean = true;
    shareData: any;
    msgCount: any = 0;
    menuData: any = [];
    messagesListData: any[];
    msgCategoryData: any[];
    showProfileModal:boolean = false;
    showDownloadModal:boolean = false;
    appLauncherList: Tile[];
    constructor(private dialogueboxService: DialogueboxService, private _sharedData: SharedDataService, private homePageService: HomePageService,
        private logoutService: LogoutService,private dialogService : DialogService,  private router: Router) {
        this.shareData = _sharedData;
 }
    @HostListener('document:profileCloseEvent', ['$event', '$event.detail'])
    updateNodes(event, param) {
       this.showProfileModal = false;//(param!='close');
    }


    @HostListener('document:downloadsCloseEvent', ['$event', '$event.detail'])
    closeDownloadModal(event, param) {
        this.showDownloadModal = false;//(param!='close');
    }

  showUserProfile() {
      this.homePageService.pingServer().subscribe(data=>{
        const ref = this.dialogService.open(UserProfileComponent, {
            data: {
                isIframe: 'false'
            },
            header: 'My Profile',
            style: {"margin-left": "50%;","width":"90%","top": "50%","margin-top" : "0%"},
            contentStyle: { "overflow": "auto"}
        });
      })
  }

    ngAfterContentInit() {
        this._sharedData.hbMenuSubject.subscribe(() => {
            this.menuData = this._sharedData.getMenuList();;
          });
          this._sharedData.appLauncherSubject.subscribe(() => {
            this.appLauncherList = this._sharedData.getAppLauncherList();;
          });
          this.homePageService.pingServer().subscribe(data=>{
            
          },error=>{
            //   if(error.error && error.error.error && error.error.error.toString().startsWith("Syntax"))
            // this.router.navigateByUrl('/login');
          });
    }

    ngOnDestroy(): void {
    }

    signout() {
        this.logoutService.toggleLogoutConfirmPopup();
        this.dialogueboxService.confirm({
            dialogName: 'signout',
            accept: () => {
                this.logoutService.logout()
                // .subscribe(data=>{
                //     console.log("logging out",data);
                // }
                    // )
                // .subscribe(data=>{
                //   console.log("Logout response from backend", data);
                //   if(data['response']){
                //     this.router.navigateByUrl('/login');
                //   }
                // });
            }, reject: () => { }
        });
    }

    displaySignoutConfirm() {
        return this.logoutService.isLogoutConfirmVisible();
    }

    profileDropDown() {
        if (!this.userName) {
            this.userName = this.shareData.getData("userName");
        }
        this.dropdownToggle = !this.dropdownToggle;
    }

    openProfile() {
        this.homePageService.openProfileSubject();
    }

    searchApp() {
        this.searchToggle = !this.searchToggle;
    }

}
