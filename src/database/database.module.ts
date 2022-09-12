// src/database/database.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { Client } from 'pg';

import config from './config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgresql;
        return {
          type: 'postgres',
          synchronize: false, // [true = solo para desarrollo, en caso de no usar migraciones]
          autoLoadEntities: true,
          username: user,
          host,
          database: dbName,
          password,
          port,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
  /*
  providers: [
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgresql;

        // instancia configuracion postgresql
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });

        //conecta db
        client.connect();

        return client;
      },
      inject: [config.KEY],
    },
  ],
  */
  //exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
