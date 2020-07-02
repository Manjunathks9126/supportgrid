import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { TileHeader } from "../../../../../../entity/tile.entity";



@Component({
  selector: 'ot-tile-header',
  templateUrl: './tile.header.component.html'
})
export class TileHeaderComponent implements OnInit {

  constructor() { }
  isSearchEnabled: Boolean;
  searchString: string;
  @Input() tileHeader: TileHeader;
  @Input() hasContent: boolean;
  @Output() onTileClick: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  handleSearchEnableEvent(isEnabled: Boolean): void {
    this.isSearchEnabled = isEnabled;
  }

  handleOnSearch(): void {
  }

  handleOnClick(): void {
    this.onTileClick.emit(true);
  }

}
