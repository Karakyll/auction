import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Bet } from '../../models/bet';
import {ConfigService} from "../config/config.service";

/**
 * Service to access bets data
 */
@Injectable()
export class BetService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  uri() {
    return this.config.getApiHref() + 'bets';
  }

  findAll(): Observable<Bet[]> {
    return this.http.get<Bet[]>(this.uri());
  }

  findById(id): Observable<Bet> {
    return this.http.get<Bet>(this.uri(), {
      params: new HttpParams().set('id', id)
    });
  }

  findByAuctionId(id): Observable<Bet[]> {
    return this.http.get<Bet[]>(this.uri(), {
      params: new HttpParams().set('auctionId', id)
    });
  }

  findByUsername(user): Observable<Bet[]> {
    return this.http.get<Bet[]>(this.uri(), {
      params: new HttpParams().set('username', user)
    });
  }

  save(bet: Bet): Observable<Bet> {
    return this.http.post<Bet>(this.uri(), bet);
  }

  deleteById(id) {
    return this.http.delete(this.uri(), {
      params: new HttpParams().set('delete', id)
    });
  }

}
