import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { OrderfoodComponent } from '../orderfood/orderfood.component';
import { Convert as billCvt, Bill } from 'src/app/model/bill.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payfood',
  templateUrl: './payfood.component.html',
  styleUrls: ['./payfood.component.scss']
})
export class PayfoodComponent {
  bill = Array<Bill>();
  constructor(public dialog: MatDialog,private router: Router,private dataService : DataService,private http : HttpClient) { }

  back(){
    this.router.navigate(['/foodhome']);
  }

  payNow(name: string, address: string, phone: string) {
    const now = new Date();
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss');

    let newBill = {
      name: name,
      address: address,
      phone: phone,
      totalprice: this.dataService.itemBasket.sum,
      datetime: formattedDate,
      status: "ยังไม่จัดส่ง",
      cus_id: this.dataService.user.u_id
    };

    console.log('SUM = ' + this.dataService.itemBasket.sum);

    // ส่ง POST เพื่อสร้างบิลใหม่
    this.http.post(`${this.dataService.apiEndpoint}/bill`, newBill, { observe: 'response' })
      .subscribe({
        next: () => {
          console.log('Create new bill success');

          // ดึง ID ของบิลใหม่
          this.http.get(`${this.dataService.apiEndpoint}/bill/chk/${this.dataService.user.u_id}`)
            .subscribe({
              next: (data: any) => {
                this.bill = billCvt.toBill(JSON.stringify(data));
                this.dataService.bill.b_id = this.bill[0].b_id;
                console.log("NEW ID >>>>> " + this.dataService.bill.b_id);
                this.router.navigate(['/foodhome']);
              },
              error: (err) => console.error('Error fetching new bill:', err)
            });
        },
        error: (err) => console.error('Error creating new bill:', err)
      });

    console.log("out");
  }

}
