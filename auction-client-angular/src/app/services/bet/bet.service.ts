import {EventEmitter, Injectable, Output, TemplateRef} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import {Bet} from "../../models/bet";
import {Auction} from "../../models/auction";

const uri = 'http://localhost:8081/api/bets';

@Injectable()
export class BetService {

  auction:Auction;

  constructor(private http:HttpClient) { }

  @Output() betsCall: EventEmitter<Auction> = new EventEmitter();
  @Output() newBetCall: EventEmitter<Auction> = new EventEmitter();
  @Output() betsRefresh: EventEmitter<any> = new EventEmitter();

  toggleBets(auction) {
    this.auction = auction;
    this.betsCall.emit(this.auction);
  }

  toggleNeBet(auction) {
    this.auction = auction;
    this.newBetCall.emit(this.auction);
  }

  refreshBets() {
    this.betsRefresh.emit();
  }

  getAllBets():Observable<Bet[]> {
    return this.http.get<Bet[]>(uri);
  }

  getBetById(id):Observable<Bet> {
    return this.http.get<Bet>(uri, {
      params:new HttpParams().set('id', id)
    });
  }

  getBetsByAuctionId(id):Observable<Bet[]> {
    return this.http.get<Bet[]>(uri, {
      params:new HttpParams().set('auctionId', id)
    });
  }

  getBetsByUsername(user):Observable<Bet[]> {
    return this.http.get<Bet[]>(uri, {
      params:new HttpParams().set('username', user)
    });
  }

  saveBet(bet:Bet):Observable<Bet> {
    return this.http.post<Bet>(uri, bet);
  }

  deleteBet(id) {
    return this.http.delete(uri, {
      params:new HttpParams().set('delete', id)
    })
  }

}
