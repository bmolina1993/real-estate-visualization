import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { BaseDate } from './baseDate.entity';

@Entity({ name: 'data_estate' })
export class DataEstate extends BaseDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  price: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  expense: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  published: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  views: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({
    name: 'feature_depto',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  featureDept: string;

  @Column({
    name: 'feature_general',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  featureGral: string;

  @Column({
    name: 'link_map',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  linkMap: string;

  @Column({ name: 'link_depto', type: 'varchar', length: 255, nullable: true })
  linkDepto: string;

  @Column({ name: 'link_base', type: 'varchar', length: 255, nullable: true })
  linkBase: string;
}
