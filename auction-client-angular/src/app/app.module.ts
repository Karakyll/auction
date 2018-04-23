import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AuctionComponent } from './components/auction/auction/auction.component';

import { AuctionService } from "./services/auction/auction.service";


const appRoutes: Routes = [
  {path:'auctions', component:AuctionComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuctionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    AuctionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
