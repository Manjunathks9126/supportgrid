import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { HeadersAuthenticationService } from 'src/app/services/headers.authentication.service';
import { NotficationHandler } from 'src/app/util/exception/notfication.handler';

@Component({
    selector: 'sign-in',
    templateUrl: '../sign-in/sign-in.component.html'
})
export class SessionTimeoutComponent implements OnInit {
    submitted = false;
    user: User = new User();
    authFailed: boolean = false;
    constructor(private router: Router,
        private headersAuthenticationService: HeadersAuthenticationService,
        private notificationHandler: NotficationHandler) {
    }

    ngOnInit() {
        this.checkHeadres();
        this.errmsg = "signin.session_expire";
        this.headersAuthenticationService.setSessionState(true);
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

    portalSignin(){
      this.headersAuthenticationService.authenticate(this.user).subscribe( data=> {
        console.log("Buahhaaa",data);
      })
    }
    
  login(user: User ){
    this.headersAuthenticationService.authenticate(this.user).subscribe( data=> {
      if(data && data.response){
        this.router.navigateByUrl('/homepage');
      }else{
        this.errmsg = "signin.invalid";
      }
    }, error => {
      this.errmsg = "signin.invalid";
    });
    return false;
  }
}
