import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../services/orders.service';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  
  @Get()
  findAllOrders() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOneOrders(@Param('id') id: any) {
    return this.ordersService.findOneOrder(id);
  }

  @Post(':id')
  insertOrder(@Param('id') id: string) {    
    return this.ordersService.insertOrder(id);
  }

}
