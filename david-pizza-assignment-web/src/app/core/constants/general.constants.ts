import { PizzaTypesEnum } from '../enums/pizza-types.enum';
import { RolesEnum } from '../enums/roles.enum';

export const LOCALSTORAGE_USER = 'user';

export const ROLES = [
  {title: 'user', value: RolesEnum.User},
  {title: 'admin', value: RolesEnum.Admin}
];

export const PIZZA_TYPES = [
  {
    title: 'Margherita', value: PizzaTypesEnum.Margherita
  },
  {
    title: 'Capricciosa', value: PizzaTypesEnum.Capricciosa
  },
  {
    title: 'Marinara', value: PizzaTypesEnum.Marinara
  },
  {
    title: 'Pugliese', value: PizzaTypesEnum.Pugliese
  },
  {
    title: 'Napoletana', value: PizzaTypesEnum.Napoletana
  }
];
