import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Client } from 'pg';
import { CreateClientDto } from '../dtos/clients.dto';

@Injectable()
export class ClientsService {
  constructor(@Inject('PG') private client: Client) {}
  findAll() {
    return this.client
      .query('SELECT * FROM clients')
      .then((data: any) => {
        return data.rows;
      })
      .catch((error: Error) => error);
  }

  findOne(id: string) {
    return this.client
      .query(`SELECT * FROM clients WHERE code='${id}'`)
      .then((data) => {
        if (data.rowCount === 0) {
          throw new Error();
        }
        return data.rows;
      })
      .catch(() => {
        throw new NotFoundException(`Cliente con el codigo ${id} no existe`);
      });
  }

  insertClient(payload: CreateClientDto) {
    return this.client
      .query(
        `
    INSERT INTO clients VALUES ('${payload.code}', '${payload.desciption}', '${payload.address}', 
      '${payload.code}', '${payload.email}', '${payload.phone}', '', 
      '00', '00', '00', '00', '00', '00', '00', 
      '00', '0', '0', '${payload.client_type}', '0',
      '01', '1', 'FALSE', '00', '00', 
      '0', '0', 'C', 'FALSE', 
      'FALSE', 'FALSE', 'FALSE');`,
      )
      .then((data) => {
        if (data.rowCount === 0) {
          throw new Error();
        }
        return { message: 'datos insertados correctamente' };
      })
      .catch((error) => {
        throw new NotFoundException(`error al insertar los datos: ${error}`);
      });
  }
}
