// src/database/database.module.ts
import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './config';
import { DataEstateInsertService } from '../scraping/services/dataInsert.service';

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
  providers: [DataEstateInsertService],
  exports: [TypeOrmModule, DataEstateInsertService],
})
export class DatabaseModule {}
