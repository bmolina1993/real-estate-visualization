// src/database/entities/baseDate.entity.ts
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseDate {
  @CreateDateColumn({
    name: 'create_dttm',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDttm: Date;

  @UpdateDateColumn({
    name: 'update_dttm',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateDttm: Date;
}
