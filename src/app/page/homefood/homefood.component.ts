import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';
import { BasketfoodComponent } from '../basketfood/basketfood.component';
import { ItemfoodComponent } from '../itemfood/itemfood.component';
import { OrderfoodComponent } from '../orderfood/orderfood.component';
import { Convert as foodCvt, Food } from 'src/app/model/food.model';
import { Convert as foodtypeCvt,  Foodtype} from 'src/app/model/foodtype.model';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-homefood',
  templateUrl: './homefood.component.html',
  styleUrls: ['./homefood.component.scss']
})
export class HomefoodComponent {

  foods = Array<Food>();
  foodtypes = Array<Foodtype>();
  // choose : any;

  constructor(private router: Router,public dialog: MatDialog,private http : HttpClient,private dataService : DataService, ) {
    console.log(">>>>>>>>>> BID"+this.dataService.bill.b_id);

    http.get(dataService.apiEndpoint + "/food").subscribe((data : any)=>{
      // this.foods = foodCvt.toFood(JSON.stringify(data));
      // this.choose = this.foods[0];
      if(this.dataService.user.role != 'cus'){
        console.log("not have data");
      // console.log(this.foods);
      }
      else{
        this.foods = foodCvt.toFood(JSON.stringify(data));
        // this.choose = this.foods[0];

      }

    });

    http.get(dataService.apiEndpoint + "/foodtype").subscribe((data : any)=>{
      this.foodtypes = foodtypeCvt.toFoodtype(JSON.stringify(data));
      console.log(this.foodtypes);
    });
  }



  findFoodtype(name : string){
    this.http.get(this.dataService.apiEndpoint + "/food/name/" + name).subscribe((data : any)=>{
      this.foods = foodCvt.toFood(JSON.stringify(data));
    });
  }

  findfoodAll(){
    this.http.get(this.dataService.apiEndpoint + "/food").subscribe((data : any)=>{
      this.foods = foodCvt.toFood(JSON.stringify(data));
    });
  }

  openItem(food : any) {
    this.dataService.chooseFood = food;
    this.dialog.open(ItemfoodComponent);
  }

  openBasket() {
    this.dialog.open(BasketfoodComponent,{
      minWidth: '500px',
    });
  }


  openOrder() {
    this.dialog.open(OrderfoodComponent,{
      minWidth: '500px',
    });
  }

  logout() {
    if (confirm("คุณต้องการออกจากระบบ!")) {
      this.router.navigate(['']);
    } else {

    }
  }


}


