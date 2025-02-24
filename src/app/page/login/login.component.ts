import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Convert as userCvt, User } from 'src/app/model/user.model';
import { Convert as billCvt, Bill } from 'src/app/model/bill.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router,private dataService : DataService,private http : HttpClient) { }

  user = Array<User>();
  bill = Array<Bill>();
  // userr : any;
  login(phone: string, pwd: string,){
    this.http.get(this.dataService.apiEndpoint + "/user/"+ phone +"/"+ pwd ).subscribe((data : any)=>{
      this.user = userCvt.toUser(JSON.stringify(data));
      // this.userr = this.user[0];
      this.dataService.user = this.user[0];

      // console.log(this.userr);
      console.log(" role "+this.dataService.user.role + " >>>>> ");
      console.log(" ID "+this.dataService.user.u_id + " >>>>> ");
      console.log(this.user);

      if(this.dataService.user.role == "cus"){


        //chk_id->bill
        this.http.get(this.dataService.apiEndpoint + "/bill/chk/"+this.dataService.user.u_id).subscribe((data : any)=>{
          this.bill = billCvt.toBill(JSON.stringify(data));
          this.dataService.bill = this.bill[0];
          console.log("chk_id = "+this.dataService.bill.b_id + "chk_name = "+this.dataService.bill.name + "chk_phone = "+this.dataService.bill.phone);

          if(this.dataService.bill.name == '' && this.dataService.bill.phone == ''){
            console.log('NO data');
            this.router.navigate(['/foodhome']);

          }
          else {
            console.log('Yes data');

            let jsonObj = {
              name: "",
              address: "",
              phone: "",
              totalprice: 0,
              status: "",
              cus_id: this.dataService.user.u_id
            }

            let jsonString = JSON.stringify(jsonObj);
            this.http.post(this.dataService.apiEndpoint+"/bill", jsonString,
            {observe: 'response'}).subscribe(()=>{
              console.log('succes');
            });

            //id->bill
            this.http.get(this.dataService.apiEndpoint + "/bill").subscribe((data : any)=>{
              this.bill = billCvt.toBill(JSON.stringify(data));
              // this.userr = this.user[0];
              this.dataService.bill = this.bill[0];
              console.log("ID >>>>> "+this.dataService.bill.b_id);
              // console.log("ID >>>>> "+this.dataService.bill.b_id);
              this.router.navigate(['/foodhome']);
        });

          }
          // console.log("ID >>>>> "+this.dataService.bill.b_id);
          // console.log("ID >>>>> "+this.dataService.bill.b_id);
          // this.router.navigate(['/foodhome']);
        });

      }

      else if (this.dataService.user.role == "own") {
        this.router.navigate(['/orderowner']);

      }
      else{

      }
    });
  }
}

