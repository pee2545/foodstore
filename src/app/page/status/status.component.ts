import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';
import { Convert as itemorderCvt, Orderitem } from 'src/app/model/orderitem.model';
import { Convert as billorderCvt, Orderbill } from 'src/app/model/orderbill.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  itemor = Array<Orderitem>();
  orderbill = Array<Orderbill>();
  constructor(private dialogRef : MatDialogRef<StatusComponent>,private dataService : DataService,private http : HttpClient) {
    http.get(dataService.apiEndpoint + "/owner/item/"+this.dataService.bill_O.b_id).subscribe((data)=>{
      console.log(data);
      this.itemor = itemorderCvt.toOrderitem(JSON.stringify(data));
      console.log(this.itemor);
    });


    this.http.get(this.dataService.apiEndpoint + "/owner/bill/"+ this.dataService.bill_O.b_id).subscribe((data : any)=>{
      this.orderbill = billorderCvt.toOrderbill(JSON.stringify(data));
      console.log("**********");
      console.log(this.dataService.bill_O.b_id);
      console.log(this.orderbill);

    });




   }
  updateStatus(){
    if (confirm("ยืนยันการจัดส่ง!")) {
      let jsonObj = {
        status: "จัดส่งแล้ว",
      }

      let jsonString = JSON.stringify(jsonObj);
      this.http.put(this.dataService.apiEndpoint+"/owner/"+this.dataService.bill_O.b_id, jsonString,{observe: 'response'}).subscribe(()=>{
        console.log('succes');
        location.reload();

      })

    } else {

    }
    this.dialogRef.close();

  }

  close(){
    this.dialogRef.close();
  }
}

