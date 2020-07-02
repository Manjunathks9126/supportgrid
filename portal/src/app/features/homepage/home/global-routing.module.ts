import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalPageComponent } from "./global.component";

const globalPagesRoutes: Routes = [
  {
    path: '', component: GlobalPageComponent
  },
 ];

@NgModule({
  imports: [
    RouterModule.forChild(
      globalPagesRoutes
    ),
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class GlobalRoutingModule { }