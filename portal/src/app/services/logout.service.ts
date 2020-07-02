import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  forkJoin } from 'rxjs';
import { SharedDataService } from '../shared/sharedData.service';
import { TilesService } from './tiles.serivce';

@Injectable()
export class LogoutService {
  constructor(private _sharedData: SharedDataService, private tilesService: TilesService, private httpClient: HttpClient) { }
  logoutConfirmVisible: boolean = false;

  toggleLogoutConfirmPopup() {
    this.logoutConfirmVisible = !this.logoutConfirmVisible;
  }

  isLogoutConfirmVisible() {
    return this.logoutConfirmVisible;
  }

  siteMenderLogout() {
    let form = document.createElement("form");
    form.method = "POST";
    form.action = "logout";
    document.body.appendChild(form);
    form.submit();
  }

  logout() {
    let form = document.createElement("form");
    form.method = "POST";
    form.action = "logout";
    document.body.appendChild(form);
    form.submit();
  }

  relogin() {
    let form = document.createElement("form");
    form.method = "POST";
    form.action = "relogin";
    document.body.appendChild(form);
    this.logOutCalls(form);

  }

  sessionTimeout() {
    let form = document.createElement("form");
    form.method = "POST";
    form.action = "timeout";
    document.body.appendChild(form);
    this.logOutCalls(form);
  }

  logOutCalls(form) {
    let tiles = this._sharedData.getTiles();
    let logoutCalls: Observable<any>[] = [];

    if (tiles && tiles.length > 0) {
      tiles.forEach(tile => {
        if (tile.content.logoutUrl)
          logoutCalls.push(this.tilesService.logout(tile.content.logoutUrl));
      });

      forkJoin(logoutCalls).subscribe(results => {
        form.submit();
      });
    }

    if (logoutCalls.length === 0) {
      form.submit();
    }
  }

  public keepAlive(): Observable<any> {
    return this.httpClient.get("keepAlive");
  }
}
