import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseDate } from './baseDate.entity';

@Entity({ name: 'feature_depto' })
export class FeatureDepto extends BaseDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_data_estate', type: 'int', nullable: false })
  idDataEstate: number;

  @Column({ name: 'm2_total', type: 'int', nullable: true })
  m2Total: number;

  @Column({ name: 'm2_cubierta', type: 'int', nullable: true })
  m2Cubierta: number;

  @Column({ type: 'int', nullable: true })
  ambiente: number;

  @Column({ type: 'int', nullable: true })
  banio: number;

  @Column({ type: 'int', nullable: true })
  dormitorio: number;

  @Column({ type: 'int', nullable: true })
  antiguedad: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  disposicion: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  orientacion: string;

  @Column({ type: 'int', nullable: true })
  cochera: number;
}
