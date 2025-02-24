import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { HomefoodComponent } from './page/homefood/homefood.component';
import { OwnerComponent } from './page/owner/owner.component';
import { ItemfoodComponent } from './page/itemfood/itemfood.component';
import { BasketfoodComponent } from './page/basketfood/basketfood.component';
import { OrderfoodComponent } from './page/orderfood/orderfood.component';
import { PayfoodComponent } from './page/payfood/payfood.component';
import { OrderownerComponent } from './page/orderowner/orderowner.component';
import { StatusComponent } from './page/status/status.component';
import { HttpClient } from '@angular/common/http';
import { ShowbillComponent } from './page/showbill/showbill.component';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'foodhome', component: HomefoodComponent},
  {path: 'owner', component: OwnerComponent},
  {path: 'item', component:ItemfoodComponent},
  {path: 'pay', component: PayfoodComponent},
  {path: 'orderowner', component: OrderownerComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomefoodComponent,
    OwnerComponent,
    ItemfoodComponent,
    BasketfoodComponent,
    OrderfoodComponent,
    PayfoodComponent,
    OrderownerComponent,
    StatusComponent,
    ShowbillComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatChipsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
