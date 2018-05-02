/**
 * Model represent bet entity
 */
export class Bet {
  constructor(
    public id:number,
    public auction_id:number,
    public user_name:string,
    public betTime:string,
    public price:number
  ){};
}
