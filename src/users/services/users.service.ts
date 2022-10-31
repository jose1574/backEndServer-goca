import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class UsersService {
  constructor(@Inject('PG') private client: Client) {}
  findAll() {
    return this.client
      .query('SELECT * FROM users')
      .then((data: any) => data)
      .catch((error: Error) => error);
  }

  findOne(id: string) {
    return this.client
      .query(`SELECT * FROM users WHERE code='${id}'`)
      .then((data) => {
        if (data.rowCount === 0) {
          throw new Error();
        }
        return data.rows;
      })
      .catch(() => {
        throw new NotFoundException(`Usuario con el codigo ${id} no existe`);
      });
  }
}
