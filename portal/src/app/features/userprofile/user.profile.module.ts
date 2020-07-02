import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Application related components

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordService } from "../../services/password.service";
import { HomePageService } from "../../services/homepage.service";
import { UserService } from "../../services/user.serive";
import { TranslateModule } from "@ngx-translate/core";
import { UserProfileComponent } from "./user.profile.component";
import { AccountComponent } from "./account/account.component";
import { UserProfileRoutingModule } from "./user-profile-routing.module";
import { OnlyDigitsModule } from 'tgocp-ng/dist/directives/onlydigits/only-digits.module';
import { CheckboxModule } from 'tgocp-ng/dist/components/checkbox/checkbox';
import { RadioButtonModule } from 'tgocp-ng/dist/components/radioButton/radioButton.component';
import { ModalModule } from 'tgocp-ng/dist/components/modal/modal';
import { SelectDropdownModule } from 'tgocp-ng/dist/components/selectDropdown/selectDropdown';
import { TooltipModule } from 'tgocp-ng/dist/directives/tooltip/tooltip.directive';
import { BlockCutCopyPasteModule } from 'tgocp-ng/dist/';

@NgModule({
  imports: [CommonModule, OnlyDigitsModule, FormsModule, ReactiveFormsModule, UserProfileRoutingModule, CheckboxModule,
    RadioButtonModule, ModalModule, SelectDropdownModule,
    TranslateModule, TooltipModule, BlockCutCopyPasteModule
  ],
  declarations: [
    UserProfileComponent, AccountComponent
  ],
  exports: [
    UserProfileComponent
  ],
  providers: [HomePageService, UserService, PasswordService]
})
export class UserProfileModule { }
