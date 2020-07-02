import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProgressIconComponent } from './ProgressIcon.component';

@NgModule({
    declarations: [
        ProgressIconComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    exports: [
        ProgressIconComponent
    ],
})
export class ProgressIconModule {
}