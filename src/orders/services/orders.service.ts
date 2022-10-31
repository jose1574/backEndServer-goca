import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { ClientsService } from 'src/clients/services/clients.service';
@Injectable()
export class OrdersService {
  constructor(
    @Inject('PG') private client: Client,
    private clientService: ClientsService,
  ) {}

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

  getTime() {
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    return `${hour}-${minute}-${second}`;
  }

  insertOrder(id: string) {
    let document_no: string;
    const date = new Date().toLocaleDateString();
    const time = this.getTime();
    let user;

    this.getNoDocumentControl()
      .then((numControl) => {
        document_no = numControl;
      })
      .then(async () => {
        const findUser = await this.clientService.findOne(id);
        user = findUser[0];
        return findUser;
      })
      .catch((error) => error);
  }
}
