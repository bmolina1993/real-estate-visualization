/**/
import { Module } from '@nestjs/common';
import { Client } from 'pg';
import 'dotenv/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// instancia configuracion postgresql
const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});

(async () => {
  //conecta
  await client.connect();
  try {
    //envia consulta
    const response = await client.query('select * from migrations;');
    console.log('response.rows: ', response.rows);
  } catch (error) {
    console.log('error.stack: ', error.stack);
  }
  //des-conecta
  await client.end();
})();

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
