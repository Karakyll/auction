import { Component, OnInit } from '@angular/core';
import {BetService} from "../../services/bet/bet.service";
import {Bet} from "../../models/bet";

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {

  bets:Bet[];

  constructor(private betService:BetService) { }

  ngOnInit() {
    this.betService.getAllBets().subscribe(res => {
      this.bets = res;
    })
  }

  deleteBet(bet) {
    console.log("call delete");
    this.betService.deleteBet(bet.id).subscribe();
    console.log(bet);
  }

  saveBet(bet) {
    console.log("call save");
    this.betService.saveBet(bet).subscribe(res => {
      console.log(res);
    })

  }

}
