/**
 * Model represent product entity
 */
export class Product {
  constructor(public id: number,
              public name: string,
              public category_name: string,
              public price: number,
              public description: string) {
  }
}
