import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemErrorComponent } from "./util/systemerror/system-error.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'homepage', loadChildren: './features/homepage/home/global.module#GlobalModule' },
  { path: 'login', loadChildren: './features/sign-in/sign-in-root.module#SignInRootModule' },
  { path: 'errors', component: SystemErrorComponent },
  { path: '**', component: SystemErrorComponent, data: { 'PageNotFound': true } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes, { useHash: true }
    ),
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule { }
