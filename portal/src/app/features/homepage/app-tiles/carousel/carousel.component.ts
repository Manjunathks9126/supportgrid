import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { SharedDataService } from "../../../../shared/sharedData.service";
import { TilesService } from '../../../../services/tiles.serivce';
import { UserService } from '../../../../services/user.serive';

@Component({
  selector: 'ot-tile-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() additionalData: any;
  showToolTip: boolean = false;
  partnerAddedLastMonth: any = "";
  partnerInYourHub: any = "";
  partnerInGPD: any = "";
  slideInterval = 1000;
  todayDate: any;
  dateFormatList: any;

  @ViewChild('carousel') carousel: any;
  @ViewChild('welcomeBanner') welcomeBanner: any;
  @ViewChild('gpdBanner') gpdBanner: any;

  constructor(private _sharedData: SharedDataService, private tilesService: TilesService,  private userService: UserService) {
  }

  pause() {
    this.carousel.pause();
  }

  ngOnInit() {
    this.todayDate = new Date();
    this.userService.getUserProfile().subscribe(user => {
      if(user['response']){
        this.prepareTilesAdditionalData(user.response.username);
      }
    });
  }

  private formatNumber(number) {
    if (number >= 1000000) {
      number = number / 1000000;
      number = number.toFixed(1);
      number = number + "M+";
      return number;
    } else if (number >= 1000) {
      number = number / 1000;
      number = number.toFixed(1);
      number = number + "K+";
      return number;
    }
    return number;
  }

  public prepareTilesAdditionalData(firstName: string) {
    let data: any = {};
    data.userName = firstName + "!";;
    this.additionalData = data;
    this.isToolTipRequired();
  }

  isToolTipRequired() {
    if (this.additionalData && this.additionalData.userName.length > 20) {
      this.showToolTip = true;
    }
    else {
      this.showToolTip = false;
    }
  }

   // Appending slide class to achieve sliding animatiom
   slideEvent(event) {
    if (event.prev == "ngb-slide-1") {
      this.gpdBanner.nativeElement.offsetParent.className = this.gpdBanner.nativeElement.offsetParent.className + " ot-slide";
      this.welcomeBanner.nativeElement.offsetParent.className = this.welcomeBanner.nativeElement.offsetParent.className.replace(' ot-slide', '');
      setTimeout(() => {
        this.gpdBanner.nativeElement.offsetParent.className = this.gpdBanner.nativeElement.offsetParent.className.replace(' ot-slide', '');
      }, this.slideInterval);
    } else {
      this.welcomeBanner.nativeElement.offsetParent.className = this.welcomeBanner.nativeElement.offsetParent.className + " ot-slide";
      this.gpdBanner.nativeElement.offsetParent.className = this.gpdBanner.nativeElement.offsetParent.className.replace(' ot-slide', '');
      setTimeout(() => {
        this.welcomeBanner.nativeElement.offsetParent.className = this.welcomeBanner.nativeElement.offsetParent.className.replace(' ot-slide', '');
      }, this.slideInterval);
    }
  }

}
