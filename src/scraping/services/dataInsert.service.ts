/*
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DataEstate } from '../../database/entities/dataEstate.entity';
import { connectionSource } from '../../database/dataSource';

@Injectable()
export class DataEstateInsertService {
  //@InjectRepository(DataEstate)
  private dataEstateRepo: Repository<DataEstate>;

  findAll() {
    return this.dataEstateRepo.createQueryBuilder();
  }
}
*/
