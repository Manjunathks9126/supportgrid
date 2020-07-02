import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServiceComponent} from "./service.component";
import {AddServiceComponent} from "./addservice/add-service.component";


const serviceRoutes: Routes =
            [
              { path: '', component: ServiceComponent },
              { path: 'add-service', component: AddServiceComponent },
           ];

@NgModule({
  imports: [
    RouterModule.forChild(
      serviceRoutes
    ),
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class ServiceRoutingModule { }
