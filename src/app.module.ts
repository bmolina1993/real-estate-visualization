import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Client } from 'pg';

// instancia configuracion postgresql
const client = new Client({
  user: 'admin',
  host: '192.168.149.128',
  database: 'mydb',
  password: 'admin',
  port: 5432,
});

(async () => {
  //conecta
  await client.connect();
  try {
    //envia consulta
    const response = await client.query('select * from tasks;');
    console.log('response.rows: ', response.rows);
  } catch (error) {
    console.log('error.stack: ', error.stack);
  }
  //des-conecta
  await client.end();
})();

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
