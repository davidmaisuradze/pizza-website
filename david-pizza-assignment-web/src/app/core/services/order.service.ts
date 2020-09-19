import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderModelDto } from '../../modules/order/models/order-model-dto';

@Injectable()
export class OrderService {
  constructor(private http: HttpClient) {
  }

  getOrders() {
    return this.http.get(`/api/orders`);
  }

  createOrder(order: OrderModelDto) {
    return this.http.post('/api/orders', order);
  }
}
