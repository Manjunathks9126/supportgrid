import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressIconModule } from './progressIcon/ProgressIcon.module';
import { HttpClientInterceptorServiceModule } from './services/httpInterceptorService.module';

@NgModule({
    imports: [
        CommonModule,
        ProgressIconModule,
        HttpClientInterceptorServiceModule,
    ],
    exports: [
        ProgressIconModule,
        HttpClientInterceptorServiceModule,
    ],
})
export class HttpClientProgress {
}