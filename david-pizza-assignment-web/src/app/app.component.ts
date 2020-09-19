import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthActions, AuthSelectors } from './modules/auth';
import { LOCALSTORAGE_USER } from './core/constants/general.constants';
import { LoginUserFailure, LoginUserSuccess } from './modules/auth/actions/auth.actions';
import { State } from './modules/auth/reducers/auth.reducer';
import { takeUntil } from 'rxjs/operators';
import * as PizzaSelectors from './modules/pizza/selectors/pizza.selectors';
import { DialogManagerService } from './modules/dialog/services/dialog-manager.service';
import { CartComponent } from './modules/pizza/components/cart/cart.component';
import { getCartTotalPrice } from './shared/helpers/cart.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private _destroyed$ = new Subject();
  public user$: Observable<any>;
  public cartCount: number;
  public totalPrice: number;

  constructor(private store: Store<State>, private router: Router, private dialogService: DialogManagerService) {
    this.user$ = this.store.pipe(takeUntil(this._destroyed$), select(AuthSelectors.selectUser));
    this.store.pipe(takeUntil(this._destroyed$), select(PizzaSelectors.selectCart))
      .subscribe(cart => {
        this.cartCount = Object.keys(cart).reduce((sum, key) => {
          if (cart[key].length) {
            sum += cart[key].length;
          }
          return sum;
        }, 0);

        this.totalPrice = getCartTotalPrice(cart);
      });

    const checkUser = localStorage.getItem(LOCALSTORAGE_USER);
    if (checkUser) {
      const {token, user} = JSON.parse(checkUser);
      this.store.dispatch(LoginUserSuccess({payload: {token, user}}));
    } else {
      this.store.dispatch(LoginUserFailure({payload: {}}));
    }
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  logout() {
    this.store.dispatch(AuthActions.LogoutUserRequest());
    return this.router.navigate(['/home']);
  }

  cartClick() {
    this.dialogService.open(CartComponent, {
      data: {}
    });
  }
}
