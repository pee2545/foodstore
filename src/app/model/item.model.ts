// To parse this data:
//
//   import { Convert } from "./file";
//
//   const item = Convert.toItem(json);

export interface Item {
  i_id:    number;
  food_id: number;
  bill_id: null;
  amount:  number;
  name: string;
  price: number;
  sum: number;
  numb:0;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toItem(json: string): Item[] {
      return JSON.parse(json);
  }

  public static itemToJson(value: Item[]): string {
      return JSON.stringify(value);
  }
}
