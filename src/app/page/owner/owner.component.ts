import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Convert as userCvt, User } from 'src/app/model/user.model';
import { DataService } from 'src/app/service/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})

//DATETIME - format: YYYY-MM-DD HH:MI:SS

//sql SELECT * FROM testdatetime ORDER BY datetime

export class OwnerComponent {

  customers = Array<User>();
  constructor(private router: Router,private dataService : DataService,private http : HttpClient) {
    http.get(dataService.apiEndpoint + "/user").subscribe((data : any)=>{
      this.customers = userCvt.toUser(JSON.stringify(data));
      console.log(this.customers);


      // const myDate = new Date();
      // const year = myDate.getFullYear().toString();
      // const month = (myDate.getMonth() + 1).toString().padStart(2, '0');
      // const day = myDate.getDate().toString().padStart(2, '0');
      // const hour = myDate.getHours().toString().padStart(2, '0');
      // const minute = myDate.getMinutes().toString().padStart(2, '0');
      // const second = myDate.getSeconds().toString().padStart(2, '0');
      // const formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      // console.log(formattedDate);


      const now = new Date();
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(now, 'yyyy-MM-dd HH:mm:ss');





    });
  }



  seeCus(id_cus : number){
    this.dataService.chooseUser.u_id = id_cus;
    console.log(this.dataService.chooseUser.u_id);

    this.router.navigate(['/orderowner']);
  }

  logout() {
    if (confirm("คุณต้องการออกจากระบบ!")) {
      this.router.navigate(['']);
    } else {

    }
  }
}
