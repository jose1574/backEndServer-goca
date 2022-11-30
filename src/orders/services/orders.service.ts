import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'pg';
import { ClientsService } from 'src/clients/services/clients.service';
import { ServicesSql } from '../services/functionSQL';
@Injectable()
export class OrdersService {
  constructor(
    @Inject('PG') private client: Client,
    private clientService: ClientsService,
    private serviceSql : ServicesSql,
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

  async insertOrder(id: string) {
    const documentNo = await this.serviceSql.getNextDocument();
    const client = await this.clientService.findOne(id);

    return this.serviceSql.saveSalesOperation(documentNo, client)
      .then((data) => data)
      .catch((error) => { throw new NotFoundException(error)})
  }

}
