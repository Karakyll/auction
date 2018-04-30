import { Component, OnInit } from '@angular/core';
import {Auction} from "../../models/auction";

@Component({
  selector: 'app-start-auction',
  templateUrl: './start-auction.component.html',
  styleUrls: ['./start-auction.component.css']
})
export class StartAuctionComponent implements OnInit {

  newAuction:Auction = new Auction(null, null, null,null, null,null,null);

  radioModel = 'Middle';

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }

}
