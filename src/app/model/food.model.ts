// To parse this data:
//
//   import { Convert } from "./file";
//
//   const food = Convert.toFood(json);

export interface Food {
  f_id:   number;
  name:   string;
  price:  number;
  image:  string;
  f_type: number;
  T_name:string;
}

export interface f_type {
  name:string;

}

// Converts JSON strings to/from your types
export class Convert {
  public static toFood(json: string): Food[] {
      return JSON.parse(json);
  }

  public static foodToJson(value: Food[]): string {
      return JSON.stringify(value);
  }


}
