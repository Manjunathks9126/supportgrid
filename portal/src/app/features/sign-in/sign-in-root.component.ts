import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { URLHelperService } from 'src/app/services/url.helper.service';
import { NotficationHandler } from 'src/app/util/exception/notfication.handler';

@Component({
  selector: 'sign-in-root',
  templateUrl: './sign-in-root.component.html',
})
export class SignInRootComponent implements OnInit {

  signupURL: string;
  constructor(
    private router: Router,
    private notificationHandler: NotficationHandler, private urlHelperService: URLHelperService) {
  }
  ngOnInit() {
    //this.loadURLS()
  }

  loadURLS() {
    this.urlHelperService.getURLs().subscribe(
      data => {
        if (data.success) {
          this.signupURL = data.responseEntity.signup;
        }
      }, error => {
        // this.notificationHandler.notify({ severity: 'error', title: error.userMessage });
      })
  }

  navigateToRegistration() {
    if (this.signupURL) {
      window.location.href = this.signupURL;
    }
    else {
      this.router.navigate(['/errors']);
    }
  }
}
