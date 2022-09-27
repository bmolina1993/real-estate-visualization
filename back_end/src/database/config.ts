// src/database/config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgresql: {
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      dbName: process.env.POSTGRES_DATABASE,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.POSTGRES_PORT),
    },
  };
});
