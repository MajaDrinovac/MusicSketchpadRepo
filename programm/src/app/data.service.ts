import { Injectable } from '@angular/core';
import { Melody } from './melody';
import { INoteSequence } from '@magenta/music/es6';
import { HttpService } from './http.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public httpService: HttpService) { }

  public melody: Array<Object>;
  public editMelody: Melody
  public edit: Boolean = false
  public user: User = new User('test', 'test1', 'test2')
  public eingeloggt: Boolean = false

}


