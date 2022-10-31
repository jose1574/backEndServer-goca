import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  async findProducts() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
