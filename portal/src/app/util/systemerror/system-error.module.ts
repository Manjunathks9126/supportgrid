import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";


/* Feature Modules */
import { SystemErrorComponent } from './system-error.component';
import { HomePageService } from '../../services/homepage.service';


@NgModule({
  declarations: [
    SystemErrorComponent
  ],
  imports: [CommonModule,TranslateModule],
  providers: [HomePageService],

})
export class SystemErrorModule { }
