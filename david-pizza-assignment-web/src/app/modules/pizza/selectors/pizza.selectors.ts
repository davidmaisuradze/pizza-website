import { State } from '../reducers/pizza.reducer';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export const selectPizzasState: MemoizedSelector<object, State> = createFeatureSelector<State>(
  'pizza'
);

const getPizzas = (state: State) => state.pizzas;
const getCart = (state: State) => state.cart;

export const selectPizzas: MemoizedSelector<object, any> = createSelector(
  selectPizzasState,
  getPizzas
);

export const selectCart: MemoizedSelector<object, any> = createSelector(
  selectPizzasState,
  getCart
);
