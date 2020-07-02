import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import { Subject } from "rxjs";
import {Tile, TileContent, TileHeader} from "../../../../entity/tile.entity";
//import {takeUntil } from 'rxjs/add/operator/takeUntil';
// import {takeUntil} from "rxjs/internal/operators/takeUntil";
//import { DragulaOptions as OriginalOptions } from 'dragula';

@Component({
  selector: 'ot-tile-container',
  templateUrl: './tile.container.component.html'
})
export class TilesContainerComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor() {
    // this.dragulaService.destroy('drag-container');
    // this.dragulaService.createGroup("drag-container", {
    //  direction:  'horizontal',
    // });
  }

  @Input() tiles: Tile[];
  @Input() additionalData: {};
  @Output() onTileDragged: EventEmitter<any> = new EventEmitter();

  ngOnInit() {

    // this.dragulaService
  //   .drop().pipe(takeUntil(this.destroy$)).subscribe((value) => {
  //     let movedTileIds = new Array<Number>();
  //     let uniqueMovedIds= new Array<any>();
  //     for(var i = 0; i<value.source.getElementsByTagName("div").length; i++){
  //     let ids = value.source.getElementsByTagName("div")[i].getAttribute("id");
  //     if(ids != null){
  //       movedTileIds.push(Number.parseInt(ids));
  //     }
  //     uniqueMovedIds = this.getUnique(movedTileIds);
  //   }
  //   this.onTileDragged.emit(uniqueMovedIds);

  // });
  }

   getUnique(array:any){
    var uniqueArray = [];

    // Loop through array values
    for(var i=0; i < array.length; i++){
        if(uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
}

  currentColorIndex: number = 0;

  getColorIndex(content, index) {
    this.currentColorIndex = index == 0 ? index : this.currentColorIndex;
    if (content && content.displaySrc) {
      return -1;
    }
    return this.currentColorIndex++;

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    // this.dragulaService.destroy('drag-container');
  }
}
