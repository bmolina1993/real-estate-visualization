import { DataSource } from 'typeorm';
import { dataSource } from '../../database/dataSource';

// singleton
export class Singleton extends DataSource {
  private static instance: Singleton | null = null;
  private static dbConection = dataSource;

  // if not instanceded, create
  // else return the instanceded created
  static async getInstance(): Promise<DataSource> {
    if (Singleton.instance === null) {
      return (Singleton.instance = await this.dbConection.initialize());
    }
    return Singleton.instance;
  }
}
