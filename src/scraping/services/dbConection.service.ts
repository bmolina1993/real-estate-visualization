import { dataSource } from '../../database/dataSource';

// singleton
export class Singleton {
  private static instance: Singleton | null = null;
  private static dbConection = dataSource;

  // if not instanceded, create
  // else return the instanceded created
  static async getInstance() {
    if (Singleton.instance === null) {
      return (Singleton.instance = await this.dbConection.initialize());
    }
    return Singleton.instance;
  }
}

export const clientCode = async () => {
  const s1 = await Singleton.getInstance();
  const s2 = await Singleton.getInstance();

  if (s1 === s2) {
    console.log('🤓 singleton funcionando, misma conexion 🎉');
  } else {
    console.log('😿 singleton NO funciona correctamente 🙅‍♂️');
  }
};
