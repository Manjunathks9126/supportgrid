import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SystemErrorModule } from './util/systemerror/system-error.module';
import { NotificationModule } from 'tgocp-ng/dist';
import { NotficationHandler } from './util/exception/notfication.handler';
import { AppRoutingModule } from './app.routing.module';
import { HttpModule } from '@angular/http';
import { SharedDataService } from './shared/sharedData.service';
import { DialogService } from 'tgocp-ng/dist/components/dynamic-dialog/dialogservice';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SignInRootModule } from './features/sign-in/sign-in-root.module';
import {ServiceModule} from "./features/service/service.module";
import { HttpClientProgress } from './ng-component/httpClientProgress/httpcProgress.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule, HttpClientProgress, FormsModule, HttpClientModule,PerfectScrollbarModule,
    SystemErrorModule,NotificationModule,AppRoutingModule,HttpModule,SignInRootModule,ServiceModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [NotficationHandler,SharedDataService,DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
