import { Client } from 'pg';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ServicesSql {
  constructor(@Inject('PG') private clientPg: Client) {}

  //para obtener el numero de documento
  async getNextDocument() {
    let result = await this.clientPg.query(
      `SELECT get_next_document('ORDER', 'SALES', TRUE, FALSE, '00')`,
    );

    return (result = result.rows[0].get_next_document);
  }

  //para guardar una factura
  saveSalesOperation(documentNo, client) {
    console.log('aqui', client);

    return this.clientPg.query(`

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
         VALUES ('ORDER', '${documentNo}', '', CURRENT_DATE, CAST ('12:05:06.0000000' AS TIME), CURRENT_DATE, '${client[0].code}', '${client[0].description}',
         '${client[0].code}', '${client[0].address}', '${client[0].phone}', 1, '01', 0, CURRENT_DATE, FALSE, '', '00', '00', '01', '00',
         FALSE, 2, 350, 56, 406, 0, 0, 0, 0, 350, 56, 406, 0, 0, '', 0, 350, 56, 406, 2, TRUE, FALSE, '01', 16,
         0, 0, 0, 0, 0, 0, 0, '0000000001', FALSE, '', '', null, '02', FALSE, '', '', '', FALSE, FALSE, 0,
         FALSE, 0, 0, 0, 0);

    `)
  }
}
