import { Action, createReducer, on } from '@ngrx/store';
import * as PizzaActions from '../actions/pizza.actions';
import { Pizza } from '../../../core/models/pizza';

export interface State {
  pizzas: Pizza[];
  cart: {};
}

export const initialState: State = {
  pizzas: [],
  cart: {}
};

export const reducer = createReducer(
  initialState,
  on(PizzaActions.GetPizzasSuccess, (state, action) => ({
    ...state,
    pizzas: action.payload
  })),
  on(PizzaActions.AddToCart, (state, action) => {
    const pizza = action.payload.pizza;
    return {
      ...state,
      cart: {
        ...state.cart,
        [pizza.title]: state.cart[pizza.title] && state.cart[pizza.title].length
          ? [...state.cart[pizza.title], pizza] : [pizza]
      }
    };
  }),
  on(PizzaActions.RemoveFromCart, (state, action) => {
    const pizzaTitle = action.payload.pizzaTitle;

    return {
      ...state,
      cart: {
        ...state.cart,
        [pizzaTitle]: state.cart[pizzaTitle] && state.cart[pizzaTitle].length
          ? state.cart[pizzaTitle].slice(0, state.cart[pizzaTitle].length - 1) : []
      }
    };
  }),
  on(PizzaActions.ClearCart, (state, action) => ({
    ...state,
      cart: {}
  }))
);

export function pizzaReducer(state = initialState, action: Action) {
  return reducer(state, action);
}
