// To parse this data:
//
//   import { Convert } from "./file";
//
//   const bill = Convert.toBill(json);

export interface Bill {
  b_id:       number;
  name:       string;
  address:    string;
  phone:      string;
  totalprice: number;
  status:     string;
  cus_id:     number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toBill(json: string): Bill[] {
      return JSON.parse(json);
  }

  public static billToJson(value: Bill[]): string {
      return JSON.stringify(value);
  }
}
