import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiEndpoint = 'http://localhost/onlinefoodapi';
  user = new User()
  chooseFood = new chooseFood();
  itemBasket = new itemBasket();
  bill = new bill();
  ordebillr = new orderbill();
  orderitem = new orderitem();
  chooseUser = new chooseUser();
  bill_O = new bill_O();
  status = new status();
  constructor() { }
}

class status{
  status: boolean = false;
}

class User {
  u_id:     number = 0;
  phone:    string = '';
  password: string = '';
  role:     string = '';
}

class chooseFood{
  f_id:   number = 0;
  name:   string = '';
  price:  number = 0;
  image:  string = '';
  f_type: number = 0;
}

class itemBasket{
  i_id:    number = 0;
  food_id: number = 0;
  bill_id: number = 0;
  amount:  number = 0;
  name: string ='';
  price: number = 0;
  sum: number = 0;
}

class bill{
  b_id:       number = 164;
  name:       string = '';
  address:    string = '';
  phone:      string = '';
  totalprice: number = 0;
  status:     string = '';
  cus_id:     number = 0;
}

class orderbill{
  b_id:       number = 0;
  name:       string = '';
  address:    string = '';
  phone:      string = '';
  totalprice: number = 0;
  status:     string = '';
  cus_id:     number = 0;
}

class orderitem{
  bill_id: number = 0;
}

class chooseUser{
  u_id:     number = 0;
}

class bill_O{
  b_id: number =  0;
}
