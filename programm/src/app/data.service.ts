import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public httpService:HttpService) { }

  public melody: Array<Object>;
}


