import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Auction} from "../../../models/auction";
import {AuctionService} from "../../../services/auction/auction.service";
import {InteractionService} from "../../../services/interaction/interaction.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-manage-auctions',
  templateUrl: './manage-auctions.component.html',
  styleUrls: ['./manage-auctions.component.css']
})
export class ManageAuctionsComponent implements OnInit {

  auctions:Auction[];
  modalRef:BsModalRef;
  selectedAuction:Auction;

  constructor(
    private interact:InteractionService,
    private auctionService:AuctionService,
    private modalService: BsModalService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.getAuctions();
    this.subscribeUserListChanging();
    this.subscribeProductListChanging();
    this.subscribeCategoryListChanging();
  }

  getAuctions() {
    this.auctionService.getAllAuctions().subscribe(res => {
      this.auctions = res;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDeleteAuction(): void {
    this.auctionService.deleteAuctionById(this.selectedAuction.id).subscribe(res => {
      this.interact.callAuctionChanging();
      this.auctions.splice(this.auctions.indexOf(this.selectedAuction),1);
      this.modalRef.hide();
    });
  }

  declineDeleteAuction(): void {
    this.modalRef.hide();
  }

  subscribeUserListChanging() {
    this.interact._userListChanged.subscribe(res => {
      this.getAuctions();
    })
  }

  subscribeProductListChanging() {
    this.interact._productListChanged.subscribe(res => {
      this.getAuctions();
    })
  }

  subscribeCategoryListChanging() {
    this.interact._categoryListChanged.subscribe(res => {
      this.getAuctions();
    })
  }

}
