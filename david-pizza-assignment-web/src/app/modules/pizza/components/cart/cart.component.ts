import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { State } from '../../reducers/pizza.reducer';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import * as PizzaActions from '../../actions/pizza.actions';
import * as PizzaSelectors from '../../selectors/pizza.selectors';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DialogManagerService } from '../../../dialog/services/dialog-manager.service';
import { getCartTotalPrice } from '../../../../shared/helpers/cart.helper';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  public cart$: Observable<any>;
  public icons = {
    minus: faMinus
  };

  constructor(
    private store: Store<State>,
    private router: Router,
    private dialogService: DialogManagerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cart$ = this.store.pipe(takeUntil(this._destroyed$), select(PizzaSelectors.selectCart));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  removeFromCart(pizzaTitle: string) {
    this.store.dispatch(PizzaActions.RemoveFromCart({payload: {pizzaTitle}}));
  }

  getObjectKeys(data: any) {
    return data ? Object.keys(data) : [];
  }

  order() {
    this.dialogService.close();
    this.router.navigate(['/order']);
  }

  isDisabled(cart: any) {
    const keys = Object.keys(cart);
    return !cart || !(cart && keys.length) || (cart && keys.length && !keys.some(key => cart[key].length));
  }

  getTotalPrice(cart) {
    return getCartTotalPrice(cart);
  }
}
