import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuctionComponent } from './components/auction/auction/auction.component';
import { ProductComponent } from "./components/product/product/product.component";

import { AuctionService } from "./services/auction/auction.service";
import { ProductService } from "./services/product/product.service";

const appRoutes: Routes = [
  {path:'auctions', component:AuctionComponent},
  {path:'products', component:ProductComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuctionComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    AuctionService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
