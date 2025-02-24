// To parse this data:
//
//   import { Convert } from "./file";
//
//   const orderitem = Convert.toOrderitem(json);

export interface Orderitem {
  bill_id: number;
  name:    string;
  amount:  number;
  price:   number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toOrderitem(json: string): Orderitem[] {
      return JSON.parse(json);
  }

  public static orderitemToJson(value: Orderitem[]): string {
      return JSON.stringify(value);
  }
}
