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

  findAll(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri());
  }

  findById(id: number): Observable<Auction> {
    return this.http.get<Auction>(this.uri() + '/' + id);
  }

  findOngoing(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('finished', 'false')
    });
  }

  findFinished(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('finished', 'true')
    });
  }

  findByCategory(category): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('category', category)
    });
  }

  findByProductNameContains(searchTag): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('search', searchTag)
    });
  }

  findByUserName(username): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('user', username)
    });
  }

  findByEndBefore(date): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('endBefore', date)
    });
  }

  save(auction: Auction, duration): Observable<Auction> {
    return this.http.post<Auction>(this.uri(), auction, {params: new HttpParams().set('duration', duration)});
  }

  deleteById(id: number) {
    return this.http.delete(this.uri() + '/' + id);
  }

  finish(id: number): Observable<Auction> {
    return this.http.put<Auction>(this.uri() + '/' + id, null, {
      params: new HttpParams().set('finish', 'true')
    });
  }

}
