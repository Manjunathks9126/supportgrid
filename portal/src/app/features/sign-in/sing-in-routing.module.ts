import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInRootComponent } from './sign-in-root.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReSignInComponent } from './re-sign-in/re-sign-in.component';
import { SessionTimeoutComponent } from './session-timeout/session-timeout.component';

const SignInRoutes: Routes =
  [
    {
      path: '', component: SignInRootComponent,
      children: [
        { path: '', component: SignInComponent },
        { path: 'login', component: SignInComponent },
        { path: 'relogin', component: ReSignInComponent },
        { path: 'timeout', component: SessionTimeoutComponent },
      ]
    }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(
      SignInRoutes
    ),
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class SignInRoutingModule { }
