import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { TileContent } from "../../../../../../entity/tile.entity";
import { TilesService } from "../../../../../../services/tiles.serivce";
import { TileContentDetail } from "../../../../../../entity/TileContentDetail.entity";
import { PSscrollUtils } from "tgocp-ng/dist/shared/perfect-scrollbar-config";
import {UserProfileComponent} from "../../../../../userprofile/user.profile.component";
import { DialogService } from 'tgocp-ng/dist/components/dynamic-dialog/dialogservice';
import {ServiceComponent} from "../../../../../service/service.component";
@Component({
  selector: 'ot-tile-content',
  templateUrl: './tile.content.component.html'
})
export class TileContentComponent implements OnInit {

  constructor(private tilesService: TilesService, private dialogService : DialogService) {
  }

  contentLoaded: boolean = false;
  serviceError: boolean = false;
  @Input() tileContent: TileContent;
  @Input() hasContent: boolean;
  @Output() onTileClick: EventEmitter<any> = new EventEmitter();
  tileContentDetails: TileContentDetail;

  scrollConfig: {} = PSscrollUtils.scrollY();

  ngOnInit() {
    if (this.tileContent && this.tileContent.displaySrc) {
      // this.tilesService.tileContent(this.tileContent.displaySrc).subscribe(data => {
      //   if (data) {
      //     this.contentLoaded = true;
      //     // this.tileContentDetails = data.responseEntity ? data.responseEntity : { elements: data };
      //   }
      // }, () => {
      //     this.serviceError = true;
      //     this.contentLoaded = true;
      //   });
    } else {
      this.contentLoaded = true;
    }
  }

  clickUrl(element: any) {
        this.openNewTab(element.src);
  }

 

  private openNewTab(url: string) {
    window.open(url);
  }

  private navigate(url: string) {
    window.open(url, "_self");
  }

  handleOnClick(): void {
    this.onTileClick.emit(true);
  } 
}
