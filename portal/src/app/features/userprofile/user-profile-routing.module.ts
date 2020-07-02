import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from "./user.profile.component";
import { AccountComponent } from "./account/account.component";

const userProfileRoutes: Routes = [
  {
    path: 'userprofile',  component: UserProfileComponent,
    children: [
       { path: '', redirectTo: 'account', pathMatch: 'full'},
       { path: 'account', component: AccountComponent },
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(
      userProfileRoutes
    ),
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class UserProfileRoutingModule { }
