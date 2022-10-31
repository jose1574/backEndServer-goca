import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  async products() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  oneProduct(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
