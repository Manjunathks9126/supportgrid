import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordService } from "../../services/password.service";
import { UserService } from "../../services/user.serive";
import { TranslateModule } from "@ngx-translate/core";
import { OnlyDigitsModule } from 'tgocp-ng/dist/directives/onlydigits/only-digits.module';
import { CheckboxModule } from 'tgocp-ng/dist/components/checkbox/checkbox';
import { RadioButtonModule } from 'tgocp-ng/dist/components/radioButton/radioButton.component';
import { ModalModule } from 'tgocp-ng/dist/components/modal/modal';
import { SelectDropdownModule } from 'tgocp-ng/dist/components/selectDropdown/selectDropdown';
import { TooltipModule } from 'tgocp-ng/dist/directives/tooltip/tooltip.directive';
import { BlockCutCopyPasteModule, MultiSelectModule } from 'tgocp-ng/dist/';
import {ServiceComponent} from "./service.component";
import {ServiceRoutingModule} from "./service.routing.module";
import {AddServiceComponent} from "./addservice/add-service.component";

@NgModule({
  imports: [CommonModule, OnlyDigitsModule, FormsModule, ReactiveFormsModule, CheckboxModule,
    RadioButtonModule, ModalModule, SelectDropdownModule,ServiceRoutingModule,
    TranslateModule, TooltipModule, BlockCutCopyPasteModule,MultiSelectModule
  ],
  declarations: [ ServiceComponent ,AddServiceComponent],
  exports: [  ],
  providers: [UserService, PasswordService]
})
export class ServiceModule { }
