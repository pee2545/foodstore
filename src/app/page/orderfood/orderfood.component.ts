import { HttpClient } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Convert as itemCvt, Item } from 'src/app/model/item.model';
import { Convert as billCvt, Bill } from 'src/app/model/bill.model';
import { Convert as billorderCvt, Orderbill } from 'src/app/model/orderbill.model';
import { Convert as itemorderCvt, Orderitem } from 'src/app/model/orderitem.model';
import { ShowbillComponent } from '../showbill/showbill.component';



@Component({
  selector: 'app-orderfood',
  templateUrl: './orderfood.component.html',
  styleUrls: ['./orderfood.component.scss'],
  template: '<div [style.background-color]="bgColor">This is my component</div>',
})

export class OrderfoodComponent {
  //#27BEDF
  bgColor = '#DF3D27';
  billchk = Array<Bill>();
  itemor = Array<Orderitem>();
  orderbill = Array<Orderbill>();

  constructor(private renderer: Renderer2,private dialogRef : MatDialogRef<OrderfoodComponent>,private router: Router,public dialog: MatDialog,private dataService : DataService,private http : HttpClient) {
    // http.get(dataService.apiEndpoint + "/bill/order/item/"+  this.dataService.user.u_id).subscribe((data)=>{
    //   console.log(data);
    //   this.itemor = itemorderCvt.toOrderitem(JSON.stringify(data));
    //   console.log(this.itemor);
    // });

    //chk_id->bill
  //   this.http.get(this.dataService.apiEndpoint + "/bill/chk/"+this.dataService.user.u_id).subscribe((data : any)=>{
  //     this.billchk = billCvt.toBill(JSON.stringify(data));
  //     if(this.dataService.bill.name == '' && this.dataService.bill.phone == ''){
  //       console.log("no order");
  //     }
  //     else{
  //       console.log("yes order");

  //     }

  //   });
    this.http.get(this.dataService.apiEndpoint + "/bill/order/"+ this.dataService.user.u_id).subscribe((data : any)=>{
      // this.billorder = billorderCvt.toBillorder(JSON.stringify(data));
      this.orderbill = billorderCvt.toOrderbill(JSON.stringify(data));
      // this.userr = this.user[0];
      // this.dataService.bill.b_id = this.bill[0].b_id;

    });


  }

  close(){
    this.dialogRef.close();
  }

  openItem(bid: number){
    this.dataService.orderitem.bill_id = bid;
    console.log(bid);
    this.dialog.open(ShowbillComponent);
  }

}
