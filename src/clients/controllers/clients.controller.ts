import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { CreateClientDto } from '../dtos/clients.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}
  @Get()
  clients() {
    return this.clientService.findAll();
  }

  @Get(':id')
  oneProduct(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Post()
  addClient(@Body() payload: CreateClientDto) {
    return this.clientService.insertClient(payload);
  }
}
