import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Auction } from '../../models/auction';
import { ConfigService } from "../config/config.service";

/**
 * Service to access auctions data
 */
@Injectable()
export class AuctionService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  uri() {
    return this.config.getApiHref() + 'auctions'
  }

  getAllAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri());
  }

  getAuctionById(id: number): Observable<Auction> {
    return this.http.get<Auction>(this.uri() + '/' + id);
  }

  getOngoingAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('finished', 'false')
    });
  }

  getFinishedAuctions(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('finished', 'true')
    });
  }

  getAuctionsByCategory(category): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('category', category)
    });
  }

  getAuctionsProductContains(searchTag): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('search', searchTag)
    });
  }

  getAuctionsByUserName(username): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('user', username)
    });
  }

  getAuctionsEndBefore(date): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('endBefore', date)
    });
  }

  saveAuction(auction: Auction): Observable<Auction> {
    return this.http.post<Auction>(this.uri(), auction);
  }

  deleteAuctionById(id: number) {
    return this.http.delete(this.uri() + '/' + id);
  }

  finishAuction(id: number): Observable<Auction> {
    return this.http.put<Auction>(this.uri() + '/' + id, null, {
      params: new HttpParams().set('finish', 'true')
    });
  }

}
