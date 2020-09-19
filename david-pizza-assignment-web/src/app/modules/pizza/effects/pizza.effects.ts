import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as PizzaActions from '../actions/pizza.actions';
import { GetPizzasRequest } from '../actions/pizza.actions';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { getErrorMessage } from '../../../shared/helpers/error-message.helper';
import { PizzaService } from '../../../core/services/pizza.service';
import { DialogManagerService } from '../../dialog/services/dialog-manager.service';
import { State } from '../reducers/pizza.reducer';

@Injectable()
export class PizzaEffects {
  constructor(private store: Store<State>,
              private pizzaService: PizzaService,
              private actions$: Actions,
              private toastr: ToastrService,
              private dialogService: DialogManagerService
  ) {
  }

  getPizzasRequest$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(PizzaActions.GetPizzasRequest),
    mergeMap((action) =>
      this.pizzaService.getPizzas().pipe(
        map(pizzas => PizzaActions.GetPizzasSuccess({payload: pizzas})),
        catchError(err => of(PizzaActions.GetPizzasFailure({payload: err})))
      )
    )
  ));

  createPizzaRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(PizzaActions.CreatePizzaRequest),
    mergeMap(action =>
      this.pizzaService.createPizza(action.payload).pipe(
        map((result: any) => {
          this.dialogService.close();
          return GetPizzasRequest();
        }),
        catchError(error => {
          const errorMessage = getErrorMessage(error);
          this.toastr.error(errorMessage, 'Error!');
          return of(PizzaActions.CreatePizzaFailure(error));
        })
      )
    )
  ));

  updatePizzaRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(PizzaActions.UpdatePizzaRequest),
    mergeMap(action =>
      this.pizzaService.updatePizza(action.payload).pipe(
        map((result: any) => {
          this.dialogService.close();
          return GetPizzasRequest();
        }),
        catchError(error => {
          const errorMessage = getErrorMessage(error);
          this.toastr.error(errorMessage, 'Error!');
          return of(PizzaActions.UpdatePizzaFailure(error));
        })
      )
    )
  ));

  deletePizzaRequestEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(PizzaActions.DeletePizzaRequest),
    mergeMap(action => {
        const {pizzaId} = action.payload;

        return this.pizzaService.deletePizza(pizzaId).pipe(
          map(result => GetPizzasRequest()),
          catchError(error => {
            const errorMessage = getErrorMessage(error);
            this.toastr.error(errorMessage, 'Error!');
            return of(PizzaActions.DeletePizzaFailure(error));
          })
        );
      }
    )
  ));
}
