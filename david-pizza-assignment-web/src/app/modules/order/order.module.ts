import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { orderReducer } from './reducers/order.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './effects/order.effects';
import { OrderRoutingModule } from './order-routing.module';
import { DialogModule } from '../dialog';
import { FileSaverModule } from 'ngx-filesaver';

// ===== COMPONENTS =====
import { OrdersComponent } from './containers/orders/orders.component';
import { OrdersListComponent } from './containers/orders-list/orders-list.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    StoreModule.forFeature('order', orderReducer),
    EffectsModule.forFeature([OrderEffects]),
    OrderRoutingModule,
    DialogModule,
    FileSaverModule
  ],
  declarations: [OrdersComponent, OrdersListComponent, OrderDetailsComponent]
})
export class OrderModule {
}
