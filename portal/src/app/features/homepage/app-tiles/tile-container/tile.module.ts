import { TilesContainerComponent } from "./tile.container.component";
import { NgModule } from "@angular/core";
// import { DragulaModule } from "ng2-dragula";
import { TranslateModule } from "@ngx-translate/core";
import { TileComponent } from "./tile/tile.component";
import { TileHeaderComponent } from "./tile/header/tile.header.component";
import { TileFooterComponent } from "./tile/footer/tile.footer.component";
import { TileContentComponent } from "./tile/content/tile.content.component";
import { CarouselModule } from "../carousel/carousel.module";
import { TileContentAccordionComponent } from "./tile/content/accordion/tile.content.accordion.component";
import { SearchModule } from "tgocp-ng/dist/components/search/search.component";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  exports: [TilesContainerComponent, TileComponent],
  declarations: [TilesContainerComponent, TileComponent, TileHeaderComponent, TileContentComponent, TileFooterComponent, TileContentAccordionComponent],
  imports: [ PerfectScrollbarModule, TranslateModule, SearchModule, CarouselModule]
})
// DragulaModule.forRoot(),
export class TileModule { }
