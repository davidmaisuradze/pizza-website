import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// ===== COMPONENTS =====
import { PizzasComponent } from './containers/pizzas/pizzas.component';
// ===== GUARD =====
import { AuthGuard } from '../../core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'pizzas',
    component: PizzasComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PizzaRoutingModule {
}
