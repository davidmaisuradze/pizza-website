import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { httpInterceptorProviders } from './interceptors';
import { ConfirmModalService } from './services/confirm-modal.service';
import { PizzaService } from './services/pizza.service';
import { OrderService } from './services/order.service';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    httpInterceptorProviders,
    ConfirmModalService,
    PizzaService,
    OrderService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule instance already exists');
    }
  }
}
