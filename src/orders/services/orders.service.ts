import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class OrdersService {
  constructor(@Inject('PG') private client: Client) {}

  findAll() {
    return this.client.query(
      `SELECT * FROM sales_operation WHERE operation_type='ORDER'`,
    );
  }
}
