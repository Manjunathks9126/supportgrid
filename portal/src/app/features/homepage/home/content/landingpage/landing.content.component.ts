import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgZone } from '@angular/core';
import {Tile, TileContent, TileHeader} from "../../../../../entity/tile.entity";
import { SharedDataService } from "../../../../../shared/sharedData.service";
import { NotficationHandler } from "../../../../../util/exception/notfication.handler";
import { UserService } from "../../../../../services/user.serive";
import { TilesService } from "../../../../../services/tiles.serivce";
import { CustomTile } from "../../../../../entity/custom_tile.entity";
import { Customizations } from "../../../../../entity/customization.entity";
import { PSscrollUtils } from 'tgocp-ng/dist/shared/perfect-scrollbar-config';
import { HomePageService } from 'src/app/services/homepage.service';
import { Subscription } from 'rxjs';

@Component({
    selector: "landing",
    templateUrl: './landing.content.component.html',
})
export class LandingPageContentComponent implements OnInit , OnDestroy {
    psConfig: any = PSscrollUtils.scrollY();
    errorMessage: any;
    response: any;
    userName: string;
    userId: string;
    tileList: Tile[];
    configureMode: boolean = true;
    isDragged: boolean = false;
    tileAdditionalData: {};
    serviceSaveSub: Subscription;

    constructor(private _sharedData: SharedDataService,
        private zone: NgZone, private notficationHandler: NotficationHandler, private userSerivce: UserService
        , private tilesService: TilesService,private homePageService: HomePageService) {
    }
    ngOnInit() {
      this.tileList = [];
        // this.fetchUserDetails();
        this.serviceSaveSub = this.homePageService.servcieSaveSubj.subscribe(data => {
          if (data === 'save') {
            this.fetchTiles();// Get Tiles for homepage
          }
        });
        this.fetchTiles();// Get Tiles for homepage
    }

    private fetchUserDetails() {
        if (this._sharedData.getUserData()) {
            this.response = this._sharedData.getUserData();
            if (this.response) {
                this.userId = this.response.userId;
                this.prepareTilesAdditionalData(this.response.firstName + "!");
            }
        } else {
            this.userSerivce.getUserFromSession().subscribe(data => {
                if (data && data.success == true) {
                    this.response = data.responseEntity;
                    if (this.response) {
                        this.userId = this.response.userId;
                        this.prepareTilesAdditionalData(this.response.firstName + "!");
                    }
                }
            }, error => {
                this.notficationHandler.notify({ severity: 'error', details: error.userMessage });
            });
        }
    }
    private prepareTilesAdditionalData(userName: string) {
        let data: any = {};
        data.userName = userName;
        this.tileAdditionalData = data;
    }


    private fetchTiles() {
        this.tilesService.getTiles().subscribe(data => {
            if (data && data.status) {
                this.tileList = data.response;
            }
        }, error => {
            // this.notficationHandler.notify({ severity: 'error', details: error.userMessage });
        });

    }

    // SAVE tile positions | tile Configuration Mode
    public saveTiles(exchangedTileIds: Number[]) {
        this.tilesService.saveTiles(this.createTileCustomizationArray(exchangedTileIds)).subscribe(data => {
            this.tileList = data.responseDetails.responseEntity.tiles;
        }, error => {
            this.notficationHandler.notify({ severity: 'error', details: error.userMessage });
        });
    }

    private createTileCustomizationArray(exchangedTileIds: Number[]) {
        let tempCustomTile: CustomTile;
        let arrangedtile: any=[];
        let tempArray : Customizations = new Customizations();
        let customizationsArray: Customizations = new Customizations();
        for(let i = 0; i < exchangedTileIds.length; i++) {
            arrangedtile =new CustomTile();
            for(let j = 0; j < this.tileList.length; j++) {

                if(exchangedTileIds[i] == this.tileList[j].serviceInstanceId) {
                    arrangedtile['serviceInstanceId']=this.tileList[j].serviceInstanceId;
                    arrangedtile['customizationId']=this.tileList[j].customizationId;
                    arrangedtile['position']= i;
                    arrangedtile['userId']= this.userId;
                }
            }
            tempArray.customizations.push(arrangedtile) ;
        }
        return tempArray;
    }

    private includes(container, value): boolean {
        let returnValue = false;
        let pos = container.indexOf(value);
        if (pos >= 0) {
            returnValue = true;
        }
        return returnValue;
    }

    // If clicked on cancel button in config tiles
    resetPage() {
        this.zone.runOutsideAngular(() => {
            location.reload();
        });
    }

    ngOnDestroy(){
      this.serviceSaveSub.unsubscribe();
    }
}
