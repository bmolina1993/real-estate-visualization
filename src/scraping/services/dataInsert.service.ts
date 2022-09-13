import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DataEstate } from '../../database/entities/dataEstate.entity';

@Injectable()
export class DataEstateInsertService {
  constructor(
    @InjectRepository(DataEstate)
    private dataEstateRepo: Repository<DataEstate>,
  ) {}

  findAll() {
    return this.dataEstateRepo.find();
  }
}
