import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createForm, validForm } from '../../../../shared/helpers/form.helper';
import { ViewFieldSet } from '../../../../shared/models/field-set';
import { Store } from '@ngrx/store';
import { PizzaModelDto } from '../../models/pizza-model-dto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdatePizzaRequest } from '../../actions/pizza.actions';
import { User } from '../../../../core/models/user';
import { State } from '../../reducers/pizza.reducer';
import { PIZZA_TYPES } from '../../../../core/constants/general.constants';

@Component({
  selector: 'app-update-pizza',
  templateUrl: './update-pizza.component.html',
  styleUrls: ['./update-pizza.component.scss']
})
export class UpdatePizzaComponent implements OnInit {
  public formFields = {
    title: {
      value: null,
      label: 'Title',
      validators: {required: true},
      view: ViewFieldSet.vertical
    },
    description: {
      value: null,
      label: 'Description',
      validators: {required: true},
      view: ViewFieldSet.vertical
    },
    price: {
      value: null,
      label: 'Price $',
      validators: {required: true},
      view: ViewFieldSet.vertical
    },
    type: {
      value: '',
      label: 'Type',
      validators: {required: true},
      view: ViewFieldSet.vertical
    }
  };
  public form: FormGroup;
  public pizzaTypes = PIZZA_TYPES;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = createForm(this.fb, this.formFields);
  }

  ngOnInit() {
    if (this.data && this.data.pizza) {
      this.form.patchValue({
        ...this.data.pizza
      });
    }
  }

  save() {
    if (validForm(this.form, this.formFields)) {
      this.store.dispatch(
        UpdatePizzaRequest({
          payload: {
            ...this.form.value,
            _id: this.data.pizza._id
          } as PizzaModelDto
        })
      );
    }
  }
}
