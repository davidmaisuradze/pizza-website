import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as OrderActions from '../../actions/order.actions';
import * as OrderSelectors from '../../selectors/order.selectors';
import { DialogManagerService } from '../../../dialog/services/dialog-manager.service';
import { State } from '../../reducers/order.reducer';
import { Order } from '../../../../core/models/order';
import { takeUntil } from 'rxjs/operators';
import { OrderDetailsComponent } from '../../components/order-details/order-details.component';
import { CurrencyEnum } from '../../../../core/enums/currency.enum';
import { dollarsToEuro } from '../../../../shared/helpers/currency.helpers';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {
  private _destroyed = new Subject();
  public orders$: Observable<Order[]>;
  public currencyTypes = CurrencyEnum;
  public currency = 'DOLLARS';

  constructor(private store: Store<State>,
              private dialogService: DialogManagerService) {
    this.orders$ = this.store.pipe(takeUntil(this._destroyed), select(OrderSelectors.selectOrders));
  }

  ngOnInit() {
    this.store.dispatch(OrderActions.GetOrdersRequest());
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  seeDetails(orderedPizzas) {
    this.dialogService.open(OrderDetailsComponent, {
      data: {
        orderedPizzas
      }
    });
  }

  onCurrencyChange(e) {
    this.currency = e.target.value;
  }

  getTotalPriceTitle(totalPrice) {
    return this.currency === CurrencyEnum.Dollars
      ? `$${totalPrice.toFixed(2)}` : `€${dollarsToEuro(totalPrice)}`;
  }

  ordersTrackByFn(item: Order) {
    return item ? item._id : null;
  }
}
