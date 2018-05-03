import { Product } from './product';

/**
 * Model represent auction entity
 */
export class Auction {
  constructor (
    public id: number,
    public owner_name: string,
    public product: Product,
    public createTime: string,
    public endTime: string,
    public description: string,
    public finished: boolean
  ) {}
}
