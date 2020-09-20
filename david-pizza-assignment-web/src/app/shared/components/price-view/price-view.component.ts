import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CurrencyEnum } from '../../../core/enums/currency.enum';
import { dollarsToEuro } from '../../helpers/currency.helpers';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-price-view',
  templateUrl: './price-view.component.html',
  styleUrls: ['./price-view.component.scss']
})
export class PriceViewComponent implements OnInit, OnChanges {
  @Input()
  public totalPrice = 0;

  @Input()
  public idName = '';

  public priceTitle$ = new BehaviorSubject('');
  public currencyTypes = CurrencyEnum;
  public currency = 'DOLLARS';

  constructor() {
  }

  ngOnInit(): void {
    this.updatePriceTitle(this.totalPrice);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.totalPrice && changes.totalPrice.currentValue !== changes.totalPrice.previousValue) {
      this.updatePriceTitle(changes.totalPrice.currentValue);
    }
  }

  updatePriceTitle(totalPrice: number) {
    this.priceTitle$.next(
      this.currency === CurrencyEnum.Dollars
        ? `$${totalPrice.toFixed(2)}` : `€${dollarsToEuro(totalPrice)}`
    );
  }

  onCurrencyChange(e) {
    this.currency = e.target.value;
    this.updatePriceTitle(this.totalPrice);
  }
}
