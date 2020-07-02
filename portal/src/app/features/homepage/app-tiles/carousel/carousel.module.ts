
import { NgModule } from "@angular/core";
import { CarouselComponent } from './carousel.component'
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { TooltipModule } from 'tgocp-ng/dist/directives/tooltip/tooltip.directive';
import { OtDatePipeModule, OTCarouselModule } from 'tgocp-ng/dist';

@NgModule({
    imports:[TranslateModule, CommonModule,TooltipModule,OTCarouselModule,OtDatePipeModule],
    declarations: [CarouselComponent],
    exports: [CarouselComponent]
})
export class CarouselModule{

}