import { Component, ElementRef, HostListener, ViewChild, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessagesCategory } from './messages.entity';
// import { MessagesService } from '../../../../../services/messages.service';
import { PSscrollUtils } from 'tgocp-ng/dist/shared/perfect-scrollbar-config';
// import { MatomoTracker } from 'ngx-matomo';


@Component({
  selector: 'ot-messagess',
  templateUrl: './messages.component.html',
  providers: [  ],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(105%, 0, 0)'
      })),
      transition('in => out', animate('500ms ease-in-out')),
      transition('out => in', animate('500ms ease-in-out'))
    ]),
  ]
})
export class MessagesComponent {
  psConfig: any = PSscrollUtils.scrollY();

  @ViewChild('categoryBtnList')
  private categoryBtnList: ElementRef;
  @ViewChild('messageTile')
  private messageTile: ElementRef;

  selectedCategoryClass = "portal-sidebar-categ-wrapper";
  selectedCategoryId: number = 0;
  messageCategoryList: MessagesCategory[];
  messagesList: any[];
  messageCount: any;
  iconClass: string = "portal-message-icon";
  loaderStatus: boolean = true;

  messageDetails: any;
  msgCount: any = 0;
  selectedMsg: any[] = [];

  @Output() clickOperation = new EventEmitter<any>();

  showContent: boolean = false;
  showMessageDetailFlag = false;
  menubarHeight: number;
  menubarStartPostion: number;
  msgCategoryCss: any[] = ['MCANN', 'MCTA', 'RA_INVITATION_CM', 'MCNF']; // For Icons These css has been hardcoded


  constructor(public el: ElementRef, private ref: ChangeDetectorRef) {
    this.getCategories(true);
  }

  openMessageDrawer() {
    this.showContent = !this.showContent;
    if (this.showMessageDetailFlag) {
      this.showMessageDetailFlag = false
    }
  }

  getCategories(loadMsg) {
    // this.msgService.getMsgCategory().subscribe(data => {
    //   if (data && data.length > 0) {
    //     this.msgCount = 0;
    //     data.forEach(info => this.msgCount += info.newMsgCount);
    //     if (loadMsg) {
    //       this.messageCategoryList = data;

    // this.getMessagesByCategory(this.messageCategoryList[0].msgCategoryId);
    //     } else {
    //       data.forEach(data=>{
    //         this.messageCategoryList.find(info=>info.msgCategoryId == data.msgCategoryId).newMsgCount = data.newMsgCount;
    //       })
    //       // this.messageCategoryList = data;
    //       this.ref.detectChanges();
    //     }
    //     if (this.msgCount > 99) {
    //       this.msgCount = "99+";
    //     }
    //   }
    // }, () => {
    // });
  }

  getMessagesByCategory(categoryId) {
    this.loaderStatus = false;
    // this.msgService.getMessages(categoryId).subscribe(data => {
    //   if (data) {
    //     this.messagesList = data;
    //   }
    //   this.loaderStatus = true;
    //   this.ref.detectChanges();
    // }, () => {
    //   });
  }

  loadMessages(categoryId) {
    if (this.selectedCategoryId != categoryId) {
      this.selectedCategoryId = categoryId;
      this.getMessagesByCategory(categoryId);
      this.showMessageDetailFlag = false;
    }
  }



  markAs(status) {
    this.loaderStatus = false;
    if (status != 'DELETE') {
      // this.msgService.updateMsgStatus(this.selectedMsg, status).subscribe(data => {
      //   if (data) {
      //     this.selectedMsg.forEach(msgId => {
      //       this.messagesList.find(data => data.msgId == msgId).userMsgStatus = status;
      //       let msgItemArray = this.messageTile.nativeElement.children;
      //       for (let i = 0; i < msgItemArray.length; i++) {
      //         let _className = msgItemArray[i].children[0].className;
      //         if (_className.indexOf('selected') > -1) {
      //           _className = _className.replace('selected', '');
      //           this.messageTile.nativeElement.children[i].children[0].className = _className;
      //         }
      //       }
      //     });
      //     // this.updateCategoryCount(status);
      //     this.getCategories(false);
      //     this.loaderStatus = true;
      //     this.selectedMsg = [];
      //   }
      // }, () => {
      //   });
    } else {
    //   this.msgService.deleteMessages(this.selectedMsg).subscribe(data => {
    //     if (data) {
    //       this.getCategories(false);
    //       this.selectedMsg.forEach(msgId => {
    //         this.messagesList.forEach((element, index) => {
    //           if (element.msgId == msgId) {
    //             this.messagesList.splice(index, 1);
    //           }
    //         });
    //       });
    //       // this.updateCategoryCount(status);
    //       this.loaderStatus = true;
    //       this.selectedMsg = [];
    //     }
    //   }, () => {
    //     })
    }
  }

  getClass(cssName: string): string {
    return this.msgCategoryCss.find(css => css === cssName);
  }

  openMessage(event, data) {
    if (event.target.className && event.target.className.indexOf("portal-ui-chkbox-label") > -1) {
      this.messageDetails = data.msgContent;
      this.showMessageDetailFlag = !this.showMessageDetailFlag;
      const msgIds = [data.msgId];
      this.messagesList.forEach((element, index) => {
        if (element.msgId == data.msgId) {
          element.userMsgStatus = status;
          this.messagesList[index] = element;
        }
      });
      // Mark as Read
      // this.msgService.updateMsgStatus(msgIds, 'READ').subscribe(() => { this.getCategories(false); });
    } else {
      let _elem = (<HTMLTextAreaElement>(<HTMLTextAreaElement>event.target).parentNode.parentNode.parentNode);
      _elem.className = _elem.className.indexOf("selected") > -1 ? _elem.className.replace("selected", "") : _elem.className + " selected";
    }
  }
  closeMessageDetail() {
    this.showMessageDetailFlag = !this.showMessageDetailFlag;
  }

  clicked(event) {
    this.showContent = false;
    this.clickOperation.emit(event);
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target) && (<HTMLTextAreaElement>event.target).attributes) {
      if ((<HTMLTextAreaElement>event.target).attributes.getNamedItem('class') && (<HTMLTextAreaElement>event.target).attributes.getNamedItem('class').value != 'load-container') {
        if ((<HTMLTextAreaElement>event.target).attributes.getNamedItem('id') == null || (<HTMLTextAreaElement>event.target).attributes.getNamedItem('id').value != 'messageDetailViewClose') {
          this.showContent = false;
          this.showMessageDetailFlag = false;
        }
      }
    } else {
      if ((<HTMLTextAreaElement>event.target).attributes && (<HTMLTextAreaElement>event.target).attributes.getNamedItem('tabindex')) {
        let tabIndex = (<HTMLTextAreaElement>event.target).attributes.getNamedItem('tabindex').value;
        let categList = this.categoryBtnList.nativeElement.children;
        for (let i = 0; i < categList.length; i++) {
          categList[i].className = 'portal-sidebar-categ-wrapper';
          if (i+1000 == Number(tabIndex)) {
            categList[i].className = 'portal-sidebar-categ-wrapper active';
          }
        }
      }
    }
  }
}

