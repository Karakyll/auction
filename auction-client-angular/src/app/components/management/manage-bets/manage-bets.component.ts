import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Bet} from "../../../models/bet";
import {BetService} from "../../../services/bet/bet.service";

@Component({
  selector: 'app-manage-bets',
  templateUrl: './manage-bets.component.html',
  styleUrls: ['./manage-bets.component.css']
})
export class ManageBetsComponent implements OnInit {

  bets:Bet[];
  modalRef:BsModalRef;
  selectedBet:Bet;

  constructor(
    private betService:BetService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getBets();
  }

  getBets() {
    this.betService.getAllBets().subscribe(res => {
      this.bets = res;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.betService.deleteBet(this.selectedBet.id).subscribe(res => {
      this.bets.splice(this.bets.indexOf(this.selectedBet),1);
      this.modalRef.hide();
    });
  }

  decline(): void {
    this.modalRef.hide();
  }

}
