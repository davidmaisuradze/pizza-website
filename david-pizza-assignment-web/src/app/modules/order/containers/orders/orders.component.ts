import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as PizzaSelectors from '../../../pizza/selectors/pizza.selectors';
import { take, takeUntil } from 'rxjs/operators';
import { ConfirmModalService } from '../../../../core/services/confirm-modal.service';
import { AuthSelectors } from '../../../auth';
import { DialogManagerService } from '../../../dialog/services/dialog-manager.service';
import { State } from '../../reducers/order.reducer';
import { ViewFieldSet } from '../../../../shared/models/field-set';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createForm, validForm } from '../../../../shared/helpers/form.helper';
import { Router } from '@angular/router';
import * as OrderActions from '../../actions/order.actions';
import * as PizzaActions from '../../../pizza/actions/pizza.actions';
import { OrderModelDto } from '../../models/order-model-dto';
import { getCartTotalPrice } from '../../../../shared/helpers/cart.helper';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();
  public cart$: Observable<any>;

  public formFields = {
    name: {
      value: null,
      label: 'Name',
      validators: {required: true},
      view: ViewFieldSet.vertical
    },
    surname: {
      value: null,
      label: 'Surname',
      validators: {required: true},
      view: ViewFieldSet.vertical
    },
    address: {
      value: '',
      label: 'Address',
      validators: {required: true},
      view: ViewFieldSet.vertical
    },
    mobile: {
      value: '',
      label: 'Mobile',
      validators: {required: true},
      view: ViewFieldSet.vertical
    }
  };
  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<State>,
              private router: Router,
              private confirmModalService: ConfirmModalService,
              private dialogService: DialogManagerService) {
    this.form = createForm(this.fb, this.formFields);
    this.cart$ = this.store.pipe(takeUntil(this._destroyed$), select(PizzaSelectors.selectCart));
  }

  ngOnInit() {
    this.store.pipe(takeUntil(this._destroyed$), select(AuthSelectors.selectUser))
      .subscribe(user => {
        this.form.patchValue({name: user.firstName, surname: user.lastName});
      });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  save() {
    if (validForm(this.form, this.formFields)) {
      this.cart$.pipe(take(1)).subscribe(cart => {
        const totalPrice = getCartTotalPrice(cart);
        const formValue = this.form.value;
        this.store.dispatch(
          OrderActions.CreateOrderRequest({
            payload: {
              ...formValue,
              mobile: formValue.mobile ? formValue.mobile.toString() : '',
              totalPrice,
              orderedPizzas: JSON.stringify(cart)
            } as OrderModelDto
          }));
        this.store.dispatch(PizzaActions.ClearCart());
      });
    }
  }

  getTotalPrice(cart) {
    return getCartTotalPrice(cart);
  }

  cancel() {
    this.router.navigate(['/pizzas']);
  }
}
