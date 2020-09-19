import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PizzaModelDto } from '../../modules/pizza/models/pizza-model-dto';

@Injectable()
export class PizzaService {
  constructor(private http: HttpClient) {
  }

  getPizzas() {
    return this.http.get(`/api/pizza`);
  }

  createPizza(pizza: PizzaModelDto) {
    return this.http.post('/api/pizza', pizza);
  }

  updatePizza(pizza: PizzaModelDto) {
    return this.http.put('/api/pizza', pizza);
  }

  deletePizza(pizzaId: string) {
    return this.http.delete(`/api/pizza/${pizzaId}`);
  }
}
