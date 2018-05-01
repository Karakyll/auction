import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Auction} from "../../../models/auction";
import {AuctionService} from "../../../services/auction/auction.service";

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
    private auctionService:AuctionService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getAuctions();
  }

  getAuctions() {
    this.auctionService.getAllAuctions().subscribe(res => {
      this.auctions = res;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.auctionService.deleteAuctionById(this.selectedAuction.id).subscribe(res => {
      this.auctions.splice(this.auctions.indexOf(this.selectedAuction),1);
      this.modalRef.hide();
    });
  }

  decline(): void {
    this.modalRef.hide();
  }

}
