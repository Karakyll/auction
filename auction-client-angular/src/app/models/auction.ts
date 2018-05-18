import {Product} from './product';

/**
 * Model represent auction entity
 */
export class Auction {
  constructor(public id: number,
              public owner_name: string,
              public product: Product,
              public createTime: Date,
              public endTime: Date,
              public description: string,
              public finished: boolean) {
  }
}
