import { Component, Input, OnInit } from "@angular/core";
import { TileContentElement } from "../../../../../../../entity/TileContentDetail.entity";
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from "@angular/router";

@Component({
    selector: 'ot-tile-accordion',
    templateUrl: './tile.content.accordion.component.html',
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({ transform: 'translateX(100%)', opacity: 0 }),
                    animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ transform: 'translateX(0)', opacity: 1 }),
                    animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
                ])
            ]
        )
    ]
})
export class TileContentAccordionComponent {

    @Input()
    displayText: string;
    @Input()
    children: [TileContentElement];
    isOpen: boolean = false;
    constructor(private router: Router) {
    }

    clickAccordion() {
        this.isOpen = !this.isOpen;
    }

    clickUrl(element: any) {
    if (element.src) {
      if (element.src.indexOf('openAs=popup')>-1 || (element.tileMetaInfo &&  element.tileMetaInfo.openAs=='popup')) {
        this.openNewTab(element.src);
      } else {
        this.navigate(element.src);
      }
    }
  }

   private openNewTab(url: string) {
    window.open(url);
  }

  private navigate(url: string) {
    window.open(url, "_self");
  }
}
