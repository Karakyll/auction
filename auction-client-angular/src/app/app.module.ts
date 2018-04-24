import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OAuthModule } from "angular-oauth2-oidc";

import { AppComponent } from './app.component';
import { AuctionComponent } from "./components/auction/auction.component";
import { ProductComponent } from "./components/product/product.component";
import { CategoryComponent } from "./components/category/category.component";
import { BetComponent } from "./components/bet/bet.component";
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';

import { AuctionService } from "./services/auction/auction.service";
import { ProductService } from "./services/product/product.service";
import { CategoryService } from "./services/category/category.service";
import { BetService } from "./services/bet/bet.service";
import { UserService } from "./services/user/user.service";
import { LoginService } from "./services/login/login.service";



const appRoutes: Routes = [
  {path:'auctions', component:AuctionComponent},
  {path:'products', component:ProductComponent},
  {path:'categories', component:CategoryComponent},
  {path:'bets', component:BetComponent},
  {path:'users', component:UserComponent},
  {path:'llogin', component:LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuctionComponent,
    ProductComponent,
    CategoryComponent,
    BetComponent,
    UserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [
    AuctionService,
    ProductService,
    CategoryService,
    BetService,
    UserService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
