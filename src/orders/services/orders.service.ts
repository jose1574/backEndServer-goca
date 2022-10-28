import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
@Injectable()
export class OrdersService {
  constructor(@Inject('PG') private client: Client) {}

  findAll() {
    return this.client
      .query(`SELECT * FROM sales_operation WHERE operation_type='ORDER'`)
      .then((data: any) => data)
      .catch((error: Error) => error);
  }

  findOneOrder(id: any) {
    return this.client
      .query(
        `SELECT * FROM sales_operation 
        WHERE operation_type='ORDER' AND document_no='${id}'`,
      )
      .then((data: any) => data)
      .catch((error: Error) => error);
  }

  async getNoDocumentControl() {
    const numberControl = [];
    await this.findAll()
      .then((data) => data.rows)
      .then((orders) => {
        orders.map((item) => {
          const num = item.document_no;
          numberControl.push(Number(num));
        });
      });
    const result = Math.max(...numberControl) + 1;
    return result.toString().padStart(10, '0');
  }

  async insertOrder() {
    return await this.getNoDocumentControl();
    // console.log(toString(result));
  }
}
