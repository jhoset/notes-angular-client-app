import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorSnackBarComponent} from './components/error-snack-bar/error-snack-bar.component';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {errorInterceptor} from "./interceptors/error.interceptor";
import {tokenAuthInterceptor} from "./interceptors/token-auth.interceptor";


@NgModule({
  declarations: [
    ErrorSnackBarComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    provideHttpClient(withInterceptors([ tokenAuthInterceptor ,errorInterceptor]))
  ]
})

export class CoreModule {
}
