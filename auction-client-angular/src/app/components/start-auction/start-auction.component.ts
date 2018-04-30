import { Component, OnInit } from '@angular/core';
import {Auction} from "../../models/auction";
import {ProductService} from "../../services/product/product.service";
import {InteractionService} from "../../services/interaction/interaction.service";

@Component({
  selector: 'app-start-auction',
  templateUrl: './start-auction.component.html',
  styleUrls: ['./start-auction.component.css']
})
export class StartAuctionComponent implements OnInit {

  radioModel = 'Middle';

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
    private interact:InteractionService
  ) { }

  ngOnInit() {
  }

  selectExistProduct() {

  }

  createNewProduct() {
    this.interact.toggleCreateProductModal();
  }

}
