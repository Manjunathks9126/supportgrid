import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'ot-footer',
    templateUrl: 'footer.component.html'
})

export class FooterComponent {

    currentYear = new Date().getFullYear();
    param = { currentYear: this.currentYear };
    constructor(private translate: TranslateService) {
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }


}