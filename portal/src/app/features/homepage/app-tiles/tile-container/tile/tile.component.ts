import { Component, OnInit, Input } from "@angular/core";
import { Tile } from "../../../../../entity/tile.entity";
import { DialogService } from "tgocp-ng/dist/components/dynamic-dialog/dialogservice";
import {ServiceComponent} from "../../../../service/service.component";
import { PlatformLocation } from "@angular/common";

@Component({
  selector: 'ot-tile',
  templateUrl: './tile.component.html',
  providers: []
})
export class TileComponent implements OnInit {

  constructor(private dialogService : DialogService,private platformLocation: PlatformLocation) { 
    console.log((platformLocation as any).location.origin); 
  }

  @Input() tile: Tile;
  @Input() colorIndex: number;
  @Input() hasContent: boolean;
  noofcolors: number = 16;

  ngOnInit() {
  }

  handleOnClick(tile: any): void {
    if (!tile.src) {
      return;
    }
    if (tile.src.indexOf('openAs=popup') > -1 || (tile.tileMetaInfo && tile.tileMetaInfo.openAs=='popup')) {
      let urlContext = tile.src.split("/")[3];
      window.open((this.platformLocation as any).location.origin +"/"+urlContext+"/");
    } else if(tile.src === "New Service"){
        const ref = this.dialogService.open(ServiceComponent, {
          data: {
            isIframe: 'false'
          },
          header: 'Add New Service',
          style: {"margin-left": "50%;","width":"90%","top": "50%","margin-top" : "0%"},
          contentStyle: { "overflow": "auto"}
          });
    }
    else {
      let urlContext = tile.src.split("/")[3];
      window.open((this.platformLocation as any).location.origin +"/"+urlContext+"/");
    }
  }

}
