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

  //para devolver la hora
  getTime() {
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    return `${hour}-${minute}-${second}`;
  }

  insertOrder(id: string) {
    let document_no: string;
    let client: any;

    const date = new Date().toLocaleDateString(); //para obtener la fecha
    const time = this.getTime();

    return this.getNoDocumentControl() //devuelve el numero de control de los pedidos. esto deberia de ir a lo ultimo
      .then((numControl) => {
        document_no = numControl;
        
      })
      .then(async () => {
        const findClient = await this.clientService.findOne(id); //valida que el cliente exista
        client = findClient[0];

        return findClient;
      })
      .then(() => {       
        return this.client.query(`
        INSERT INTO sales_operation(operation_type, document_no, control_no, emission_date, 
          register_hour, register_date, client_code, client_name, client_id, 
          client_address, client_phone, client_name_fiscal, seller, credit_days, 
          expiration_date, wait, description, store, locations, user_code, 
          station, begin_used, total_amount, total_net_details, total_tax_details, 
          total_details, percent_discount, discount, percent_freight, freight, 
          total_net, total_tax, total, credit, cash, operation_comments, 
          type_price, total_net_cost, total_tax_cost, total_cost, total_count_details, 
          pending, canceled, freight_tax, freight_aliquot, total_retention_tax, 
          total_retention_municipal, total_retention_islr, total_operation, 
          retention_tax_prorration, retention_islr_prorration, retention_municipal_prorration, 
          document_no_internal, fiscal_impresion, fiscal_printer_serial, 
          fiscal_printer_z, fiscal_printer_date, coin_code, sale_point, 
          address_send, contact_send, phone_send, free_tax, delivered, 
          total_weight, restorant, total_exempt, base_igtf, percent_igtf, 
          igtf)
          VALUES ('ORDER', '${document_no}', '', CURRENT_DATE, CAST ('12:05:06.0000000' AS TIME), CURRENT_DATE, '${client.code}', '${client.description}', 
          '${client.code}', '${client.address}', '${client.phone}', 1, '01', 0, CURRENT_DATE, FALSE, '', '00', '00', '01', '00',
          FALSE, 2, 350, 56, 406, 0, 0, 0, 0, 350, 56, 406, 0, 0, '', 0, 350, 56, 406, 2, TRUE, FALSE, '01', 16, 
          0, 0, 0, 0, 0, 0, 0, '0000000001', FALSE, '', '', null, '02', FALSE, '', '', '', FALSE, FALSE, 0, 
          FALSE, 0, 0, 0, 0);
      `);
      })
      .catch((error) => error);
  }
}
