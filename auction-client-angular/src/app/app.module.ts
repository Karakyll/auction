import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuctionComponent } from "./components/auction/auction.component";
import { ProductComponent } from "./components/product/product.component";
import { CategoryComponent } from "./components/category/category.component";
import { BetComponent } from "./components/bet/bet.component";
import { UserComponent } from './components/user/user.component';

import { AuctionService } from "./services/auction/auction.service";
import { ProductService } from "./services/product/product.service";
import { CategoryService } from "./services/category/category.service";
import { BetService } from "./services/bet/bet.service";
import { UserService } from "./services/user/user.service";

const appRoutes: Routes = [
  {path:'auctions', component:AuctionComponent},
  {path:'products', component:ProductComponent},
  {path:'categories', component:CategoryComponent},
  {path:'bets', component:BetComponent},
  {path:'users', component:UserComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuctionComponent,
    ProductComponent,
    CategoryComponent,
    BetComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    AuctionService,
    ProductService,
    CategoryService,
    BetService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
