// src/database.dataSource.ts
import { DataSource } from 'typeorm';
import 'dotenv/config';

export const connectionSource = new DataSource({
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: Number(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
  synchronize: false,
  logging: true,
  entities: ['src/*/*/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});
