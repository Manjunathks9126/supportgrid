import { Injectable } from '@angular/core';
import { NotificationService } from 'tgocp-ng/dist/components/notificationBar/notification.service';
import { NotificationProperties } from 'tgocp-ng/dist/components/notificationBar/notification.properties';


@Injectable()
export class NotficationHandler {
  constructor(private notificationService: NotificationService) {
  }

  notify(message: any) {
    let notification = new NotificationProperties();
    notification.duration = 7000;
    let content: String[] = [];
    notification.userMessage = message.userMessage ? message.userMessage : "";
    notification.type = message.severity ? message.severity : "";
    notification.title = message.title;
    if (message.details) {
     
      if(Array.isArray(message.details)){
        message.details.forEach(element => {
          content.push(element);
        });
      }else{
        content.push(message.details ? message.details : "");
      }
      notification.moreDetails = content;
    }
    this.notificationService.show(notification);
  }
  notifyGroup(error: any) {
    let notification = new NotificationProperties();
    notification.type = error.severity ? error.severity : "";
    notification.title = "List of errors";
    notification.userMessage = error.details ? error.details : "";
    if (error.contentArray) {
      notification.moreDetails = error.contentArray;
    }
    this.notificationService.show(notification);

  }

}
