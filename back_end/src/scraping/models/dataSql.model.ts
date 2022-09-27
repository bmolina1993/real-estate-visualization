import { DataEstate } from '../../database/entities/dataEstate.entity';

export interface IDataSqlModelService {
  getAll(): Promise<DataEstate[]>;
  setAll(): void;
}
