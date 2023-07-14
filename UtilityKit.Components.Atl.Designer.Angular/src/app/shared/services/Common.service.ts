// import { DropDownListItem } from './../../models/DropDownList';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}
  id: string;
  public setId(Id: string) {
    this.id = Id;
  }
  public getId() {
    return this.id;
  }
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      Accept: 'text/plain',
    }),
  };
}
