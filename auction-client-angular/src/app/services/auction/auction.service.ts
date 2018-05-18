import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Auction} from '../../models/auction';
import {ConfigService} from "../config/config.service";

/**
 * Service to access auctions data
 */
@Injectable()
export class AuctionService {

  /**
   * Constructor for auction service
   * @param {HttpClient} http
   * @param {ConfigService} config
   */
  constructor(private http: HttpClient,
              private config: ConfigService) {
  }

  /**
   * Get api uri
   * @returns {string}
   */
  uri() {
    return this.config.getApiHref() + 'auctions'
  }

  /**
   * Find all auctions
   * @returns {Observable<Auction[]>}
   */
  findAll(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri());
  }

  /**
   * Find auction by id
   * @param {number} id
   * @returns {Observable<Auction>}
   */
  findById(id: number): Observable<Auction> {
    return this.http.get<Auction>(this.uri() + '/' + id);
  }

  /**
   * Find all ongoing auctions
   * @returns {Observable<Auction[]>}
   */
  findOngoing(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('finished', 'false')
    });
  }

  /**
   * Find all finished auctions
   * @returns {Observable<Auction[]>}
   */
  findFinished(): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('finished', 'true')
    });
  }

  /**
   * Find auctions by category name
   * @param category
   * @returns {Observable<Auction[]>}
   */
  findByCategory(category): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('category', category)
    });
  }

  /**
   * Finda auctions by product name contains tag
   * @param searchTag
   * @returns {Observable<Auction[]>}
   */
  findByProductNameContains(searchTag): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('search', searchTag)
    });
  }

  /**
   * Find auctions by username
   * @param username
   * @returns {Observable<Auction[]>}
   */
  findByUserName(username): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('user', username)
    });
  }

  /**
   * Find auctions what end before param date
   * @param date
   * @returns {Observable<Auction[]>}
   */
  findByEndBefore(date): Observable<Auction[]> {
    return this.http.get<Auction[]>(this.uri(), {
      params: new HttpParams().set('endBefore', date)
    });
  }

  /**
   * Save new auction
   * @param {Auction} auction
   * @param duration
   * @returns {Observable<Auction>}
   */
  save(auction: Auction, duration): Observable<Auction> {
    return this.http.post<Auction>(this.uri(), auction, {params: new HttpParams().set('duration', duration)});
  }

  /**
   * Delete auction by id
   * @param {number} id
   * @returns {Observable<Object>}
   */
  deleteById(id: number) {
    return this.http.delete(this.uri() + '/' + id);
  }

  /**
   * Finish auction
   * @param {number} id
   * @returns {Observable<Auction>}
   */
  finish(id: number): Observable<Auction> {
    return this.http.put<Auction>(this.uri() + '/' + id, null, {
      params: new HttpParams().set('finish', 'true')
    });
  }

}
