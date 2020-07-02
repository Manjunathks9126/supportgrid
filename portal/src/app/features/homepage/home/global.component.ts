import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector : "global",
  templateUrl: './global.component.html'
})
export class GlobalPageComponent {

  constructor(private translate: TranslateService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.userLocale) {
        this.translate.use('en');
      }else{
        this.translate.setDefaultLang("en"); //Set as default language as well as fallback Language
        }
    });
  }

}

