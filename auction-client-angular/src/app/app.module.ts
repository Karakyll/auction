import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import {CollapseModule, BsModalRef, ModalModule, ButtonsModule} from "ngx-bootstrap";

import { AppComponent } from './app.component';
import { AuctionComponent } from "./components/auction/auction.component";
import { ProductComponent } from "./components/product/product.component";
import { CategoryComponent } from "./components/category/category.component";
import { BetComponent } from "./components/bet/bet.component";
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuctionDetailsComponent } from './components/auction-details/auction-details.component';
import { AboutComponent } from './components/about/about.component';
import { StartAuctionComponent } from './components/start-auction/start-auction.component';

import { AuctionService } from "./services/auction/auction.service";
import { ProductService } from "./services/product/product.service";
import { CategoryService } from "./services/category/category.service";
import { BetService } from "./services/bet/bet.service";
import { UserService } from "./services/user/user.service";
import { LoginService } from "./services/login/login.service";
import { DateService } from "./services/date/date.service";
import { RouterGuardService } from "./services/guard/router-guard.service";


const appRoutes: Routes = [
  {path:'', component:AboutComponent},
  {path:'auctions', component:AuctionComponent},
  {path:'products', component:ProductComponent},
  {path:'bets', component:BetComponent, canActivate:[RouterGuardService]},
  {path:'user', component:UserComponent, canActivate:[RouterGuardService]},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'auctions/:id', component:AuctionDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuctionComponent,
    ProductComponent,
    CategoryComponent,
    BetComponent,
    UserComponent,
    LoginComponent,
    NavbarComponent,
    HeaderComponent,
    SignupComponent,
    AuctionDetailsComponent,
    AboutComponent,
    StartAuctionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    Angular2FontawesomeModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    AuctionService,
    ProductService,
    CategoryService,
    BetService,
    UserService,
    LoginService,
    BsModalRef,
    DateService,
    RouterGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
