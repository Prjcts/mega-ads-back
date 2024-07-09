import { AdEntity, NewAdEntity, SimpleAdEntity } from '../types';
import { ValidationError } from '../utils/errors';
import { pool } from '../utils/db';
import { FieldPacket } from 'mysql2';

type AdRecordResult = [AdEntity[], FieldPacket[]];

class AdRecord implements AdEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  lat: number;
  lon: number;

  constructor(obj: NewAdEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError(
        'The name of the Ad must be between 1 and 100 characters'
      );
    }
    if (obj.description.length > 1000) {
      throw new ValidationError(
        'The description of the Ad must be less than 1024 characters'
      );
    }

    if (obj.price < 0 || obj.price > 9999999) {
      throw new ValidationError(
        'The price of the Ad must be between 1 and 9 999 999'
      );
    }

    //@TODO: Check if URL is valid!
    if (!obj.url || obj.url.length > 100) {
      throw new ValidationError(
        'The url of the Ad cannot be empty or exceed 100 characters'
      );
    }

    if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
      throw new ValidationError('The ad could not be located.');
    }

    // if (!obj.id) {
    //   throw new ValidationError('ID is required for AdRecord');
    // }
    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }
  static async getOne(id: string): Promise<AdRecord | null> {
    const [result] = (await pool.execute(
      'SELECT * FROM `ads` WHERE `id` =:id',
      {
        id,
      }
    )) as AdRecordResult;

    return result.length === 0 ? null : new AdRecord(result[0]);
  }

  static async findAll(name: string): Promise<SimpleAdEntity[]> {
   const [results] =  await pool.execute('SELECT * FROM `ads` WHERE `name` LIKE :search', {
      search: `%${name}%`
    }) as AdRecordResult;

    return results.map(result =>{
      const {id, lat, lon} =  result
      return {id, lat, lon}
    })
  }
}

export { AdRecord };
