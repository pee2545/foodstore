import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StatusComponent } from '../status/status.component';
import { Convert as billorderCvt, Orderbill } from 'src/app/model/orderbill.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-orderowner',
  templateUrl: './orderowner.component.html',
  styleUrls: ['./orderowner.component.scss']
})
export class OrderownerComponent{

  nov = 15;

  orderowner = Array<Orderbill>();
  constructor(public dialog: MatDialog,private router: Router,private http : HttpClient,private dataService : DataService) {
    this.http.get(this.dataService.apiEndpoint + "/owner").subscribe((data : any)=>{
      // this.billorder = billorderCvt.toBillorder(JSON.stringify(data));
      this.orderowner = billorderCvt.toOrderbill(JSON.stringify(data));
    });
  }


  openOrder(bid_o: number) {
    this.dataService.bill_O.b_id = bid_o;
    console.log(bid_o);
    this.dialog.open(StatusComponent);

  }
  back(){
    this.router.navigate(['/owner']);
  }

  logout() {
    if (confirm("คุณต้องการออกจากระบบ!")) {
      this.router.navigate(['']);
    } else {

    }
  }

}
