import { Module } from '@nestjs/common';
import { ClientsService } from './services/clients.service';
import { ClientsController } from './controllers/clients.controller';

@Module({
  providers: [ClientsService],
  controllers: [ClientsController]
})
export class ClientsModule {}
