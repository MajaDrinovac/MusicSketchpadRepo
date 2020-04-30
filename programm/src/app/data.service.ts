import { Injectable } from '@angular/core';
import { Melody } from './melody';
import { INoteSequence } from '@magenta/music/es6';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public httpService:HttpService) { }

  public melody: Array<Object>;
  public editMelody:Melody
  public edit:Boolean = false
}


