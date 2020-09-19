import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ===== COMPONENTS =====
import { OrdersComponent } from './containers/orders/orders.component';
import { OrdersListComponent } from './containers/orders-list/orders-list.component';

// ===== GUARD =====
import { AuthGuard } from '../../core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'order',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders-list',
    component: OrdersListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderRoutingModule {
}
