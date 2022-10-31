import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { ClientsService } from 'src/clients/services/clients.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ClientsService],
})
export class OrdersModule {}
