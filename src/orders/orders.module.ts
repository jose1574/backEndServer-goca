import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { ClientsService } from 'src/clients/services/clients.service';
import { ServicesSql } from './services/functionSQL';
@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ClientsService, ServicesSql],
})
export class OrdersModule {}
