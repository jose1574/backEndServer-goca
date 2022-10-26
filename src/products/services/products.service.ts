import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class ProductsService {
  constructor(@Inject('PG') private client: Client) {}

  findAll() {
    return this.client
      .query('SELECT * FROM products')
      .then((data: any) => data.rows)
      .catch((error: Error) => error);
  }

  findOne(id: string) {
    return this.client
      .query(`SELECT * FROM products WHERE code='${id}'`)
      .then((data) => {
        if (data.rowCount === 0) {
          throw new Error();
        }
        return data.rows;
      })
      .catch(() => {
        throw new NotFoundException(`Producto con el codigo ${id} no existe`);
      });
  }
}
