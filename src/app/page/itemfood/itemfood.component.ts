import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as itemCvt, Item } from 'src/app/model/item.model';

@Component({
  selector: 'app-itemfood',
  templateUrl: './itemfood.component.html',
  styleUrls: ['./itemfood.component.scss']
})
export class ItemfoodComponent {
  count = 1;
  food : any;
  item = Array<Item>();
  chooseitem : any;

  constructor(private dialogRef : MatDialogRef<ItemfoodComponent>,private dataService : DataService,private http : HttpClient) {
    this.food = dataService.chooseFood;
    console.log(this.food);

    http.get(dataService.apiEndpoint + "/item/"+ this.dataService.bill.b_id).subscribe((data)=>{
      this.item = itemCvt.toItem(JSON.stringify(data));
      this.chooseitem = this.item[0];
      console.log('TEST ER');
    });
  }

  increase() {
    this.count++;
  }

  decrease() {
    if(this.count > 1){
      this.count--;
    }
    else{
      this.count = 1;
    }
  }

  close(){
    this.dialogRef.close();
  }


  add(count : number){
    let name = this.dataService.chooseFood.name;
    let itemhave =0;
    let num = 0;
    let id = this.dataService.chooseFood.f_id;
    // console.log("ID = " + id);

    for (let items of this.item){
      if(name == items.name){
        // console.log('ok');
        num = items.amount;
        itemhave++;
      }
      else{
        // console.log('no');
      }
      // console.log('out');
    }
    console.log("num >>>" +num);
    if(itemhave>0){
      let jsonObj = {
        amount: num+count
      }

      let jsonString = JSON.stringify(jsonObj);
      this.http.put(this.dataService.apiEndpoint+"/item/"+id, jsonString,
      {observe: 'response'}).subscribe(()=>{
        this.dialogRef.close();
      })

    }
    else{
      let jsonObj = {
        food_id: this.dataService.chooseFood.f_id,
        bill_id: this.dataService.bill.b_id,
        amount: count
      }
      console.log(count);
      let jsonString = JSON.stringify(jsonObj);
      this.http.post(this.dataService.apiEndpoint+"/item", jsonString,
      {observe: 'response'}).subscribe(()=>{
        this.dialogRef.close();
      })
    }

  }

}
