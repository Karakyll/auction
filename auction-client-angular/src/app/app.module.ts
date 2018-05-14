import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { CollapseModule, BsModalRef, ModalModule, ButtonsModule} from "ngx-bootstrap";
import { TabsModule } from 'ngx-bootstrap';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
import { UserOperationsComponent } from './components/user/user-operations/user-operations.component';
import { ManageAuctionsComponent } from './components/management/manage-auctions/manage-auctions.component';
import { ManageProductsComponent } from './components/management/manage-products/manage-products.component';
import { ManageBetsComponent } from './components/management/manage-bets/manage-bets.component';
import { ManageCategoriesComponent } from './components/management/manage-categories/manage-categories.component';
import { ManagementComponent } from './components/management/management.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

import { AuctionService } from "./services/auction/auction.service";
import { ProductService } from "./services/product/product.service";
import { CategoryService } from "./services/category/category.service";
import { BetService } from "./services/bet/bet.service";
import { UserService } from "./services/user/user.service";
import { LoginService } from "./services/login/login.service";
import { DateService } from "./services/date/date.service";
import { LoggedInGuard } from "./services/guard/logged-in-guard.service";
import { InteractionService } from "./services/interaction/interaction.service";
import { ConfigService } from "./services/config/config.service";
import { AdminGuard } from "./services/guard/admin-guard.service";
import { ManagerGuard } from "./services/guard/manager-guard.service";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";

const appRoutes: Routes = [
  {path:'', component:AboutComponent},
  {path:'auctions', component:AuctionComponent},
  {path:'user', component:UserComponent, canActivate:[LoggedInGuard]},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'auctions/:id', component:AuctionDetailsComponent},
  {path:'auction/start', component:StartAuctionComponent, canActivate:[LoggedInGuard]},
  {path:'administration', component:AdministrationComponent, canActivate:[LoggedInGuard, AdminGuard]},
  {path:'management', component:ManagementComponent, canActivate:[LoggedInGuard, ManagerGuard]},
  {path:'management/auctions', component:ManageAuctionsComponent, canActivate:[LoggedInGuard, ManagerGuard]},
  {path:'management/products', component:ManageProductsComponent, canActivate:[LoggedInGuard, ManagerGuard]},
  {path:'management/bets', component:ManageBetsComponent, canActivate:[LoggedInGuard, ManagerGuard]},
  {path:'management/categories', component:ManageCategoriesComponent, canActivate:[LoggedInGuard, ManagerGuard]}
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
    StartAuctionComponent,
    UserOperationsComponent,
    ManageAuctionsComponent,
    ManageProductsComponent,
    ManageBetsComponent,
    ManageCategoriesComponent,
    ManagementComponent,
    AdministrationComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    Angular2FontawesomeModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }})
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
    LoggedInGuard,
    InteractionService,
    AdminGuard,
    ManagerGuard,
    TranslateService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
