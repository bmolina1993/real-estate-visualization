import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseDate } from './baseDate.entity';

@Entity({ name: 'geolocation' })
export class Geolocation extends BaseDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_data_estate', type: 'int', nullable: false })
  idDataEstate: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  latitude: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  longitude: string;
}
