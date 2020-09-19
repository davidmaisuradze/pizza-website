import { Action, createReducer, on } from '@ngrx/store';
import * as OrderActions from '../actions/order.actions';
import { Order } from '../../../core/models/order';

export interface State {
  orders: Order[];
}

export const initialState: State = {
  orders: []
};

export const reducer = createReducer(
  initialState,
  on(OrderActions.GetOrdersSuccess, (state, action) => ({
    ...state,
    orders: action.payload
  }))
);

export function orderReducer(state = initialState, action: Action) {
  return reducer(state, action);
}
