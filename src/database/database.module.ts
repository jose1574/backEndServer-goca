import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'cadm_j295788193',
  password: 'root',
  port: 5432,
});

client.connect();

@Global()
@Module({
  providers: [
    {
      provide: 'PG',
      useValue: client,
    },
  ],
  exports: ['PG'],
})
export class DatabaseModule {}
