import { State } from '../reducers/order.reducer';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

export const selectOrdersState: MemoizedSelector<object, State> = createFeatureSelector<State>(
  'order'
);

const getOrders = (state: State) => state.orders;

export const selectOrders: MemoizedSelector<object, any> = createSelector(
  selectOrdersState,
  getOrders
);

