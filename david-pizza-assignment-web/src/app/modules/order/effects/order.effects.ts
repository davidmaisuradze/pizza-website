import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as OrderActions from '../actions/order.actions';
import { GetOrdersRequest } from '../actions/order.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { getErrorMessage } from '../../../shared/helpers/error-message.helper';
import { OrderService } from '../../../core/services/order.service';
import { DialogManagerService } from '../../dialog/services/dialog-manager.service';
import { State } from '../reducers/order.reducer';
import { Router } from '@angular/router';

@Injectable()
export class OrderEffects {
  constructor(private store: Store<State>,
              private orderService: OrderService,
              private actions$: Actions,
              private toastr: ToastrService,
              private router: Router,
              private dialogService: DialogManagerService
  ) {
  }

  getOrdersRequest$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.GetOrdersRequest),
    mergeMap((action) =>
      this.orderService.getOrders().pipe(
        map(orders => OrderActions.GetOrdersSuccess({payload: orders})),
        catchError(err => of(OrderActions.GetOrdersFailure({payload: err})))
      )
    )
  ));

  createOrderRequestEffect$: Observable<boolean | Promise<boolean>> = createEffect(() => this.actions$.pipe(
    ofType(OrderActions.CreateOrderRequest),
    mergeMap(action =>
      this.orderService.createOrder(action.payload).pipe(
        map((result: any) => {
          this.dialogService.close();
          return this.router.navigate(['/orders-list']);
        }),
        catchError(error => {
          const errorMessage = getErrorMessage(error);
          this.toastr.error(errorMessage, 'Error!');
          return of(false);
        })
      )
    )
  ), {dispatch: false});
}
