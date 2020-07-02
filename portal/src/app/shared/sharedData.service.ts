import { Injectable, OnInit } from '@angular/core';
import { Tile } from '../entity/tile.entity';
import { HamburgerMenuType } from 'tgocp-ng/dist/components/hamburger/hamburger.menu.entity';
import { Subject } from 'rxjs';
@Injectable()
export class SharedDataService implements OnInit {

    private tiles: Tile[] = [];
    private menuList: HamburgerMenuType[] = [];
    private appLauncherList: Tile[]=[];
    public updateUserSubject = new Subject<any>();
    public hbMenuSubject = new Subject<any>();
    public appLauncherSubject = new Subject<any>();
    userInfo: any;

    constructor() { }

    

    ngOnInit() {
    }

    getTiles() {
        return this.tiles;
    }

    setMenuList(menu : HamburgerMenuType[]){
        this.menuList = menu;
    }

    getMenuList(){
        return this.menuList;
    }

    notifyHBMenu(){
        this.hbMenuSubject.next(true);
    }
    setAppLauncherList(appLauncherList:Tile[])
    {
        this.appLauncherList=appLauncherList;
    }
    getAppLauncherList()
     {
         return this.appLauncherList;
     }
    notifyAppLauncher(){
        this.appLauncherSubject.next(true);
    }

    updateUserName(data: string) {
        this.updateUserSubject.next(data);
    }

    setUserData(userInfo: any): any {
        this.userInfo = userInfo;
    }
    getUserData(): any {
        return this.userInfo;
    }
}
