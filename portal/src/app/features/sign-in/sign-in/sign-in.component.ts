import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../user';
import { HeadersAuthenticationService } from 'src/app/services/headers.authentication.service';
import { NotficationHandler } from 'src/app/util/exception/notfication.handler';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {

  submitted = false;
  user: User = new User();
  authFailed: boolean = false;
  signupURL: string;
  constructor(
    private router: Router, private location: Location,
    private headersAuthenticationService: HeadersAuthenticationService,
  ) {

  }

  ngOnInit() {

    this.headersAuthenticationService.setSessionState(false);
    this.rewriteUrl();
  }


  isEnabled(): boolean {
    return this.user.userid != null && this.user.userid != '' && this.user.password != null && this.user.password != '';
  }

  errmsg: string = "";
  reloginsubmsg: string = "";
  checkHeadres(): void {
    // this.headersAuthenticationService.validateHeaders().subscribe(
    //     data => {
    //         let res = JSON.parse(JSON.stringify(data.responseEntity));
    //         if (res.LOGIN == "UNAUTHORIZED" || res.login == "UNAUTHORIZED") {
    //             this.authFailed = true;
    //             this.errmsg = "signin.unauthorized";
    //         } else if (res.LOGIN == "INVALID" || res.login == "INVALID") {
    //             this.authFailed = true;
    //             this.errmsg = "signin.invalid";
    //         }
    //     },
    //     error => {
    //         this.notificationHandler.notify({ severity: 'error', details: error.userMessage });
    //     });
  }
  navigateToForgotPassword(path: string) {
    if (path) {
      this.router.navigate([path]);
    }
    else {
      this.router.navigate(['/errors']);
    }
  }


  login(user: User) {
    this.headersAuthenticationService.authenticate(this.user).subscribe(data => {
      if (data.statusCode == 200) {
        this.router.navigateByUrl('/homepage');
      } else {
        this.errmsg = "signin.invalid";
      }
    }, error => {
      console.log(this.router);
      if (error.status == 404) {
        this.errmsg = "signin.invalid";
      }
      if (error.status == 401) {
        this.errmsg = "signin.unauthorized";
        if (window.location.href.indexOf("unauthorized") > -1) {
          window.location.href = "/supportgrid-portal/#/login";
        }
      }
    });
    return false;
  }

  private rewriteUrl() {
    if (this.router.url.indexOf("ukh=sg") > -1) {
      this.errmsg = "signin.unauthorized";// keeping same
      this.router.url.replace("ukh=sg", "");
      this.location.replaceState("/login");
    } else if (this.router.url.indexOf("unauthorized") > -1) {
      this.errmsg = "signin.unauthorized";
      this.router.url.replace("sg=unauthorized", "");
      this.location.replaceState("/login");
    } else if (this.router.url.indexOf("tokenExpired") > -1) {
      this.errmsg = "signin.tokenExpired";
      this.router.url.replace("sg=tokenExpired", "");
      this.location.replaceState("/login");
    } else {
      this.errmsg = "";
    }
  }
}
