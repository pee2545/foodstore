import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as itemCvt, Item } from 'src/app/model/item.model';

@Component({
  selector: 'app-basketfood',
  templateUrl: './basketfood.component.html',
  styleUrls: ['./basketfood.component.scss']
})
export class BasketfoodComponent {
  id=0;
  item = Array<Item>();
  itemsum = Array<Item>();
  chooseitem : any;
  numb = 0;
  nat=15;
  // avt = false;
  constructor(private dialogRef : MatDialogRef<BasketfoodComponent>,private router: Router,public dialog: MatDialog,private dataService : DataService,private http : HttpClient) {
    console.log("ID >>>>> "+this.dataService.bill.b_id);
    http.get(dataService.apiEndpoint + "/item/"+ this.dataService.bill.b_id).subscribe((data)=>{
      this.item = itemCvt.toItem(JSON.stringify(data));
      // this.chooseitem = this.item[0];
      // console.log(this.item);
    });

    http.get(dataService.apiEndpoint + "/item/sum/"+ this.dataService.bill.b_id).subscribe((data)=>{
      this.itemsum = itemCvt.toItem(JSON.stringify(data));
      console.log("suM item = "+this.itemsum);
    });
  }

  close(){
    this.dialogRef.close();
  }

  order(sum: number){
    // console.log('BF = '+ this.dataService.itemBasket.sum);
    this.dataService.itemBasket.sum = sum;
    // console.log('AT = '+ this.dataService.itemBasket.sum);

    if(this.item[0] == null){
      console.log('no');
      this.router.navigate(['/foodhome']);
      this.dialogRef.close();
    }
    else{
      console.log('yes');
      this.router.navigate(['/pay']);
      this.dialogRef.close();
    }

  };

  delete(item: any){
    this.dataService.itemBasket = item;
    // console.log(this.dataService.itemBasket.i_id);
    this.id = this.dataService.itemBasket.i_id;
    this.http.delete(this.dataService.apiEndpoint + "/item/"+ this.id).subscribe((data : any)=>{

        //new item
        this.http.get(this.dataService.apiEndpoint + "/item/"+ this.dataService.bill.b_id).subscribe((data)=>{
          this.item = itemCvt.toItem(JSON.stringify(data));
        });

        //new sum
        this.http.get(this.dataService.apiEndpoint + "/item/sum/"+ this.dataService.bill.b_id).subscribe((data)=>{
          this.itemsum = itemCvt.toItem(JSON.stringify(data));
          console.log("suM item = "+this.itemsum);
        });

      // if(this.dataService.itemBasket.sum <= 0){
      //   this.avt = true;this.avt = false;
      // }
      // else{
      //   this.avt = true;
      // }
    });

  }

  increase(count : number,item: any) {
    //this.count++;
    let num = count+1
    // console.log('is +');
    // console.log(num);
    let jsonObj = {
      amount: num
    }
    this.dataService.itemBasket = item;
    console.log(this.dataService.itemBasket.i_id);
    this.id = this.dataService.itemBasket.i_id;


    let jsonString = JSON.stringify(jsonObj);
    this.http.put(this.dataService.apiEndpoint+"/item/id/"+this.id, jsonString,
    {observe: 'response'}).subscribe(()=>{

      //new item
      this.http.get(this.dataService.apiEndpoint + "/item/"+ this.dataService.bill.b_id).subscribe((data)=>{
        this.item = itemCvt.toItem(JSON.stringify(data));
      });

      //new sum
      this.http.get(this.dataService.apiEndpoint + "/item/sum/"+ this.dataService.bill.b_id).subscribe((data)=>{
        this.itemsum = itemCvt.toItem(JSON.stringify(data));
        console.log("suM item = "+this.itemsum);
      });

    })

  }

  decrease(count : number,item: any) {
    if(count < 2){
      this.dataService.itemBasket = item;
      // console.log(this.dataService.itemBasket.i_id);
      this.id = this.dataService.itemBasket.i_id;
      this.http.delete(this.dataService.apiEndpoint + "/item/"+ this.id).subscribe((data : any)=>{

        //new item
        this.http.get(this.dataService.apiEndpoint + "/item/"+ this.dataService.bill.b_id).subscribe((data)=>{
          this.item = itemCvt.toItem(JSON.stringify(data));
        });

        //new sum
        this.http.get(this.dataService.apiEndpoint + "/item/sum/"+ this.dataService.bill.b_id).subscribe((data)=>{
          this.itemsum = itemCvt.toItem(JSON.stringify(data));
          console.log("suM item = "+this.itemsum);
        });
        // if(this.dataService.itemBasket.sum <= 0){
        //   this.avt = true;this.avt = false;
        // }
        // else{
        //   this.avt = true;
        // }
      });
    }
    else{
      //this.count++;
      let num = count-1
      // console.log('is +');
      // console.log(num);
      let jsonObj = {
        amount: num
      }
      this.dataService.itemBasket = item;
      console.log(this.dataService.itemBasket.i_id);
      this.id = this.dataService.itemBasket.i_id;


      let jsonString = JSON.stringify(jsonObj);
      this.http.put(this.dataService.apiEndpoint+"/item/id/"+this.id, jsonString,
      {observe: 'response'}).subscribe(()=>{

        //new item
        this.http.get(this.dataService.apiEndpoint + "/item/"+ this.dataService.bill.b_id).subscribe((data)=>{
          this.item = itemCvt.toItem(JSON.stringify(data));
        });

        //new sum
        this.http.get(this.dataService.apiEndpoint + "/item/sum/"+ this.dataService.bill.b_id).subscribe((data)=>{
          this.itemsum = itemCvt.toItem(JSON.stringify(data));
          console.log("suM item = "+this.itemsum);
        });

      })

    }


  };

};
