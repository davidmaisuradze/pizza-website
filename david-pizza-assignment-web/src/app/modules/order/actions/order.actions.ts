import { createAction, props } from '@ngrx/store';

// GET LIST
export const GetOrdersRequest = createAction('[Order] Get Orders Request');
export const GetOrdersSuccess = createAction('[Order] Get Orders Success', props<{ payload: any }>());
export const GetOrdersFailure = createAction('[Order] Get Orders Failure', props<{ payload: any }>());

// CREATE ORDER
export const CreateOrderRequest = createAction('[Order] Create Order Request', props<{ payload: any }>());
