import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";
import { BlockCutCopyPasteModule, ClickOutsideModule } from 'tgocp-ng/dist/';
import { SignInRoutingModule } from './sing-in-routing.module';

import { SignInRootComponent } from './sign-in-root.component';

import { SignInComponent } from './sign-in/sign-in.component';
import { ReSignInComponent } from './re-sign-in/re-sign-in.component';
import { SessionTimeoutComponent } from './session-timeout/session-timeout.component';
import { HeadersAuthenticationService } from 'src/app/services/headers.authentication.service';
import { URLHelperService } from 'src/app/services/url.helper.service';


@NgModule({
  imports: [
    CommonModule, TranslateModule, FormsModule, SignInRoutingModule, BlockCutCopyPasteModule,ClickOutsideModule
  ],
  declarations: [
    SignInRootComponent, SignInComponent, ReSignInComponent, SessionTimeoutComponent,
  ],
  providers: [
    HeadersAuthenticationService, URLHelperService
  ]
})
export class SignInRootModule { }
