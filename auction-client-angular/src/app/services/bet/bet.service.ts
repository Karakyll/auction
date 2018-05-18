import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Bet} from '../../models/bet';
import {ConfigService} from "../config/config.service";

/**
 * Service to access bets data
 */
@Injectable()
export class BetService {

  /**
   * Constructor for bet service
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
    return this.config.getApiHref() + 'bets';
  }

  /**
   * Find all bets
   * @returns {Observable<Bet[]>}
   */
  findAll(): Observable<Bet[]> {
    return this.http.get<Bet[]>(this.uri());
  }

  /**
   * Find bet by id
   * @param id
   * @returns {Observable<Bet>}
   */
  findById(id): Observable<Bet> {
    return this.http.get<Bet>(this.uri(), {
      params: new HttpParams().set('id', id)
    });
  }

  /**
   * Find bets by auction id
   * @param id
   * @returns {Observable<Bet[]>}
   */
  findByAuctionId(id): Observable<Bet[]> {
    return this.http.get<Bet[]>(this.uri(), {
      params: new HttpParams().set('auctionId', id)
    });
  }

  /**
   * Find bets by username
   * @param user
   * @returns {Observable<Bet[]>}
   */
  findByUsername(user): Observable<Bet[]> {
    return this.http.get<Bet[]>(this.uri(), {
      params: new HttpParams().set('username', user)
    });
  }

  /**
   * Save bet
   * @param {Bet} bet
   * @returns {Observable<Bet>}
   */
  save(bet: Bet): Observable<Bet> {
    return this.http.post<Bet>(this.uri(), bet);
  }

  /**
   * Delete bet by id
   * @param id
   * @returns {Observable<Object>}
   */
  deleteById(id) {
    return this.http.delete(this.uri(), {
      params: new HttpParams().set('delete', id)
    });
  }

}
