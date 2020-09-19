import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { CurrencyEnum } from '../../../core/enums/currency.enum';
import { dollarsToEuro } from '../../helpers/currency.helpers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input()
  public user: any;

  @Input()
  public cartCount: any;

  @Input()
  public totalPrice: any;

  public icons = {
    cart: faShoppingCart
  };
  public priceTitle$ = new BehaviorSubject('');
  public currencyTypes = CurrencyEnum;
  public currency = '';

  @Output()
  public logout: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public cartClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    this.currency = 'DOLLARS';
    this.updatePriceTitle(this.totalPrice);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.totalPrice && changes.totalPrice.currentValue !== changes.totalPrice.previousValue) {
      this.updatePriceTitle(changes.totalPrice.currentValue);
    }
  }

  onLogout() {
    this.logout.emit();
  }

  onCartClick() {
    this.cartClick.emit();
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
