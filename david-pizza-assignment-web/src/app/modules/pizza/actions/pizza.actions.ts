import { createAction, props } from '@ngrx/store';
import { Pizza } from '../../../core/models/pizza';

// GET LIST
export const GetPizzasRequest = createAction('[Pizza] Get Pizzas Request');
export const GetPizzasSuccess = createAction('[Pizza] Get Pizzas Success', props<{ payload: any }>());
export const GetPizzasFailure = createAction('[Pizza] Get Pizzas Failure', props<{ payload: any }>());

// CREATE Pizza
export const CreatePizzaRequest = createAction('[Pizza] Create Pizza Request', props<{ payload: any }>());
export const CreatePizzaSuccess = createAction('[Pizza] Create Pizza Success', props<{ payload: any }>());
export const CreatePizzaFailure = createAction('[Pizza] Create Pizza Failure', props<{ payload: any }>());

// UPDATE Pizza
export const UpdatePizzaRequest = createAction('[Pizza] Update Pizza Request', props<{ payload: any }>());
export const UpdatePizzaSuccess = createAction('[Pizza] Update Pizza Success', props<{ payload: any }>());
export const UpdatePizzaFailure = createAction('[Pizza] Update Pizza Failure', props<{ payload: any }>());

// DELETE Pizza
export const DeletePizzaRequest = createAction('[Pizza] Delete Pizza Request', props<{ payload: { pizzaId: string } }>());
export const DeletePizzaSuccess = createAction('[Pizza] Delete Pizza Success', props<{ payload: { pizzaId: string } }>());
export const DeletePizzaFailure = createAction('[Pizza] Delete Pizza Failure', props<{ payload: any }>());

// CART
export const AddToCart = createAction('[Pizza] Add To Cart', props<{ payload: { pizza: Pizza } }>());
export const RemoveFromCart = createAction('[Pizza] Remove From Cart', props<{ payload: { pizzaTitle: string } }>());
export const ClearCart = createAction('[Pizza] Clear Card');
