// import { DropDownListItem } from './../../models/DropDownList';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { DropDownList } from 'src/app/models/DropDownList';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
id:string;
public setId(Id:string){
this.id = Id
}
public getId(){
  return this.id
  }
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Accept': 'text/plain'
    })
  };

  // isNaN(str: string): boolean {
  //   return isNaN(Number(str));
  // }

  // getListFromEnum(enumType: any): DropDownListItem[] {
  //   var dropDownListItems: DropDownListItem[] = []
  //   Object.keys(enumType).filter((v) => !this.isNaN(v)).map(x => dropDownListItems.push(new DropDownListItem(x, enumType[x])));
  //   return dropDownListItems;
  // }
}
