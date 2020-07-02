import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientInterceptorService, HttpInterceptorServiceFactoryProvider } from './httpInteceptor.service';

const HttpInterceptorServiceExistingProvider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: HttpClientInterceptorService,
    multi: true
};

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        HttpInterceptorServiceExistingProvider,
        HttpInterceptorServiceFactoryProvider,
    ],
})
export class HttpClientInterceptorServiceModule {
}