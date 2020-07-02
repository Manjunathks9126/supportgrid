import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
//import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
// Application related components

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "./header/header.component";
import { GlobalRoutingModule } from "./global-routing.module";
import { GlobalPageComponent } from "./global.component";
import { HomePageService } from "../../../services/homepage.service";
import { TilesService } from "../../../services/tiles.serivce";
import { UserService } from "../../../services/user.serive";
import { TileModule } from "../app-tiles/tile-container/tile.module";
import { LandingPageContentComponent } from "./content/landingpage/landing.content.component";
import { MessagesComponent } from './header/messages/messages.component';
import { LogoutService } from '../../../services/logout.service';
import { CheckboxModule } from 'tgocp-ng/dist/components/checkbox/checkbox';
import { OnlyDigitsModule } from 'tgocp-ng/dist/directives/onlydigits/only-digits.module';
import { DialogueboxModule } from 'tgocp-ng/dist/components/dialoguebox/dialoguebox.component';
import { HomePageHeaderModule } from 'tgocp-ng/dist/components/homepage-header/homepage-header.component';
import { HamburgerModule } from 'tgocp-ng/dist/components/hamburger/hamburger.component';
import { OtDateTimePipeModule } from 'tgocp-ng/dist/pipes/ot-datetime.pipe';
import { MenuOverlayPanelModule } from 'tgocp-ng/dist/components/menu-overlaypanel/menu-overlaypanel';
import { TooltipModule } from 'tgocp-ng/dist/directives/tooltip/tooltip.directive';
import { AppSwitcherModule } from 'tgocp-ng/dist/components/appSwitcher/app-switcher.component';

import { ModalModule } from 'tgocp-ng/dist/components/modal/modal';
import { OverlayPanelModule  } from 'tgocp-ng/dist/components/overlaypanel/overlaypanel';
import { UserProfileModule } from '../../userprofile/user.profile.module';

@NgModule({
  imports: [
    CommonModule,ModalModule, OnlyDigitsModule,OverlayPanelModule, FormsModule, ReactiveFormsModule, GlobalRoutingModule, CheckboxModule, DialogueboxModule,
    PerfectScrollbarModule, TranslateModule, TileModule,UserProfileModule,
    HomePageHeaderModule, HamburgerModule, OtDateTimePipeModule, MenuOverlayPanelModule,TooltipModule,AppSwitcherModule
  ],
  declarations: [
    LandingPageContentComponent, HeaderComponent, GlobalPageComponent, MessagesComponent
  ],
  exports: [
  ],
  providers: [HomePageService, TilesService, LogoutService, UserService
  ]
})
export class GlobalModule { }
