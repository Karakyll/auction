import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Bet } from '../../models/bet';

const uri = 'http://localhost:8081/api/bets';

/**
 * Service to access bets data
 */
@Injectable()
export class BetService {

  constructor(private http: HttpClient) { }

  getAllBets(): Observable<Bet[]> {
    return this.http.get<Bet[]>(uri);
  }

  getBetById(id): Observable<Bet> {
    return this.http.get<Bet>(uri, {
      params: new HttpParams().set('id', id)
    });
  }

  getBetsByAuctionId(id): Observable<Bet[]> {
    return this.http.get<Bet[]>(uri, {
      params: new HttpParams().set('auctionId', id)
    });
  }

  getBetsByUsername(user): Observable<Bet[]> {
    return this.http.get<Bet[]>(uri, {
      params: new HttpParams().set('username', user)
    });
  }

  saveBet(bet: Bet): Observable<Bet> {
    return this.http.post<Bet>(uri, bet);
  }

  deleteBet(id) {
    return this.http.delete(uri, {
      params: new HttpParams().set('delete', id)
    });
  }

}
