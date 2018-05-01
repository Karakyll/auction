import { Component, OnInit } from '@angular/core';
import {Auction} from "../../models/auction";
import {ProductService} from "../../services/product/product.service";
import {InteractionService} from "../../services/interaction/interaction.service";
import {DateService} from "../../services/date/date.service";
import {LoginService} from "../../services/login/login.service";
import {AuctionService} from "../../services/auction/auction.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-auction',
  templateUrl: './start-auction.component.html',
  styleUrls: ['./start-auction.component.css']
})
export class StartAuctionComponent implements OnInit {

  duration:number;
  buttonLocked:boolean = false;

  newAuction:Auction = {
    id: null,
    product: null,
    owner_name: "",
    createTime: "",
    endTime: "",
    description: "",
    finished: null
  };

  constructor(
    private interact:InteractionService,
    private productService:ProductService,
    private auctionService:AuctionService,
    private dateService:DateService,
    private auth:LoginService,
    private router:Router
  ) { }

  ngOnInit() {
    this.subscribeProductSelected();
  }

  startAuction() {
    this.buttonLocked = true;
    this.newAuction.owner_name = this.auth.getUserData().userName;
    this.newAuction.createTime = this.dateService.getDateTime();
    this.newAuction.endTime = this.dateService.getDateTime(+this.duration);
    this.newAuction.finished = false;
    this.auctionService.saveAuction(this.newAuction).subscribe(res => {
      this.router.navigateByUrl("/auctions/" + res.id);
      this.buttonLocked = false;
    });
  }

  selectExistProduct() {
    this.interact.toggleSelectProductModal();
  }

  createNewProduct() {
    this.interact.toggleCreateNewProductModal();
  }

  editNewProduct() {
    this.interact.toggleEditNewProductModal();
  }

  subscribeProductSelected() {
    this.interact._productSelected.subscribe(product => {
      this.newAuction.product = product;
    })
  }

}
