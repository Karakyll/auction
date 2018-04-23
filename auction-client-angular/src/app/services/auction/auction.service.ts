import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Auction } from "../../models/auction";

const uri= 'http://localhost:8081/auctions';

@Injectable()
export class AuctionService {

  constructor(private http:HttpClient) { }

  getAllAuctions():Observable<Auction[]> {
    return this.http.get<Auction[]>(uri);
  }

  getAuctionById(id:number):Observable<Auction> {
    return this.http.get<Auction>(uri + "/" + id);
  }

  getOngoingAuctions(finished):Observable<Auction[]> {
    return this.http.get<Auction[]>(uri, {
      params:new HttpParams().set('finished', finished)
    });
  }

  getAuctionsByCategory(category):Observable<Auction[]> {
    return this.http.get<Auction[]>(uri, {
      params:new HttpParams().set('category', category)
    });
  }

  getAuctionsProductContains(searchTag):Observable<Auction[]> {
    return this.http.get<Auction[]>(uri, {
      params:new HttpParams().set('search', searchTag)
    });
  }

  getAuctionsByUserName(username):Observable<Auction[]> {
    return this.http.get<Auction[]>(uri, {
      params:new HttpParams().set('user', username)
    });
  }

  getAuctionsEndBefore(date):Observable<Auction[]> {
    return this.http.get<Auction[]>(uri, {
      params:new HttpParams().set('endBefore', date)
    });
  }

  saveAuction(auction:Auction):Observable<Auction> {
    return this.http.post<Auction>(uri, auction);
  }

  deleteAuctionById(id:number) {
    return this.http.delete(uri + "/" + id);
  }

  finishAuction(id:number):Observable<Auction> {
    return this.http.put<Auction>(uri + "/" + id, null, {
      params:new HttpParams().set('finish', "true")
    });
  }

}
