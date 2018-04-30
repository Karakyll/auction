import { Component, OnInit } from '@angular/core';
import {Auction} from "../../models/auction";
import {ProductService} from "../../services/product/product.service";
import {InteractionService} from "../../services/interaction/interaction.service";
import {DateService} from "../../services/date/date.service";
import {LoginService} from "../../services/login/login.service";

@Component({
  selector: 'app-start-auction',
  templateUrl: './start-auction.component.html',
  styleUrls: ['./start-auction.component.css']
})
export class StartAuctionComponent implements OnInit {

  duration:number;

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
    private dateService:DateService,
    private auth:LoginService
  ) { }

  ngOnInit() {
    this.subscribeProductSelected();
  }

  startAuction() {
    this.newAuction.owner_name = this.auth.getUserData().userName;
    this.newAuction.createTime = this.dateService.getDateTime();
    this.newAuction.endTime = this.dateService.getDateTime(+this.duration);
    this.newAuction.finished = false;
    console.log(this.newAuction);
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
