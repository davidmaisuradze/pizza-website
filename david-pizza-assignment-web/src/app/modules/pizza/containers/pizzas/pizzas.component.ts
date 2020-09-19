import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as PizzaActions from '../../actions/pizza.actions';
import * as PizzaSelectors from '../../selectors/pizza.selectors';
import { take, takeUntil } from 'rxjs/operators';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ConfirmModalService } from '../../../../core/services/confirm-modal.service';
import { AuthSelectors } from '../../../auth';
import { Pizza } from '../../../../core/models/pizza';
import { AddPizzaComponent } from '../../components/add-pizza/add-pizza.component';
import { UpdatePizzaComponent } from '../../components/update-pizza/update-pizza.component';
import { User } from '../../../../core/models/user';
import { RolesEnum } from '../../../../core/enums/roles.enum';
import { DialogManagerService } from '../../../dialog/services/dialog-manager.service';
import { State } from '../../reducers/pizza.reducer';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  public user$: Observable<User>;
  public pizzas$: Observable<Pizza[]>;
  public userRoles = RolesEnum;
  public icons = {
    edit: faEdit,
    times: faTimes
  };

  constructor(private store: Store<State>, private confirmModalService: ConfirmModalService,
              private dialogService: DialogManagerService) {
    this.pizzas$ = this.store.pipe(takeUntil(this._destroyed$), select(PizzaSelectors.selectPizzas));
    this.user$ = this.store.pipe(takeUntil(this._destroyed$), select(AuthSelectors.selectUser));
  }

  ngOnInit() {
    this.store.dispatch(PizzaActions.GetPizzasRequest());
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  addPizza() {
    this.dialogService.open(AddPizzaComponent, {
      data: {}
    });
  }

  updatePizza(pizza: Pizza) {
    this.dialogService.open(UpdatePizzaComponent, {
      data: {
        pizza
      },
    });
  }

  addToCart(pizza: Pizza) {
    this.store.dispatch(PizzaActions.AddToCart({payload: {pizza}}));
  }

  cartClick() {
    this.dialogService.open(CartComponent, {
      data: {}
    });
  }

  removePizza(pizzaId: string, pizzaTitle: string) {
    this.confirmModalService
      .showConfirm({
        text: `Are you sure you want to remove pizza: ${pizzaTitle}`,
        title: 'Delete Pizza'
      })
      .pipe(take(1))
      .subscribe(
        result =>
          result && this.store.dispatch(PizzaActions.DeletePizzaRequest({payload: {pizzaId}}))
      );
  }

  pizzasTrackByFn(item: Pizza) {
    return item ? item._id : null;
  }
}
