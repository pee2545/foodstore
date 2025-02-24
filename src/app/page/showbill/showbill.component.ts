import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';
import { Convert as itemorderCvt, Orderitem } from 'src/app/model/orderitem.model';

@Component({
  selector: 'app-showbill',
  templateUrl: './showbill.component.html',
  styleUrls: ['./showbill.component.scss']
})
export class ShowbillComponent {
  itemor = Array<Orderitem>();
  nav = 15;
  constructor(private dialogRef : MatDialogRef<ShowbillComponent>,private dataService : DataService,private http : HttpClient){
    http.get(dataService.apiEndpoint + "/bill/item/"+this.dataService.bill.b_id ).subscribe((data)=>{
      console.log(dataService.apiEndpoint + "/bill/item/"+ this.dataService.bill.b_id);
      this.itemor = itemorderCvt.toOrderitem(JSON.stringify(data));
      console.log(this.itemor);
    });
  }


  close(){
    this.dialogRef.close();
  }

}

