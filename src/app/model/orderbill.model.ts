// To parse this data:
//
//   import { Convert } from "./file";
//
//   const orderbill = Convert.toOrderbill(json);

export interface Orderbill {
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
  public static toOrderbill(json: string): Orderbill[] {
      return JSON.parse(json);
  }

  public static orderbillToJson(value: Orderbill[]): string {
      return JSON.stringify(value);
  }
}
