import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { getCartTotalPrice } from '../../../../shared/helpers/cart.helper';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  public cart: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.orderedPizzas) {
      const orderedPizzasJson = JSON.parse(data.orderedPizzas);
      if (orderedPizzasJson) {
        this.cart = orderedPizzasJson;
      }
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  getObjectKeys(data: any) {
    return data ? Object.keys(data) : [];
  }

  getTotalPrice(cart) {
    return getCartTotalPrice(cart);
  }
}
