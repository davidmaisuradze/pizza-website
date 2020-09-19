import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { pizzaReducer } from './reducers/pizza.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PizzaEffects } from './effects/pizza.effects';
import { PizzaRoutingModule } from './pizza-routing.module';
import { DialogModule } from '../dialog';
import { FileSaverModule } from 'ngx-filesaver';

// ===== COMPONENTS =====
import { PizzasComponent } from './containers/pizzas/pizzas.component';
import { AddPizzaComponent } from './components/add-pizza/add-pizza.component';
import { UpdatePizzaComponent } from './components/update-pizza/update-pizza.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    StoreModule.forFeature('pizza', pizzaReducer),
    EffectsModule.forFeature([PizzaEffects]),
    PizzaRoutingModule,
    DialogModule,
    FileSaverModule
  ],
  declarations: [PizzasComponent, AddPizzaComponent, UpdatePizzaComponent, CartComponent]
})
export class PizzaModule {
}
